import { createRoot } from "react-dom/client";
import "../index.css";
import ModalContainer from "@/components/Modal";

console.log("Hey I am running from a chrome extension, do you know it");

function createModal() {
  const modalContainer = document.createElement("div");
  // modalContainer.className = "absolute top-0 left-0 z-50 w-full h-full";
  modalContainer.id = "customModal";

  document.body.appendChild(modalContainer);

  createRoot(document.body.querySelector("#customModal")!).render(
    <ModalContainer />
  );
}

chrome.runtime.onMessage.addListener((message) => {
  console.log(message, "message");
  if (message.command === "open_popup") {
    createModal();
    console.log("open popup");
  }
});
