# Law OS — Litigation Edition · Landing + Clickable Prototype

The PM OS concept replicated for lawyers. One site: the Law OS landing page at
`/` and a 13-screen clickable prototype under `/phase-1/…`, `/phase-2/…`,
`/phase-3/…`, told through a fictional litigation matter
(*Meridian Logistics v. Corestone Manufacturing* at the fictional firm
Hartwell & Cole LLP).

Live: https://vivekally.github.io/law-os/
Sibling: **Deals edition** for transactional lawyers —
https://vivekally.github.io/law-os-deals/
Product family: PM OS — https://vivekally.github.io/pm-os-landing/

## The mapping

| PM OS | Law OS (litigation) |
| --- | --- |
| Context files | Matter files: facts, theory, deadlines, client, authorities |
| PM Brain | Matter Brain — memory with provenance on every fact |
| Ask with cited sources | Answers cited to the record and authorities |
| Reviewer agents | Partner · Opposing Counsel · Ethics & Privilege · Client · Devil's Advocate |
| Per-source permissions | Privilege + ethical walls |
| Friday sweep | Limitation-date + contradiction sweep |

## Design system

Workbench B: dark `#070A11`, electric green `#3DDC84` accent, Inter +
JetBrains Mono, 8px max radius. Provenance tags: documented `#7FE8B0` ·
verbal `#5BC0EB` · hunch `#C9A227` · market `#8A93A6`.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173/law-os/
```

## Grounding flags

All firms, matters, parties, people, rulings and numbers are **fictional demo
content**. Nothing here is legal advice or a real citation.

## Stack

Vite + React 18 + TypeScript + Tailwind CSS + React Router 6. No backend; all
data lives in `src/data/*.ts`. Deployed to GitHub Pages via Actions on every
push to `main` (SPA deep links served through the `404.html` fallback).
