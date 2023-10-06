import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { commandState } from "@/App";
import { useAtom } from "jotai";

const Header = () => {
  const [, setOpen] = useAtom(commandState);
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between flex-1 px-4 py-4 bg-primary text-primary-foreground">
      <h1 className="flex-1 pl-16 text-4xl font-bold">Swift Search</h1>
      <Button className="mr-4 text-white bg-green-500 hover:bg-green-700/90">
        <Plus className="mr-2" /> Add Site
      </Button>
      <Button onClick={() => setOpen(true)} size={"icon"}>
        <Search />
      </Button>
    </header>
  );
};

export default Header;
