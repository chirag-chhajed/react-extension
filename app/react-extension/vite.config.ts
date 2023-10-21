import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
// import replace from "@rollup/plugin-replace";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        index: "./index.html",
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
