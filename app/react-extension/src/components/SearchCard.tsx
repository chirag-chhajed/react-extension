import { CommandItem } from "./ui/command";

interface SearchCardProps {
  url: string;
  favicon: string;
  title: string;
  // description?: string;
}

const SearchCard = ({ favicon, title, url }: SearchCardProps) => {
  return (
    <CommandItem
      value={`${url}`}
      onSelect={() => window.open(url, "_blank")}
      className="flex items-center w-full gap-4 border rounded-lg shadow-sm bg-card text-card-foreground "
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-sm shadow-md bg-accent-foreground shadow-accent min-w-[3rem]">
        <img
          src={favicon}
          alt="favicon"
          height={32}
          width={32}
          className="w-8 h-8 aspect-square"
        />
      </div>

      <h3 className="text-base font-medium line-clamp-2">{title}</h3>
    </CommandItem>
  );
};

export default SearchCard;
