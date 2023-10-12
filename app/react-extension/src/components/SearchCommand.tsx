import { commandState, sitesAtom } from "@/App";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useAtom } from "jotai";
import SearchCard from "./SearchCard";

type SiteData = {
  title: string;
  description: string;
  favicon: string;
  url: string;
  isPin: boolean;
};
interface siteType {
  id: string;
  data: SiteData;
}

const SearchCommand = () => {
  const [open, setOpen] = useAtom(commandState);
  const [sites] = useAtom(sitesAtom);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {sites.map((site: siteType) => (
            <SearchCard
              key={site.id}
              description={site.data.description}
              favicon={site.data.favicon}
              title={site.data.title}
              url={site.data.url}
            />
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
