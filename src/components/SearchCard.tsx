import React, { useRef } from "react";
import { CommandItem } from "./ui/command";
import { Card } from "./ui/card";

interface SearchCardProps {
  url: string;
  favicon: string;
  title: string;
  description: string;
}

const SearchCard = ({ description, favicon, title, url }: SearchCardProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    console.log(event.key);
    if (event.key === "Enter") {
      linkRef.current?.click();
    }
  };
  const linkRef = useRef<HTMLAnchorElement>(null);
  return (
    <a href={url} target="_blank" onKeyDown={handleKeyDown} ref={linkRef}>
      <Card>
        <CommandItem className="flex items-center w-full space-x-2">
          <img src={favicon} height={32} width={32} alt={title} />
          {/* <Facebook /> */}

          <div className="flex flex-col items-start">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </CommandItem>
      </Card>
    </a>
  );
};

export default SearchCard;
