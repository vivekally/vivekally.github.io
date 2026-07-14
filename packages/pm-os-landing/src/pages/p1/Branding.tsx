import { Badge, PageHead } from "../../components/Ui";

const queue = [
  { day: "Tue", title: "Why our activation metric was lying to us", status: "drafted", skill: "/linkedin-post" },
  { day: "Thu", title: "3 things senior PMs told us about AI workflows", status: "idea", skill: "/linkedin-post" },
  { day: "Mon", title: "Shipping guided setup: the 2-week story", status: "scheduled", skill: "/linkedin-post" },
];

export default function Branding() {
  return (
    <div>
      <PageHead
        title="Personal Branding"
        sub="Part of Phase 1: start personal branding. Turn shipped work and insights into posts in your own voice."
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
          "Our activation number looked healthy. It wasn't. 38% of new workspaces never
          finished their first connector, and the dashboard averaged it away. Here's how we
          caught it, and what we changed…"
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
