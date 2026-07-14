import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base path matches the GitHub repo name so the site works at
// https://<user>.github.io/law-os-deals-deals/
export default defineConfig({
  plugins: [react()],
  base: "/law-os-deals/",
});
