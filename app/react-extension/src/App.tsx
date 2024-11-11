/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
// React and Custom Components
import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm";
import Header from "@/components/Header";

import SearchCommand from "@/components/SearchCommand";

// State Management
import { atom, useAtom } from "jotai";
import { dialogStateAtom } from "./components/Header";

// Firebase Authentication
import type { User } from "firebase/auth/web-extension";
import {
  type DocumentData,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Dexiedb, siteRef, userRef } from "@/background/background";
import CardComponent from "./components/SiteCard";
import type { siteType } from "@/@types/siteCard";
import SkeletonCard from "./components/SkeletonCard";

export const userAuthAtom = atom<User | null>(null);
export const commandState = atom<boolean>(false);
export const sitesAtom = atom<DocumentData>([]);

export default function Home() {
  const [user, setUser] = useAtom(userAuthAtom);
  const [, setOpen] = useAtom(commandState);
  const [sites, setSites] = useAtom(sitesAtom);
  const [, setDialog] = useAtom(dialogStateAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "user" }, (response) => {
      // console.log(response);
      if (response.success) {
        setUser(response.user);

        if (response.user) {
          (async () => {
            const q = query(userRef, where("user_id", "==", response.user.uid));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
              await addDoc(userRef, {
                displayName: response.user.displayName,
                email: response.user.email!,
                photoURL: response.user.photoURL!,
                user_id: response.user.uid,
              })
                .then((res) => res)
                .catch((err) => console.error(err));
            } else {
              // console.log("User already exists");
            }
          })();
        } else {
          // console.log("User is undefined in the response.");
        }
      } else {
        // console.log("Data passage not working");
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        // console.log(user.uid, "uid");
        try {
          const res = query(siteRef, where("user_id", "==", user.uid));
          const querySnapshot = await getDocs(res);

          const sitesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));

          const numFirebaseDocuments = sitesData.length;

          const numDexieDocuments = await Dexiedb.getSiteCount();

          if (numFirebaseDocuments !== numDexieDocuments) {
            // Clear the Dexie database
            await Dexiedb.sites.clear();

            // Add all the documents from Firebase to Dexie
            await Dexiedb.addMultipleSites(
              sitesData.map((site) => ({
                id: site.id,
                title: site.data.title,
                description: site.data.description,
                url: site.data.url,
                createdAt: site.data.created_at,
                updatedAt: site.data.updated_at,
                favicon: site.data.favicon,
                isPin: site.data.isPin,
              }))
            );
          }

          // Set the sites state with the array of data
          setSites(sitesData);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (user) {
      fetchData(); // Call the async function to fetch data when user is defined
    }
  }, [user]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // console.log(sites);

        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return <LoginForm />;
  }

  return (
    <>
      <Header />

      <main className="w-full h-[calc(100%-72px)] p-4 overflow-y-auto bg-secondary text-secondary-foreground lg:px-8">
        <div className="grid gap-6 overflow-y-scroll max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 auto-rows-fr justify-evenly justify-items-center">
          {sites.length > 0 &&
            sites.map((site: siteType) => (
              <CardComponent
                key={site.id}
                dataId={site.id}
                title={site.data.title}
                description={site.data.description}
                favicon={site.data.favicon}
                url={site.data.url}
                isPin={site.data.isPin}
              />
            ))}
        </div>
        {loading && (
          <div className="grid gap-6 overflow-y-scroll max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 auto-rows-fr justify-evenly justify-items-center">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        )}
        {sites.length === 0 && (
          <div className="grid h-full place-content-center justify-items-center gap-y-4">
            <img src="/266.png" alt="" className="w-64 aspect-square" />
            <h2 className="font-mono font-bold text-primary">
              Nothing to find here, let's add some sites{" "}
              <span
                onClick={() => setDialog(true)}
                className="underline cursor-pointer"
              >
                here
              </span>
            </h2>
          </div>
        )}
      </main>

      <SearchCommand />
    </>
  );
}
