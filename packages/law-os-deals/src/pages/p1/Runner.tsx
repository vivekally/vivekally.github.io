import { useState } from "react";
import { Badge, PageHead } from "../../components/Ui";
import { reviewerAgents } from "../../data/skills";

const steps = [
  { who: "you", text: "/markup-review corven spa v4 redline" },
  {
    who: "os",
    text: "Reading deal: terms.md, positions.md, open-points.md, precedents/ \u2713\nThree quick questions:\n1. Turn deadline?\n2. Any new business terms agreed?\n3. Escalate the cap to the client?",
  },
  { who: "you", text: "1. Friday  2. Rollover fixed at 15%  3. Yes, with our precedent set" },
  {
    who: "os",
    text: "Classifying 41 changes\u2026 6 against positions.md, 2 new asks.\nRunning reviewer agents: Partner, Counterparty, Tax\u2026\nResponse plan ready \u2192 deals/basalt-corven/markups/v4-response.md",
  },
];

export default function Runner() {
  const [visible, setVisible] = useState(1);
  const done = visible >= steps.length;

  return (
    <div>
      <PageHead
        title="Skill Runner"
        sub="Run a skill, answer a few clarifying questions, get a response plan grounded in your positions. This mock runs /markup-review."
        right={<Badge tone="cyan">demo data</Badge>}
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="glass flex min-h-[420px] flex-col p-5 lg:col-span-3">
          <div className="flex-1 space-y-3">
            {steps.slice(0, visible).map((m, i) => (
              <div
                key={i}
                className={`max-w-[92%] whitespace-pre-wrap rounded-lg px-4 py-3 text-sm leading-relaxed ${
                  m.who === "you"
                    ? "ml-auto bg-panel2 text-slate-200"
                    : "bg-white/[0.06] text-slate-300"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <button
            disabled={done}
            onClick={() => setVisible((v) => Math.min(v + 1, steps.length))}
            className={`mt-4 rounded-lg px-4 py-2 text-sm font-semibold ${
              done
                ? "cursor-default border border-white/10 text-slate-500"
                : "bg-accent text-ink"
            }`}
          >
            {done ? "Run complete" : "Next step ▷"}
          </button>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <div className="glass p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Reviewer agents
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {reviewerAgents.map((a) => (
                <Badge key={a} tone={done ? "green" : "slate"}>
                  {done ? "✓ " : ""}{a}
                </Badge>
              ))}
            </div>
          </div>
          <div className={`glass p-5 transition ${done ? "" : "opacity-40"}`}>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Artifact
            </div>
            <div className="mt-2 font-mono text-xs text-codegreen">
              deals/basalt-corven/markups/v4-response.md
            </div>
            <div className="mt-3 rounded-lg bg-black/40 p-4 text-xs leading-relaxed text-slate-300">
              <div className="font-bold text-white"># Markup response: SPA v4</div>
              <div className="mt-1">**Against positions** Cap 20% → counter 12% (3 precedents)…</div>
              <div className="mt-1">**New asks** MAE carve-outs broadened; flag to client…</div>
              <div className="mt-1">**Trades** Accept 15-month survival if cap ≤ 12%…</div>
              <div className="mt-1 text-slate-500">+ 4 more sections</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
