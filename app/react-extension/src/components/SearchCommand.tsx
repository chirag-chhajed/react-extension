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
import { useState } from "react";

const SearchCommand = () => {
  const [open, setOpen] = useAtom(commandState);
  const [sites] = useAtom(sitesAtom);
  const [search, setSearch] = useState("");
  console.log(search, setSearch);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        value={search}
        onValueChange={setSearch}
        placeholder="Type a command or search..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Sites">
          {sites &&
            sites.map((site: siteType) => (
              <SearchCard
                key={site.id}
                favicon={site.data.favicon}
                title={site.data.title}
                url={site.data.url}
                description={site.data.description}
              />
            ))}
        </CommandGroup>
      </CommandList>
      <ul className="flex gap-4 p-3 ml-2 space-x-2 list-none text-foreground">
        <li className="flex items-center justify-center gap-2">
          <kbd className="flex items-center justify-center w-5 shadow bg-[linear-gradient(-225deg,#d5dbe4,#f8f8f8)] ">
            <svg width="15" height="15" aria-label="Enter key" role="img">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.2"
              >
                <path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path>
              </g>
            </svg>
          </kbd>
          <span>to select</span>
        </li>
        <li className="flex items-center justify-center gap-2">
          <kbd className="flex items-center justify-center w-5 shadow bg-[linear-gradient(-225deg,#d5dbe4,#f8f8f8)] ">
            <svg width="15" height="15" aria-label="Arrow down" role="img">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.2"
              >
                <path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path>
              </g>
            </svg>
          </kbd>
          <kbd className="flex items-center justify-center w-5 shadow bg-[linear-gradient(-225deg,#d5dbe4,#f8f8f8)] ">
            <svg width="15" height="15" aria-label="Arrow up" role="img">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.2"
              >
                <path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path>
              </g>
            </svg>
          </kbd>
          <span>to navigate</span>
        </li>
        <li className="flex items-center justify-center gap-2">
          <kbd className="flex items-center justify-center w-5 shadow bg-[linear-gradient(-225deg,#d5dbe4,#f8f8f8)] ">
            <svg width="15" height="15" aria-label="Escape key" role="img">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.2"
              >
                <path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path>
              </g>
            </svg>
          </kbd>
          <span>to close</span>
        </li>
      </ul>
    </CommandDialog>
  );
};

export default SearchCommand;
