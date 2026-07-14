import { useState } from "react";
import { Badge, PageHead } from "../../components/Ui";
import { reviewerAgents } from "../../data/skills";

const steps = [
  { who: "you", text: "/prd-generator guided connector setup for new workspaces" },
  {
    who: "os",
    text: "Reading context: company.md, product.md, personas.md, goals.md ✓\nThree quick questions:\n1. Primary persona for this flow?\n2. Success metric?\n3. Ship target?",
  },
  { who: "you", text: "1. Senior PM, new workspace admin  2. First-connector completion > 70%  3. End of Q3" },
  {
    who: "os",
    text: "Drafting PRD… applying goals.md (activation OKR) and persona 'workspace admin'.\nRunning reviewer agents: CTO, UX, Devil's Advocate…\nDraft ready → workflows/outputs/prd-guided-setup.md",
  },
];

export default function Runner() {
  const [visible, setVisible] = useState(1);
  const done = visible >= steps.length;

  return (
    <div>
      <PageHead
        title="Skill Runner"
        sub="Run a skill, answer a few clarifying questions, get an artifact in your team's voice. This mock runs /prd-generator."
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
              workflows/outputs/prd-guided-setup.md
            </div>
            <div className="mt-3 rounded-lg bg-black/40 p-4 text-xs leading-relaxed text-slate-300">
              <div className="font-bold text-white"># PRD: Guided connector setup</div>
              <div className="mt-1">**Problem** 38% of new workspaces never finish their first connector…</div>
              <div className="mt-1">**Persona** Workspace admin (senior PM)…</div>
              <div className="mt-1">**Success** First-connector completion &gt; 70% by end of Q3…</div>
              <div className="mt-1 text-slate-500">+ 6 more sections</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
