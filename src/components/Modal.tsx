/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
// import { useAtom } from "jotai";
import { Calendar, Facebook, Github } from "lucide-react";
// import { sitesAtom } from "@/App";

// type SiteData = {
//   title: string;
//   description: string;
//   favicon: string;
//   url: string;
//   isPin: boolean;
// };
// interface siteType {
//   id: string;
//   data: SiteData;
// }

const ModalContainer = () => {
  const [open, setIsOpen] = useState(true);
  // const [sites] = useAtom(sitesAtom);

  const removeStyles = () => {
    const style = document.querySelector(`style[data-id="custom-styles"]`);
    console.debug("style", style);
    if (style) {
      style.remove();
    }
    // document.body.style.removeProperty("pointer-events");
  };

  const closeDialog = () => {
    setIsOpen(false);
    removeStyles();
  };

  // Add an event listener for the "keydown" event to close the dialog on ESC key press
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
  return (
    <CommandDialog
      defaultOpen
      open={open}
      onOpenChange={(e) => {
        console.log("state changed of dialog");
        if (e === false) {
          closeDialog();
        }
      }}
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="sites">
          <CommandItem>
            <Facebook />
            facebook
          </CommandItem>
          <CommandItem>
            <Calendar />
            Calendar
          </CommandItem>
          <CommandItem>
            <Github /> Github
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default ModalContainer;
