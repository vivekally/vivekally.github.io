import { Badge, PageHead } from "../../components/Ui";

const queue = [
  { day: "Tue", title: "Deal points: where indemnity caps actually landed in 2026", status: "drafted", skill: "/deal-points-study" },
  { day: "Thu", title: "Earnout definitions that survive contact with reality", status: "idea", skill: "/client-alert" },
  { day: "Mon", title: "CLE proposal: closing mechanics for carve-out deals", status: "scheduled", skill: "/speaking-abstract" },
];

export default function Branding() {
  return (
    <div>
      <PageHead
        title="Practice Development"
        sub="Part of Phase 1: build your practice. Turn anonymized deal experience into alerts, studies and talks — confidentiality-screened before anything leaves the machine."
        right={<Badge tone="cyan">beta</Badge>}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {queue.map((q) => (
          <div key={q.title} className="glass glass-hover p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{q.day}</span>
              <Badge tone={q.status === "scheduled" ? "green" : q.status === "drafted" ? "violet" : "slate"}>
                {q.status}
              </Badge>
            </div>
            <div className="mt-3 font-semibold leading-snug text-white">{q.title}</div>
            <code className="mt-3 block text-xs text-codegreen">{q.skill}</code>
          </div>
        ))}
      </div>

      <div className="glass mt-6 p-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Draft preview · in your voice
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
          "Everyone claims 20% caps are market. Across our last twelve private deals the
          median was 12.5% — and the trades that moved it are more interesting than the
          number…"
        </p>
        <div className="mt-4 flex gap-2">
          <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink">
            Edit draft
          </button>
          <button className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-slate-200">
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
