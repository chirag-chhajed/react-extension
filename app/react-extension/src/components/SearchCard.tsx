import { CommandItem } from "./ui/command";
// import { Card } from "./ui/card";

interface SearchCardProps {
  url: string;
  favicon: string;
  title: string;
  description: string;
}

const SearchCard = ({ description, favicon, title, url }: SearchCardProps) => {
  return (
    <CommandItem
      onSelect={() => window.open(url, "_blank")}
      className="flex items-center w-full space-x-2 border rounded-lg shadow-sm bg-card text-card-foreground"
    >
      <img src={favicon} height={32} width={32} alt={title} />
      <div className="flex flex-col items-start">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </CommandItem>
  );
};

export default SearchCard;
