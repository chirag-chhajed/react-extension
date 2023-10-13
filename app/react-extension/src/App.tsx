/* eslint-disable react-refresh/only-export-components */
// React and Custom Components
import { useEffect } from "react";
import LoginForm from "@/components/LoginForm";
import Header from "@/components/Header";
// import SiteCard from "@/components/SiteCard";
import SettingDropDown from "@/components/SettingDropDown";

// UI Components
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import SearchCommand from "@/components/SearchCommand";

// Icons
import { DoorOpen, SettingsIcon } from "lucide-react";

// State Management
import { atom, useAtom } from "jotai";

// Firebase Authentication
import { User } from "firebase/auth";
// Utility
import { toast } from "sonner";
import { DocumentData, getDocs, query, where } from "firebase/firestore";
import { siteRef } from "./background/background";
import CardComponent from "./components/SiteCard";
import { siteType } from "@/@types/siteCard";

export const userAuthAtom = atom<User | null>(null);
export const commandState = atom<boolean>(false);
export const sitesAtom = atom<DocumentData | []>([]);

export default function Home() {
  const [user, setUser] = useAtom(userAuthAtom);
  const [, setOpen] = useAtom(commandState);
  const [sites, setSites] = useAtom(sitesAtom);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "user" }, (response) => {
      console.log(response);
      if (response.success) {
        setUser(response.user);
      } else {
        console.log("Data passage not working");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        console.log(user.uid, "uid");
        try {
          const res = query(siteRef, where("user_id", "==", user.uid));
          const querySnapshot = await getDocs(res);

          const sitesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));

          // Set the sites state with the array of data
          setSites(sitesData);
        } catch (error) {
          console.error(error);
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
        console.log(sites);

        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = () => {
    chrome.runtime.sendMessage({ action: "signOut" }, (response) => {
      console.log(response);
      if (response.success) {
        console.log("Data passage working");
        toast.success("Signed Out");

        setUser(null);
      } else {
        toast.error("Error Signing Out");
        console.log("Data passage not working");
      }
    });
  };
  useEffect(() => {
    sites.length > 0
      ? chrome.runtime.sendMessage({ action: "sites", sites }, (response) => {
          console.log(response);
          if (response && response.success) {
            console.log("Data passage working");
          } else {
            console.error("Data passage not working");
          }
        })
      : console.log("No sites");
  }, [sites]);

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="flex flex-col h-full lg:container">
      <Header />
      <div className="flex flex-row">
        <aside className="fixed top-0 z-0 flex items-end justify-center w-20 h-screen py-4 bg-primary text-primary-foreground">
          <SettingDropDown
            settingButton={
              <Button size={"icon"}>
                <SettingsIcon />
              </Button>
            }
            signout={
              <DropdownMenuItem onClick={() => signOut()}>
                <DoorOpen /> Log Out
              </DropdownMenuItem>
            }
          />
        </aside>
        <main className="bg-secondary text-secondary-foreground p-4  overflow-y-auto ml-20 w-full h-[100svh]">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,300px))] auto-rows-fr gap-6 justify-evenly justify-items-center overflow-y-scroll">
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
        </main>
      </div>
      <SearchCommand />
    </div>
  );
}
