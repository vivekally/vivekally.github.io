#!/usr/bin/env python3
"""
Group the suite bar in all five reports into AI and Robotics.

Run from "/Users/aially/Desktop/Claude Code". Numbering resets within each
category to match the hub. The active tab is preserved per report.
"""
import re, sys, pathlib

TARGETS = {
  "ai-stack-report/src/ai_stack_full_r2026-09.html":      "stack",
  "Top AI Labs Report/index.html":                        "labs",
  "ai-frontier-tracker-2026/index.html":                  "frontier",
  "ai-robotics-report-2026/index.html":                   "robot",
  "ai-robotics-stack-2026/index.html":                    "rstack",
}
URL = {
  "stack":    "https://vivekally.github.io/ai-stack-report/",
  "labs":     "https://vivekally.github.io/ai-labs-briefing-2026/",
  "frontier": "https://vivekally.github.io/ai-frontier-tracker-2026/",
  "robot":    "https://vivekally.github.io/ai-robotics-report-2026/",
  "rstack":   "https://vivekally.github.io/ai-robotics-stack-2026/",
}
AI    = [("stack", "01 Stack Landscape"), ("labs", "02 Labs Briefing"),
         ("frontier", "03 Frontier Board")]
ROBO  = [("robot", "01 Physical AI"), ("rstack", "02 Robotics Stack")]

CSS = """  .sb-group { display:flex; align-items:center; gap:0.4rem; }
  .sb-glabel { font-size:9px; letter-spacing:0.16em; font-weight:600; padding-right:0.15rem; }
  .sb-glabel.ai { color:#5ee7c4; }
  .sb-glabel.ro { color:#6aa9df; }
  .sb-sep { width:1px; height:16px; background:rgba(255,255,255,0.14); margin:0 0.5rem; flex:none; }
  .sb-tab.ro.active { background:rgba(106,169,223,0.16); border-color:rgba(106,169,223,0.45); color:#6aa9df; }
  .sb-tabs { overflow-x:auto; scrollbar-width:none; }
  .sb-tabs::-webkit-scrollbar { display:none; }
  @media (max-width: 900px) { .sb-sep { margin:0 0.35rem; } .suitebar { padding-right:0.6rem; } }
"""

def tabs_for(active):
    def grp(items, cls, label):
        out = [f'<span class="sb-glabel {cls}">{label}</span>']
        for key, text in items:
            a = " active" if key == active else ""
            k = " ro" if cls == "ro" else ""
            out.append(f'<a class="sb-tab{k}{a}" href="{URL[key]}">{text}</a>')
        return '<div class="sb-group">' + "".join(out) + "</div>"
    return (grp(AI, "ai", "AI") + '<span class="sb-sep"></span>'
            + grp(ROBO, "ro", "ROBOTICS"))

changed, failed = [], []
for path, active in TARGETS.items():
    p = pathlib.Path(path)
    if not p.exists():
        failed.append(f"{path}: missing"); continue
    h = p.read_text()

    # Balanced scan: the replacement inserts nested <div>s, so a non-greedy
    # ".*?</div>" would corrupt the file on a second run. Count depth instead,
    # which keeps this script safely re-runnable.
    open_tag = '<div class="sb-tabs">'
    i = h.find(open_tag)
    if i < 0:
        failed.append(f"{path}: no sb-tabs block"); continue
    inner = i + len(open_tag)
    depth, j = 1, inner
    while depth and j < len(h):
        nxt_o = h.find("<div", j)
        nxt_c = h.find("</div>", j)
        if nxt_c < 0:
            break
        if 0 <= nxt_o < nxt_c:
            depth += 1; j = nxt_o + 4
        else:
            depth -= 1
            if depth == 0:
                break
            j = nxt_c + 6
    if depth:
        failed.append(f"{path}: unbalanced sb-tabs"); continue
    h = h[:inner] + tabs_for(active) + h[nxt_c:]

    if ".sb-group {" not in h:
        anchor = "  .sb-tab.active {"
        i = h.find(anchor)
        if i < 0:
            failed.append(f"{path}: no CSS anchor"); continue
        j = h.index("\n", h.index("}", i)) + 1
        h = h[:j] + CSS + h[j:]

    p.write_text(h)
    n_ai = len(re.findall(r'sb-glabel ai', h))
    changed.append(f"{path}  (active={active}, groups={n_ai})")

print("\n".join("  OK   " + c for c in changed))
if failed:
    print("\nFAILED:"); print("\n".join("  FAIL " + f for f in failed)); sys.exit(1)
print(f"\nPatched {len(changed)} report suite bars")
