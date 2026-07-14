import { Badge, PageHead } from "../../components/Ui";

const queue = [
  { day: "Tue", title: "New ruling tightens notice requirements — what suppliers should do now", status: "drafted", skill: "/client-alert" },
  { day: "Thu", title: "Checklist: preserving delay claims under supply contracts", status: "idea", skill: "/client-alert" },
  { day: "Mon", title: "CLE proposal: proving damages when the plant sits idle", status: "scheduled", skill: "/speaking-abstract" },
];

export default function Branding() {
  return (
    <div>
      <PageHead
        title="Practice Development"
        sub="Part of Phase 1: build your practice. Turn rulings and anonymized matter experience into client alerts and talks — confidentiality-screened before anything leaves the machine."
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
          "A supplier admitting delay in writing doesn't end the fight — the notice
          clause decides who pays for the idle plant. Three things we're watching after
          this month's ruling…"
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
