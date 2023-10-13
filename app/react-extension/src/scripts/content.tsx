import { createRoot } from "react-dom/client";
import ModalContainer from "@/components/Modal";
import styles from "../index.css?inline";

console.log("Hey I am running from a chrome extension, do you know it");

function createModal() {
  let modalContainer = document.getElementById("customModal");
  const style = document.createElement("style");
  style.setAttribute("data-id", "custom-styles");
  style.innerHTML = styles;

  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.id = "customModal";
    document.body.appendChild(modalContainer);
    document.head.appendChild(style);
  }

  const modalRoot = createRoot(modalContainer); // Create a root within the customModal div
  if (!modalRoot) return console.log("modalRoot not found");
  modalRoot.render(<ModalContainer />);
}

document.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    console.log("escape key pressed");
    const modalContainer = document.getElementById("customModal");
    if (modalContainer) {
      modalContainer.remove();
    }
  }
});

chrome.runtime.onMessage.addListener((message) => {
  console.log(message, "message");
  if (message.command === "open_popup") {
    createModal();
    console.log("open popup");
  }
});

// chrome.runtime.onMessage.addListener((message) => {
//   if (message.command === "insert_css") {

//   }
// });
