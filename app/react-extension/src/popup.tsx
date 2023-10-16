import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PopupTabs from "./components/PopOverTabs";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PopupTabs />
    <Toaster richColors />
  </StrictMode>
);
