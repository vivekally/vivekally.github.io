# Law OS — Deals Edition · Landing + Clickable Prototype

The PM OS concept replicated for transactional lawyers. One site: the Law OS
landing page at `/` and a 13-screen clickable prototype under `/phase-1/…`,
`/phase-2/…`, `/phase-3/…`, told through a fictional acquisition
(*Project Basalt — Basalt Capital's acquisition of Corven Systems* at the
fictional firm Alder & Finch LLP).

Live: https://vivekally.github.io/law-os-deals/
Sibling: **Litigation edition** — https://vivekally.github.io/law-os/
Product family: PM OS — https://vivekally.github.io/pm-os-landing/

## The mapping

| PM OS | Law OS (deals) |
| --- | --- |
| Context files | Deal files: terms, positions, open points, client, precedents |
| PM Brain | Deal Brain — memory with provenance on every position |
| Ask with cited sources | "What's market?" answered from your own executed deals |
| Reviewer agents | Partner · Counterparty · Tax · Client · Devil's Advocate |
| Per-source permissions | Walled deal rooms + firm-wide positions playbook |
| Friday sweep | Aging open points + inconsistent-positions sweep |

## Design system

Workbench B: dark `#070A11`, electric green `#3DDC84` accent, Inter +
JetBrains Mono, 8px max radius. Provenance tags: documented `#7FE8B0` ·
verbal `#5BC0EB` · hunch `#C9A227` · market `#8A93A6`.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173/law-os-deals/
```

## Grounding flags

All firms, deals, parties, people and numbers are **fictional demo content**.
Nothing here is legal advice.

## Stack

Vite + React 18 + TypeScript + Tailwind CSS + React Router 6. No backend; all
data lives in `src/data/*.ts`. Deployed to GitHub Pages via Actions on every
push to `main` (SPA deep links served through the `404.html` fallback).
