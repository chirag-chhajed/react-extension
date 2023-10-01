import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Button } from "./components/ui/button";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Button>I am a button</Button>
    <Button variant={"link"}>
      <a target="_blank" href={chrome.runtime.getURL("index.html")}>
        Index
      </a>
    </Button>
  </StrictMode>
);
