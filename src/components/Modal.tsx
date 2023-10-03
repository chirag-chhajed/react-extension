/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const ModalContainer = () => {
  const [open, setIsOpen] = useState(true);

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
    <Dialog
      defaultOpen
      open={open}
      onOpenChange={(e) => {
        console.log("state changed of dialog");
        if (e === false) {
          closeDialog();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalContainer;
