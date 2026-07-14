import { useState } from "react";
import { Badge, PageHead } from "../../components/Ui";
import { reviewerAgents } from "../../data/skills";

const steps = [
  { who: "you", text: "/motion-draft partial summary judgment on liability" },
  {
    who: "os",
    text: "Reading matter: facts.md, theory.md, deadlines.md, authorities/ \u2713\nThree quick questions:\n1. Relief sought?\n2. Lead authority?\n3. Filing deadline?",
  },
  { who: "you", text: "1. Partial SJ on liability under \u00a74.2  2. Harmon v. TDX  3. 09-12" },
  {
    who: "os",
    text: "Drafting motion\u2026 applying theory.md (elements map) and the admissions in facts.md.\nRunning reviewer agents: Partner, Opposing Counsel, Ethics & Privilege\u2026\nDraft ready \u2192 matters/meridian/drafts/msj-liability.md",
  },
];

export default function Runner() {
  const [visible, setVisible] = useState(1);
  const done = visible >= steps.length;

  return (
    <div>
      <PageHead
        title="Skill Runner"
        sub="Run a skill, answer a few clarifying questions, get a draft grounded in the record. This mock runs /motion-draft."
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
              matters/meridian/drafts/msj-liability.md
            </div>
            <div className="mt-3 rounded-lg bg-black/40 p-4 text-xs leading-relaxed text-slate-300">
              <div className="font-bold text-white"># Motion: Partial SJ — liability</div>
              <div className="mt-1">**Ground** Six-week delay admitted in Ex. 14…</div>
              <div className="mt-1">**Authority** Harmon v. TDX; §4.2 notice line…</div>
              <div className="mt-1">**Deadline** Filing due 09-12 (docket entry 87)…</div>
              <div className="mt-1 text-slate-500">+ 5 more sections</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
