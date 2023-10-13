import { commandState, sitesAtom } from "@/App";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { useAtom } from "jotai";
import SearchCard from "./SearchCard";
import { siteType } from "@/@types/siteCard";

const SearchCommand = () => {
  const [open, setOpen] = useAtom(commandState);
  const [sites] = useAtom(sitesAtom);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Sites">
          {sites &&
            sites.map((site: siteType) => (
              <SearchCard
                key={site.id}
                description={site.data.description}
                favicon={site.data.favicon}
                title={site.data.title}
                url={site.data.url}
              />
            ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
