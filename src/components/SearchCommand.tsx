import { commandState } from "@/App";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useAtom } from "jotai";

const SearchCommand = () => {
  const [open, setOpen] = useAtom(commandState);
  return (
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
  );
};

export default SearchCommand;
