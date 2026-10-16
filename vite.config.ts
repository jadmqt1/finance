import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { powerApps } from "@microsoft/power-apps-vite/plugin"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), powerApps()],
  build: {
    rollupOptions: {
      output: {
        // Power Apps mobile hangs on "Opening..." with one big JS file (619 KB); split chunks load fine
        manualChunks: {
          react: ["react", "react-dom", "react-dom/client", "react/jsx-runtime"],
          vendor: ["react-router-dom", "@tanstack/react-query"],
          fluent: ["@fluentui/react-components"],
          icons: ["@fluentui/react-icons"],
        },
      },
    },
  },
});
