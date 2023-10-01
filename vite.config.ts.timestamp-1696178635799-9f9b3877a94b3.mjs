// vite.config.ts
import { defineConfig } from "file:///C:/Users/chhaj/Desktop/random/react-extension/node_modules/.pnpm/vite@4.4.9_@types+node@20.8.0/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/chhaj/Desktop/random/react-extension/node_modules/.pnpm/@vitejs+plugin-react-swc@3.4.0_vite@4.4.9/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve } from "path";
import { crx } from "file:///C:/Users/chhaj/Desktop/random/react-extension/node_modules/.pnpm/@crxjs+vite-plugin@1.0.14_vite@4.4.9/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "CRXJS React Vite Example",
  version: "1.0.0",
  action: {
    default_popup: "popup.html"
  },
  background: {
    service_worker: "src/background/background.ts"
  },
  content_scripts: [
    {
      js: [
        "src/scripts/content.tsx"
      ],
      matches: [
        "*://*/*"
      ]
    }
  ],
  commands: {
    open_popup: {
      suggested_key: {
        default: "Ctrl+Shift+1",
        mac: "Command+Shift+1"
      },
      description: "Inject a script on the page"
    },
    open_index: {
      suggested_key: {
        default: "Ctrl+Shift+S",
        mac: "Command+Shift+S"
      },
      description: "Opens index.html"
    }
  },
  permissions: [
    "activeTab",
    "tabs",
    "scripting",
    "favicon",
    "unlimitedStorage",
    "storage",
    "identity"
  ],
  web_accessible_resources: [
    {
      resources: [
        "_favicon/*"
      ],
      matches: [
        "<all_urls>"
      ],
      extension_ids: [
        "*"
      ]
    }
  ]
};

// vite.config.ts
var __vite_injected_original_dirname = "C:\\Users\\chhaj\\Desktop\\random\\react-extension";
var vite_config_default = defineConfig({
  plugins: [react(), crx({ manifest: manifest_default })],
  build: {
    rollupOptions: {
      input: {
        index: "./index.html"
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGNoaGFqXFxcXERlc2t0b3BcXFxccmFuZG9tXFxcXHJlYWN0LWV4dGVuc2lvblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcY2hoYWpcXFxcRGVza3RvcFxcXFxyYW5kb21cXFxccmVhY3QtZXh0ZW5zaW9uXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9jaGhhai9EZXNrdG9wL3JhbmRvbS9yZWFjdC1leHRlbnNpb24vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY3J4IH0gZnJvbSBcIkBjcnhqcy92aXRlLXBsdWdpblwiO1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gXCIuL21hbmlmZXN0Lmpzb25cIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBjcngoeyBtYW5pZmVzdCB9KV0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgaW5kZXg6IFwiLi9pbmRleC5odG1sXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG59KTtcbiIsICJ7XHJcbiAgICBcIm1hbmlmZXN0X3ZlcnNpb25cIjogMyxcclxuICAgIFwibmFtZVwiOiBcIkNSWEpTIFJlYWN0IFZpdGUgRXhhbXBsZVwiLFxyXG4gICAgXCJ2ZXJzaW9uXCI6IFwiMS4wLjBcIixcclxuICAgIFwiYWN0aW9uXCI6IHtcclxuICAgICAgICBcImRlZmF1bHRfcG9wdXBcIjogXCJwb3B1cC5odG1sXCJcclxuICAgIH0sXHJcbiAgICBcImJhY2tncm91bmRcIjoge1xyXG4gICAgICAgIFwic2VydmljZV93b3JrZXJcIjogXCJzcmMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLnRzXCJcclxuICAgIH0sXHJcbiAgICBcImNvbnRlbnRfc2NyaXB0c1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImpzXCI6IFtcclxuICAgICAgICAgICAgICAgIFwic3JjL3NjcmlwdHMvY29udGVudC50c3hcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcIm1hdGNoZXNcIjogW1xyXG4gICAgICAgICAgICAgICAgXCIqOi8vKi8qXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICBcImNvbW1hbmRzXCI6IHtcclxuICAgICAgICBcIm9wZW5fcG9wdXBcIjoge1xyXG4gICAgICAgICAgICBcInN1Z2dlc3RlZF9rZXlcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiQ3RybCtTaGlmdCsxXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hY1wiOiBcIkNvbW1hbmQrU2hpZnQrMVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJJbmplY3QgYSBzY3JpcHQgb24gdGhlIHBhZ2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJvcGVuX2luZGV4XCI6IHtcclxuICAgICAgICAgICAgXCJzdWdnZXN0ZWRfa2V5XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIkN0cmwrU2hpZnQrU1wiLFxyXG4gICAgICAgICAgICAgICAgXCJtYWNcIjogXCJDb21tYW5kK1NoaWZ0K1NcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiT3BlbnMgaW5kZXguaHRtbFwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwicGVybWlzc2lvbnNcIjogW1xyXG4gICAgICAgIFwiYWN0aXZlVGFiXCIsXHJcbiAgICAgICAgXCJ0YWJzXCIsXHJcbiAgICAgICAgXCJzY3JpcHRpbmdcIixcclxuICAgICAgICBcImZhdmljb25cIixcclxuICAgICAgICBcInVubGltaXRlZFN0b3JhZ2VcIixcclxuICAgICAgICBcInN0b3JhZ2VcIixcclxuICAgICAgICBcImlkZW50aXR5XCJcclxuICAgIF0sXHJcbiAgICBcIndlYl9hY2Nlc3NpYmxlX3Jlc291cmNlc1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcInJlc291cmNlc1wiOiBbXHJcbiAgICAgICAgICAgICAgICBcIl9mYXZpY29uLypcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcIm1hdGNoZXNcIjogW1xyXG4gICAgICAgICAgICAgICAgXCI8YWxsX3VybHM+XCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJleHRlbnNpb25faWRzXCI6IFtcclxuICAgICAgICAgICAgICAgIFwiKlwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICBdXHJcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFVLFNBQVMsb0JBQW9CO0FBQ2xXLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsU0FBUyxXQUFXOzs7QUNIcEI7QUFBQSxFQUNJLGtCQUFvQjtBQUFBLEVBQ3BCLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLFFBQVU7QUFBQSxJQUNOLGVBQWlCO0FBQUEsRUFDckI7QUFBQSxFQUNBLFlBQWM7QUFBQSxJQUNWLGdCQUFrQjtBQUFBLEVBQ3RCO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNmO0FBQUEsTUFDSSxJQUFNO0FBQUEsUUFDRjtBQUFBLE1BQ0o7QUFBQSxNQUNBLFNBQVc7QUFBQSxRQUNQO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQSxVQUFZO0FBQUEsSUFDUixZQUFjO0FBQUEsTUFDVixlQUFpQjtBQUFBLFFBQ2IsU0FBVztBQUFBLFFBQ1gsS0FBTztBQUFBLE1BQ1g7QUFBQSxNQUNBLGFBQWU7QUFBQSxJQUNuQjtBQUFBLElBQ0EsWUFBYztBQUFBLE1BQ1YsZUFBaUI7QUFBQSxRQUNiLFNBQVc7QUFBQSxRQUNYLEtBQU87QUFBQSxNQUNYO0FBQUEsTUFDQSxhQUFlO0FBQUEsSUFDbkI7QUFBQSxFQUNKO0FBQUEsRUFDQSxhQUFlO0FBQUEsSUFDWDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0o7QUFBQSxFQUNBLDBCQUE0QjtBQUFBLElBQ3hCO0FBQUEsTUFDSSxXQUFhO0FBQUEsUUFDVDtBQUFBLE1BQ0o7QUFBQSxNQUNBLFNBQVc7QUFBQSxRQUNQO0FBQUEsTUFDSjtBQUFBLE1BQ0EsZUFBaUI7QUFBQSxRQUNiO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0o7OztBRDFEQSxJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRSwyQkFBUyxDQUFDLENBQUM7QUFBQSxFQUNwQyxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTCxPQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
