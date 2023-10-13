/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import SearchCard from "./SearchCard";
import { Site } from "@/lib/SwiftSearchDB";

const ModalContainer = () => {
  const [open, setIsOpen] = useState(true);
  const [sites, setSites] = useState<Site[]>([]);

  const removeStyles = () => {
    const style = document.querySelector(`style[data-id="custom-styles"]`);
    console.debug("style", style);
    if (style) {
      style.remove();
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
    removeStyles();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    // Attach the event listener when the dialog is open
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Remove the event listener when the dialog is closed or the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getData" }, (response) => {
      console.log(response);
      if (response.success) {
        setSites(response.sites);
      }
    });
  }, []);

  return (
    <CommandDialog
      defaultOpen
      open={open}
      onOpenChange={(e) => {
        console.log("state changed of dialog");
        if (e === false) {
          closeDialog();
          const modalContainer = document.getElementById("customModal");
          if (modalContainer) {
            modalContainer.remove();
          }
        }
      }}
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="sites">
          {sites &&
            sites.map((site: Site) => (
              <SearchCard
                key={site.id}
                description={site.description ?? ""}
                favicon={site.favicon}
                title={site.title}
                url={site.url}
              />
            ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default ModalContainer;
