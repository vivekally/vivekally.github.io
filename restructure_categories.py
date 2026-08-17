#!/usr/bin/env python3
"""
Split the hub into two categories: AI and Robotics.

Card markup is preserved verbatim; only ordering, category headers, copy and
the stale stack-report stats change. Numbering resets within each category, so
"04 Robotics" becomes "Robotics 01" rather than starting a section at four.
"""
import re, sys, pathlib

p = pathlib.Path("index.html")
h = p.read_text()
done, fail = [], []

def rep(old, new, label, n=1):
    global h
    if h.count(old) < n:
        fail.append(f"{label}: not found"); return
    h = h.replace(old, new, n); done.append(label)

# ── extract the five card blocks verbatim ──
def grab(cls):
    m = re.search(r'(<a class="card ' + cls + r'".*?</a>)\n', h, re.S)
    if not m: sys.exit(f"card {cls} not found")
    return m.group(1)

card_track  = grab("card-track")
card_rstack = grab("card-rstack")
card_robot  = grab("card-robot")
card_stack  = grab("card-stack")
card_labs   = grab("card-labs")

# ── CSS for the category bands ──
rep("""  .cross { border-top:1px solid rgba(255,255,255,0.08);""",
"""  .cat { display:flex; align-items:baseline; gap:1rem; flex-wrap:wrap;
         border-top:1px solid rgba(255,255,255,0.09); padding-top:1.5rem; margin-bottom:1.8rem; }
  .cat:first-of-type { border-top:none; padding-top:0; }
  .cat-n { font-family:'JetBrains Mono',monospace; font-size:0.62rem; letter-spacing:0.18em;
           text-transform:uppercase; color:#4a5162; }
  .cat h2 { font-family:'DM Serif Display',serif; font-weight:400; font-size:2rem; line-height:1; color:#f0f2f7; }
  .cat-ai h2 em, .cat-ai .cat-rule { color:#5ee7c4; }
  .cat-ro h2 em, .cat-ro .cat-rule { color:#6aa9df; }
  .cat-meta { font-family:'JetBrains Mono',monospace; font-size:0.62rem; letter-spacing:0.1em;
              text-transform:uppercase; color:#6b7285; margin-left:auto; }
  .cat-ai .cat-meta b { color:#5ee7c4; font-weight:500; }
  .cat-ro .cat-meta b { color:#6aa9df; font-weight:500; }
  .cat-lede { font-size:0.92rem; line-height:1.65; color:#8b93a5; max-width:60em; margin:-0.9rem 0 1.8rem; }
  .band { margin-bottom:3rem; }
  .cross { border-top:1px solid rgba(255,255,255,0.08);""",
    "category CSS")

# ── rebuild the shelf area as two bands ──
start = h.index('  <a class="card card-track"')
end   = h.index('  <div class="cross">')

BANDS = f"""  <div class="cat cat-ai">
    <span class="cat-n">Category 01</span>
    <h2><em>AI</em></h2>
    <span class="cat-meta"><b>3 reports</b> &middot; the stack, the labs, the frontier</span>
  </div>
  <p class="cat-lede">Software AI, from the silicon underneath it to the people deciding where it goes next. Where the value sits, what the builders believe, and who is attacking the problems nobody has solved.</p>
  <div class="band">
    <div class="shelf">
{card_stack}

{card_labs}
    </div>
{card_track}
  </div>

  <div class="cat cat-ro">
    <span class="cat-n">Category 02</span>
    <h2><em>Robotics</em></h2>
    <span class="cat-meta"><b>2 reports</b> &middot; physical AI, evidence-graded</span>
  </div>
  <p class="cat-lede">Physical AI, where a claim has to survive contact with hardware. What has actually shipped and what has only raised, and the fourteen-layer supply chain neither side can escape.</p>
  <div class="band">
{card_robot}

{card_rstack}
  </div>

"""
h = h[:start] + BANDS + h[end:]
done.append("two-band restructure")

# ── renumber tags within category ──
for old, new, lab in [
  ('<span class="tag">01 · SUPPLY SIDE</span>', '<span class="tag">AI 01 · SUPPLY SIDE</span>', "tag AI 01"),
  ('<span class="tag">02 · DEMAND SIDE</span>', '<span class="tag">AI 02 · DEMAND SIDE</span>', "tag AI 02"),
  ('<span class="tag">03 · THE FRONTIER</span>', '<span class="tag">AI 03 · THE FRONTIER</span>', "tag AI 03"),
  ('<span class="tag">04 · PHYSICAL AI</span>', '<span class="tag">ROBOTICS 01 · PHYSICAL AI</span>', "tag RO 01"),
  ('<span class="tag">05 · THE ROBOTICS STACK</span>', '<span class="tag">ROBOTICS 02 · THE STACK</span>', "tag RO 02"),
]:
    rep(old, new, lab)

# ── header copy ──
rep('<div class="eyebrow">Independent research · <b>Refreshed August 7, 2026</b> · vivekally.github.io</div>',
    '<div class="eyebrow">Independent research · <b>Refreshed August 17, 2026</b> · vivekally.github.io</div>',
    "eyebrow date")
rep('<h1>The market, <em>and the minds</em> behind it.</h1>',
    '<h1>Two industries, <em>one research shelf</em>.</h1>', "h1")
rep("""<p class="sub">Five reports on AI in 2026. The <b>Stack Landscape</b> maps where the money and the moats sit, layer by layer. The <b>Labs Briefing</b> maps what the people building it actually believe. The <b>Frontier Board</b> tracks who is attacking the problems nobody has solved yet, and where this year's capital actually landed. <b>Two Robot Industries</b> leaves the software behind and asks what physical AI has actually shipped, and <b>The Robotics Stack</b> maps the whole industry beneath it, layer by layer.</p>""",
    """<p class="sub">Five reports, in two categories. <b>AI</b> covers the software stack, the labs setting its direction, and the frontier bets nobody has solved yet. <b>Robotics</b> covers physical AI, where every deployment claim is graded against a stated evidence bar and mapped onto the supply chain underneath it. Same method throughout: volatility-tiered fact-checks, conflicts logged rather than smoothed, and every figure sourced.</p>""",
    "sub copy")

# ── crosswalk grouped by category ──
rep('<div class="cross">', '<div class="cat cat-ai" style="margin-top:1rem"><span class="cat-n">Where to start</span><h2><em>AI</em></h2></div>\n  <div class="cross">', "crosswalk AI header")
rep("""    <div>
      <h3>Read the robotics stack first if&hellip;</h3>""",
"""  </div>
  <div class="cat cat-ro"><span class="cat-n">Where to start</span><h2><em>Robotics</em></h2></div>
  <div class="cross">
    <div>
      <h3>Read the robotics stack first if&hellip;</h3>""", "crosswalk RO split")

# ── stack-report card stats were stale (r2026-09 shipped Aug 17) ──
rep('<span class="fresh">R3 · JUL 13 2026</span>',
    '<span class="fresh">R2026-09 · AUG 17 2026</span>', "stack card date")
rep("""        <div class="stat"><div class="n">97</div><div class="l">Companies</div></div>
        <div class="stat"><div class="n">$2T+</div><div class="l">Ecosystem</div></div>
        <div class="stat"><div class="n">19</div><div class="l">Fact-checks</div></div>""",
"""        <div class="stat"><div class="n">159</div><div class="l">Companies</div></div>
        <div class="stat"><div class="n">$2T+</div><div class="l">Ecosystem</div></div>
        <div class="stat"><div class="n">37</div><div class="l">Fact-checks</div></div>""",
    "stack card stats")
rep("""      <p>12 layers from silicon to verticals. Competitive tables, market sizing, funding metrics, strategic gaps, company knowledge graph.</p>""",
    """      <p>12 layers from silicon to verticals, three cross-cutting spines (security, regulation, energy), and the demand-side record: 88% of enterprises have adopted AI, about 6% can show EBIT impact. Charts, competitive tables, a searchable index and a knowledge graph.</p>""",
    "stack card copy")

# ── meta ──
rep('<title>AI Intelligence · 2026 — The market, the minds, and the frontier</title>',
    '<title>AI Intelligence · 2026 — AI and Robotics research</title>', "title")
h = re.sub(r'<meta name="description" content="[^"]*">',
  '<meta name="description" content="Five independent 2026 research reports in two categories. AI: the Technology Stack Landscape (12 layers, 159 companies, adoption and ROI data), the State of the Labs Briefing (22 labs, 4 doctrines), and the Frontier Board (38 unsolved-problem startups, funding month by month). Robotics: Two Robot Industries (physical AI, 20 companies graded against an evidence bar) and The Robotics Stack (14 layers, 181 companies). Fact-checked, source-cited, no tracking.">',
  h, count=1); done.append("meta description")
rep('<meta property="og:description" content="Where the value sits. What the builders believe. Who is working on what nobody has solved.">',
    '<meta property="og:description" content="Five reports in two categories. AI: the stack, the labs, the frontier. Robotics: what physical AI has actually shipped.">',
    "og description")
rep('<div class="foot">ALL FIVE REPORTS: VOLATILITY-TIERED FACT-CHECK DISCIPLINE · CONFLICTS LOGGED, NOT SMOOTHED · SOURCE-CITED · SINGLE-FILE HTML, NO TRACKING</div>',
    '<div class="foot">TWO CATEGORIES · FIVE REPORTS · ONE METHOD: VOLATILITY-TIERED FACT-CHECK DISCIPLINE · CONFLICTS LOGGED, NOT SMOOTHED · SOURCE-CITED · SINGLE-FILE HTML, NO TRACKING</div>',
    "footer")

p.write_text(h)
print("\n".join("  OK   " + d for d in done))
if fail:
    print("\nFAILED:"); print("\n".join("  FAIL " + f for f in fail)); sys.exit(1)
print(f"\nWrote index.html ({len(h):,} bytes)")
