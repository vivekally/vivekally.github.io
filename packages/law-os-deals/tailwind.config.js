/** @type {import('tailwindcss').Config} */
// Workbench B tokens — see DESIGN.md in PM-OS-with-Second-Brain.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070A11",
        panel: "#0F1420",
        panel2: "#141B29",
        line: "#1B2230",
        line2: "#1E2D45",
        accent: "#3DDC84",
        codegreen: "#7FE8B0",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(61, 220, 132, 0.12)",
      },
    },
  },
  plugins: [],
};
