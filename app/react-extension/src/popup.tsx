import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Tabs
      defaultValue="account"
      className="w-[400px] grid place-content-center grid-cols-2 h-80"
    >
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  </StrictMode>
);
