import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "development" ? "/" : "/db-stations/",
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("tsparticles")) {
            return "tsparticles";
          }

          if (id.includes("jotai")) {
            return "jotai";
          }

          if (id.includes("framer-motion")) {
            return "framer-motion";
          }

          if (id.includes("use-debounce")) {
            return "use-debounce";
          }
        },
      },
    },
  },
});
