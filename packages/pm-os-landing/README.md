# PM OS — Landing Page + Clickable Prototype

One site: the PM OS landing page at `/` and the 13-screen clickable prototype
under `/phase-1/…`, `/phase-2/…`, `/phase-3/…`.

Live: https://vivekally.github.io/pm-os-landing/

## Design system

Workbench B (see DESIGN.md in PM-OS-with-Second-Brain): dark `#070A11`,
electric green `#3DDC84` accent, Inter + JetBrains Mono, 8px max radius.
Provenance tag colors: documented `#7FE8B0` · verbal `#5BC0EB` · hunch
`#C9A227` · industry `#8A93A6`.

The landing route is a 1:1 React port of the finalized design artifact; text
layout uses a vendored copy of Pretext (`src/lib/pretext.js`) for computed,
resize-aware heights.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173/pm-os-landing/
```

Production build: `npm run build`, then `npm run preview`.

## Stack

Vite + React 18 + TypeScript + Tailwind CSS + React Router 6. No backend; all
data lives in `src/data/*.ts`. Deployed to GitHub Pages via Actions on every
push to `main` (SPA deep links served through the `404.html` fallback).
