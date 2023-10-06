import { Button } from "@/components/ui/button";
import { atom, useAtom } from "jotai";
import LoginForm from "./components/LoginForm";
import { User } from "firebase/auth";
import { useEffect } from "react";
import Header from "./components/Header";
import SiteCard from "./components/SiteCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DoorOpen, SettingsIcon } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// eslint-disable-next-line react-refresh/only-export-components
export const userAuthAtom = atom<User | null>(null);
export const commandState = atom<boolean>(false);
export default function Home() {
  const [user, setUser] = useAtom(userAuthAtom);
  const [open, setOpen] = useAtom(commandState);
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
    <div className="flex flex-col h-full lg:container">
      <Header />
      <div className="flex flex-row">
        <aside className="fixed top-0 z-0 flex items-end justify-center w-20 h-screen py-4 bg-primary text-primary-foreground">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="" size={"icon"}>
                <SettingsIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              loop
              sideOffset={-50}
              alignOffset={50}
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => console.log("profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DoorOpen /> Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </aside>
        <main className="bg-secondary text-secondary-foreground p-4 grid grid-cols-[repeat(auto-fill,minmax(250px,300px))] auto-rows-fr gap-6 justify-evenly overflow-y-auto ml-20 w-full justify-items-center">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <SiteCard key={i} />
            ))}
        </main>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <CommandItem key={i}>{Math.random()}</CommandItem>
              ))}
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <div className="p-4">
        <Button onClick={() => getBookmarks()} variant={"secondary"}>
          Would you like to add your bookmarks too?
        </Button>
        <div>
          <h1>Your are autheticated</h1>;
          <Button onClick={() => signOut()}>SignOut</Button>
        </div>
      </div>
    </div>
  );
}
