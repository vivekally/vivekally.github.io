# PM-OS-Investor-Deck.pptx — Source Register

Every externally sourced claim in the deck, mapped slide by slide. Derivations marked
`[Estimate]` are ours; method in [research/market-research.md](../research/market-research.md).
Notion sources are cited as `[Notion: <page title>]` — links intentionally never written into
this public repo (see CLAUDE.md security policy). Verified 2026-07-09 unless noted.

---

## Slide 2 — Problem

| Claim | Source |
|---|---|
| "The biggest blocker to AI automation of companies is no longer the models… Now the blocker is the domain knowledge." — Tom Blomfield | [YC Requests for Startups](https://www.ycombinator.com/rfs) (Summer 2026); full-text screenshots preserved in `[Notion: Company Brain vs AI Operating System (YC RFS) + where gbrain fits]` |
| "Every session from scratch" re-context monologue | PM OS live demo copy (vivekally.github.io/pm-os-landing, extracted from production bundle 2026-07-09) |
| Bottom-strip stats ("every session", "4+ tools", "0 receipts") | Qualitative framing, not measured telemetry — flagged in speaker notes |
| Static context files decay (market admission) | mySecond ships a "context health" feature to prompt file refreshes — [mysecond.ai](https://mysecond.ai/) product docs, `[Notion: Research/Notes]` |

## Slide 3 — Why now

| Claim | Source |
|---|---|
| YC RFS: models no longer the blocker | [ycombinator.com/rfs](https://www.ycombinator.com/rfs) |
| GBrain open-sourced Apr 5, 2026, MIT, ~5K GitHub stars in 24h | [github.com/garrytan/gbrain](https://github.com/garrytan/gbrain); [Digg coverage](https://digg.com/ai/82u1xlg1); [Vectorize review](https://vectorize.io/articles/what-is-gbrain) |
| Mem0 $24M (seed + Series A; YC, Basis Set, Peak XV); AWS Agent SDK exclusive memory provider | [TechCrunch, Oct 28 2025](https://techcrunch.com/2025/10/28/mem0-raises-24m-from-yc-peak-xv-and-basis-set-to-build-the-memory-layer-for-ai-apps/) |
| Glean $150M Series F at $7.2B | [CNBC, Jun 10 2025](https://www.cnbc.com/2025/06/10/glean-gen-ai-search-startup-raises-150-million-at-7-billion-value.html); [Glean announcement](https://www.glean.com/blog/glean-series-f-announcement) |
| Granola $125M Series C at $1.5B; notetaker → "enterprise AI context" repositioning | [TechCrunch, Mar 25 2026](https://techcrunch.com/2026/03/25/granola-raises-125m-hits-1-5b-valuation-as-it-expands-from-meeting-notetaker-to-enterprise-ai-app/); [Bloomberg](https://www.bloomberg.com/news/articles/2026-03-25/ai-notetaker-granola-hits-1-5-billion-value-in-125-million-funding) |
| Dust $40M Series B (Sequoia + Abstract) | [Sifted, May 2026](https://sifted.eu/articles/dust-series-b-40m); [SiliconANGLE](https://siliconangle.com/2026/05/18/multiplayer-ai-startup-dust-swipes-40m-funding-help-enterprises-move-beyond-isolated-ai-assistants/) |
| mySecond $39/seat/mo | [mysecond.ai](https://mysecond.ai/) |
| ChatPRD claims 100K+ PMs, bootstrapped | [chatprd.ai](https://www.chatprd.ai/) (vendor claim); [Every podcast interview](https://every.to/podcast/she-built-an-ai-product-manager-bringing-in-six-figures-as-a-side-hustle-e46be9bc-f426-424d-992d-5a71fd7ac5e4) |
| Aakash Gupta PM OS $49 one-time | [Gumroad listing](https://growthpioneer.gumroad.com/l/pmos) |

## Slide 4 — Solution

| Claim | Source |
|---|---|
| Provenance tagging pattern (documented > verbal > hunch > industry) | Own design (DESIGN.md); prior art acknowledged: Paweł Huryn's pm-brain provenance tags — [github.com/phuryn/pm-brain](https://github.com/phuryn/pm-brain) |
| "Local, never pushes" trust posture | Product design decision (repo CLAUDE.md / design doc) |

## Slide 5 — Product phases

| Claim | Source |
|---|---|
| Phase sequencing rationale (brain wedge → loop prize) | [research/strategy-eval.md](../research/strategy-eval.md); `[Notion: Company Brain vs AI Operating System (YC RFS) + where gbrain fits]` |
| Diana Hu loop language ("compares it to what should be happening, and adjusts") | [ycombinator.com/rfs](https://www.ycombinator.com/rfs) |

## Slide 6 — Market

| Claim | Source |
|---|---|
| ~850K active PMs globally | [Corpwaters analysis](https://corpwaters.substack.com/p/how-many-product-managers-are-there) |
| Up to 2.6M LinkedIn "Product Manager" title holders | [LLCBuddy statistics](https://llcbuddy.com/data/product-management-statistics/) |
| ARPU anchor ~$470/yr | Derived from observed pricing: mySecond $39/mo, ChatPRD $15–29/mo `[Estimate]` |
| TAM $1–3.5B/yr · SAM $95–140M/yr · SOM $0.9–3.8M ARR | `[Estimate]` — derivation in [research/market-research.md §2](../research/market-research.md) |
| Knowledge-management software $20.15B (2024) → $62.15B (2033), 13.6% CAGR | [Grand View Research](https://www.grandviewresearch.com/industry-analysis/knowledge-management-software-market-report); alternate higher series: [SkyQuest](https://www.skyquestt.com/report/knowledge-management-software-market) ($34.99B 2024 → $92.45B 2033, 11.4% CAGR), [MRFR](https://www.marketresearchfuture.com/reports/knowledge-management-software-market-4193) |
| PM-software category reports ($6–35B for 2025) are low-confidence | Range across [WiseGuy](https://www.wiseguyreports.com/reports/product-management-software-market), [Dataintelo](https://dataintelo.com/report/global-product-management-software-market) et al. — flagged, not led with |

## Slide 7 — Competition

| Claim | Source |
|---|---|
| Mem $23.5M Series A led by OpenAI Startup Fund at $110M post; ~$29M total | [TechCrunch, Nov 2022](https://techcrunch.com/2022/11/10/ai-powered-note-taking-app-mem-raises-23-5m-openai/) |
| Rewind $15M at $350M (2023); → Limitless; acquired by Meta Dec 2025 | [Sacra](https://sacra.com/c/limitless/); [Crunchbase](https://www.crunchbase.com/organization/rewind-53b3) |
| Tana $25M total; $14M Series A at $100M post | [TechCrunch, Feb 2025](https://techcrunch.com/2025/02/03/tana-snaps-up-25m-with-its-ai-powered-knowledge-graph-for-work-racking-up-a-160k-waitlist/) |
| Glean / Dust / Granola figures | See Slide 3 rows above |
| Notion 100M users; $500M+ ARR | [Notion, Aug 2024](https://www.notion.com/blog/100-million-of-you); [CNBC, Sep 2025](https://www.cnbc.com/2025/09/18/notion-launches-ai-agent-as-it-crosses-500-million-in-annual-revenue.html) |
| Onyx YC W24, $10M seed (context for enterprise-OSS lane) | [TechCrunch](https://techcrunch.com/2025/03/12/why-onyx-thinks-its-open-source-solution-will-win-enterprise-search/); [Onyx](https://onyx.app/blog/seed-round) |
| Supermemory $2.6–3M seed | [TechCrunch, Oct 2025](https://techcrunch.com/2025/10/06/a-19-year-old-nabs-backing-from-google-execs-for-his-ai-memory-startup-supermemory/) |
| Letta $10M seed at $70M post | [BigDATAwire, Sep 2024](https://www.hpcwire.com/bigdatawire/this-just-in/letta-emerges-from-stealth-with-10m-to-build-ai-agents-with-advanced-memory/) |
| Zep YC W24, $3.3M | [Generational](https://www.generational.pub/p/memory-in-ai-agents) |
| Huryn pm-brain free MIT; pm-skills 11K+ stars | [github.com/phuryn/pm-brain](https://github.com/phuryn/pm-brain); [Product Compass](https://www.productcompass.pm/p/pm-brain-os) |
| mySecond founder ex-Aha! | [mysecond.ai](https://mysecond.ai/); [Maven course page](https://maven.com/ron-yang/claude-code-os-product-managers) |

## Slide 8 — Moat

| Claim | Source |
|---|---|
| GBrain engine MIT-free (commoditization argument) | [github.com/garrytan/gbrain](https://github.com/garrytan/gbrain) |
| Encoding "what should happen" as the unsolved step | Analysis in `[Notion: Company Brain vs AI Operating System (YC RFS) + where gbrain fits]`, grounded in both RFS texts |
| GBrain graph worth +31.4 P@5; LongMemEval R@5 97.6% (substrate quality context) | `[Notion: 2 · Backend Technical Reference]`; [Digg](https://digg.com/ai/82u1xlg1) — snapshot figures, re-verify before quoting live |

## Slide 9 — GTM · Slide 10 — Roadmap

| Claim | Source |
|---|---|
| Motions, funnel, pricing flip, kill criteria | [research/strategy-eval.md](../research/strategy-eval.md) §5–6 `[Estimate/plan]` |
| T1 falsification gate | Repo TODOS.md (pre-existing project gate) |

## Slides 11–12 — Team / Ask

Placeholders by design — no external claims.

---

*Compiled from research/market-research.md (Phase 2). If any figure is re-used in new material after ~Q3 2026, re-verify: funding rounds, star counts, and user counts are snapshots.*
