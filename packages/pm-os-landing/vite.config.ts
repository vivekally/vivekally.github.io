import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base path matches the GitHub repo name so the site works at
// https://<user>.github.io/pm-os-landing/
export default defineConfig({
  plugins: [react()],
  base: "/pm-os-landing/",
});
