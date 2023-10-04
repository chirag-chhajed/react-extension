import { Plus } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-4 bg-primary text-primary-foreground">
      <h1 className="text-4xl font-bold ">Swift Search</h1>
      <Button className="text-white bg-green-500 hover:bg-green-700/90">
        <Plus className="mr-2" /> Add Habit
      </Button>
    </header>
  );
};

export default Header;
