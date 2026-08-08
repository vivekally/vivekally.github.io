import { useState } from "react";
import { Badge, PageHead, Stat } from "../../components/Ui";
import { memories, patterns, priorities } from "../../data/brain";

const toneBySource: Record<string, "violet" | "cyan" | "amber" | "green" | "slate"> = {
  Meeting: "violet",
  Slack: "cyan",
  Interview: "green",
  Doc: "slate",
  Ticket: "amber",
};

export default function Dashboard() {
  const [selected, setSelected] = useState<string | null>(null);
  const pattern = patterns.find((p) => p.id === selected) ?? null;
  const litMemory = (id: string) => pattern?.memoryIds.includes(id) ?? false;
  const litPriority = (id: string) => pattern?.priorityId === id;

  return (
    <div>
      <PageHead
        title="PM Brain"
        sub="Think → Remember → Create. Everything captured this week, auto-summarized and distilled into structured knowledge."
        right={<Badge tone="amber">Pro · unlimited memory</Badge>}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Memories" value="1,634" hint="+42 this week" />
        <Stat label="Patterns detected" value="7" hint="3 need attention" />
        <Stat label="Sources connected" value="3" hint="Slack · Jira · Notion" />
        <Stat label="Questions answered" value="312" hint="with cited sources" />
      </div>

      {/* patterns — connect the dots backward */}
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Patterns detected · click to connect the dots
      </h2>
      <div className="mb-8 grid gap-3 md:grid-cols-3">
        {patterns.map((p) => {
          const on = selected === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelected(on ? null : p.id)}
              className={`glass glass-hover p-4 text-left transition ${
                on ? "border-accent/50 bg-accent/5" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <Badge tone={p.severity === "attention" ? "amber" : "slate"}>
                  {p.severity === "attention" ? "needs attention" : "watch"}
                </Badge>
                <span className="ml-auto font-mono text-[11px] text-slate-500">
                  {p.memoryIds.length} memories
                </span>
              </div>
              <div className="mt-2 text-sm font-semibold leading-snug text-white">{p.title}</div>
              {on && (
                <div className="mt-2 font-mono text-[11px] text-accent">
                  ↓ {p.memoryIds.length} memories → 1 priority
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Fresh memory · auto-summarized
            {pattern && (
              <span className="ml-2 font-normal normal-case text-slate-500">
                — highlighting {pattern.memoryIds.length} behind this pattern
              </span>
            )}
          </h2>
          <div className="space-y-3">
            {memories.map((m) => {
              const lit = litMemory(m.id);
              const dim = pattern && !lit;
              return (
                <div
                  key={m.id}
                  className={`glass glass-hover px-5 py-4 transition ${
                    lit ? "border-accent/50 bg-accent/5" : ""
                  } ${dim ? "opacity-40" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <Badge tone={toneBySource[m.source]}>{m.source}</Badge>
                    <Badge tone={m.provenance === "documented" ? "doc" : "verbal"}>
                      {m.provenance}
                    </Badge>
                    <span className="ml-auto text-xs text-slate-500">{m.when}</span>
                  </div>
                  <div className="mt-2 font-semibold text-white">{m.title}</div>
                  <p className="mt-1 text-sm text-slate-400">{m.note}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Today's priorities · from patterns
          </h2>
          <div className="space-y-3">
            {priorities.map((p) => {
              const lit = litPriority(p.id);
              const dim = pattern && !lit;
              return (
                <div
                  key={p.id}
                  className={`glass px-5 py-4 transition ${
                    lit ? "border-accent/50 bg-accent/5" : ""
                  } ${dim ? "opacity-40" : ""}`}
                >
                  <div className="flex items-start gap-2">
                    {p.urgent && <Badge tone="amber">urgent</Badge>}
                    <span className="font-medium leading-snug text-white">{p.text}</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">{p.why}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4 text-xs leading-relaxed text-slate-400">
            The Brain connects dots backwards and in real time: it remembers, prioritizes,
            auto-organizes and finds patterns so you can create.
          </div>
        </div>
      </div>
    </div>
  );
}
