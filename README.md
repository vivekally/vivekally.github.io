# vivekally.github.io

Monorepo for all product prototypes and reports. Deploys to GitHub Pages via a single unified workflow.

## Live sites

| Path | What |
|------|------|
| [/](https://vivekally.github.io/) | AI Intelligence 2026 hub |
| [/pm-os-landing](https://vivekally.github.io/pm-os-landing/) | PM OS — landing + clickable prototype (phases 1-3) |
| [/pm-os-deck](https://vivekally.github.io/pm-os-deck/) | PM OS — investor deck (web + PPTX) |
| [/law-os-deals](https://vivekally.github.io/law-os-deals/) | Law OS — Deals edition (transactional lawyers) |
| [/law-os](https://vivekally.github.io/law-os/) | Law OS — Litigation edition |
| [/AI-Personal-Finance-Advisor](https://vivekally.github.io/AI-Personal-Finance-Advisor/) | Arrive Finance — prototypes + investor materials ([repo](https://github.com/vivekally/AI-Personal-Finance-Advisor)) |
| [/brainally-landing](https://vivekally.github.io/brainally-landing/) | BrainAlly — product landing page ([repo](https://github.com/vivekally/brainally-landing)) |
| [/brainally-thesis](https://vivekally.github.io/brainally-thesis/) | BrainAlly — market thesis ([repo](https://github.com/vivekally/brainally-thesis)) |

The last three are served by their own repos, not built from this monorepo, so they don't appear under Structure below.

## Structure

```
├── index.html              ← AI Intelligence hub (static)
├── pm-os-deck/             ← Investor deck (static HTML + PPTX)
└── packages/
    ├── pm-os-landing/      ← Vite/React/TS
    ├── law-os-deals/       ← Vite/React/TS
    └── law-os/             ← Vite/React/TS
```

## Development

```bash
npm install
npm run build           # build all apps
npm run build:landing   # build just PM OS landing
npm run build:law-deals # build just Law OS Deals
npm run build:law-os    # build just Law OS Litigation
```

Each Vite app can also be run locally with `npm run dev` from its package directory.
