import { Button } from "@/components/ui/button";
import { atom, useAtom } from "jotai";
import LoginForm from "./components/LoginForm";
import { User } from "firebase/auth";
import { useEffect } from "react";
import Header from "./components/Header";
import SiteCard from "./components/SiteCard";
import { Toaster } from "sonner";

// eslint-disable-next-line react-refresh/only-export-components
export const userAuthAtom = atom<User | null>(null);
export default function Home() {
  const [user, setUser] = useAtom(userAuthAtom);
  useEffect(() => {
    console.log("User", user);
    chrome.runtime.sendMessage({ action: "user" }, (response) => {
      console.log(response);
      if (response.success) {
        console.log("Data passage working");
        setUser(response.user);
      } else {
        console.log("Data passage not working");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = () => {
    chrome.runtime.sendMessage({ action: "signOut" }, (response) => {
      console.log(response);
      if (response.success) {
        console.log("Data passage working");
        setUser(null);
      } else {
        console.log("Data passage not working");
      }
    });
  };

  const getBookmarks = () => {
    chrome.permissions.request(
      {
        permissions: ["bookmarks"],
      },
      (granted) => {
        if (granted) {
          chrome.bookmarks.getTree((bookmarkTree) => {
            for (const node of bookmarkTree) {
              console.log(
                node.children?.map((child) =>
                  child.children?.map((child) => child.url)
                )
              );
              console.log(
                node.children?.map((child) =>
                  child.children?.map((child) => child.url)
                ).length
              );
            }
          });
        } else {
          console.log("Not granted");
        }
      }
    );
  };
  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="container">
      <Header />
      <main className="flex gap-4 p-4 bg-secondary text-secondary-foreground justify-evenly">
        {Array(10)
          .fill(0)
          .map(() => (
            <SiteCard />
          ))}
        {/* <SiteCard/> */}
      </main>

      <div className="p-4">
        <Button onClick={() => getBookmarks()} variant={"secondary"}>
          Would you like to add your bookmarks too?
        </Button>
        <div>
          <h1>Your are autheticated</h1>;
          <Button onClick={() => signOut()}>SignOut</Button>
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
}
