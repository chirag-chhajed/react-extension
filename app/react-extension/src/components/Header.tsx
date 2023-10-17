import { LogOut, MenuIcon, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { commandState, userAuthAtom } from "@/App";
import { atom, useAtom } from "jotai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SiteForm from "@/components/SiteForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Dexiedb } from "@/background/background";
import { toast } from "sonner";

export const dialogStateAtom = atom(false);
const Header = () => {
  const [, setOpen] = useAtom(commandState);
  const [, setUser] = useAtom(userAuthAtom);
  const [value, setValue] = useAtom(dialogStateAtom);

  const signOut = () => {
    chrome.runtime.sendMessage({ action: "signOut" }, (response) => {
      // console.log(response);
      if (response.success) {
        // console.log("Data passage working");
        Dexiedb.sites.clear();
        toast.success("Signed Out");
        setUser(null);
      } else {
        toast.error("Error Signing Out");
        // console.log("Data passage not working");
      }
    });
  };
  return (
    <header className="sticky top-0 flex items-center justify-center flex-1 p-6 py-4 bg-primary text-primary-foreground lg:px-8">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size={"icon"}>
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" loop>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut /> Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <h1 className="flex-1 text-2xl font-bold text-center md:text-3xl">
        Swift Search
      </h1>
      <Dialog open={value} onOpenChange={setValue}>
        <DialogTrigger asChild>
          <Button className="mr-4 text-white bg-green-500 hover:bg-green-700/90">
            <Plus className="mr-2" /> Add Site
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Site</DialogTitle>
            <DialogDescription>
              Add a new site to your Swift Search
            </DialogDescription>
          </DialogHeader>
          <SiteForm />
        </DialogContent>
      </Dialog>
      <Button onClick={() => setOpen(true)} size={"icon"}>
        <Search />
      </Button>
    </header>
  );
};

export default Header;
