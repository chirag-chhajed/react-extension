/* eslint-disable react-refresh/only-export-components */
// React and Custom Components
import { useEffect } from "react";
import LoginForm from "@/components/LoginForm";
import Header from "@/components/Header";
import SiteCard from "@/components/SiteCard";
import SettingDropDown from "@/components/SettingDropDown";

// UI Components
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

// Icons
import { DoorOpen, SettingsIcon } from "lucide-react";

// State Management
import { atom, useAtom } from "jotai";

// Firebase Authentication
import { User } from "firebase/auth";

// Utility
import { toast } from "sonner";
import SearchCommand from "./components/SearchCommand";

export const userAuthAtom = atom<User | null>(null);
export const commandState = atom<boolean>(false);

export default function Home() {
  const [user, setUser] = useAtom(userAuthAtom);
  const [, setOpen] = useAtom(commandState);

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

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
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
        <main className="bg-secondary text-secondary-foreground p-4 grid grid-cols-[repeat(auto-fill,minmax(250px,300px))] auto-rows-fr gap-6 justify-evenly overflow-y-auto ml-20 w-full justify-items-center">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <SiteCard key={i} />
            ))}
        </main>
      </div>
      <SearchCommand />
    </div>
  );
}
