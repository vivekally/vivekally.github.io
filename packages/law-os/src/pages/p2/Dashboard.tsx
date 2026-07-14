import { Badge, PageHead, Stat } from "../../components/Ui";
import { memories, priorities } from "../../data/brain";

const toneBySource: Record<string, "violet" | "cyan" | "amber" | "green" | "slate"> = {
  Deposition: "green",
  Email: "cyan",
  Filing: "slate",
  Call: "amber",
  Hearing: "violet",
};

export default function Dashboard() {
  return (
    <div>
      <PageHead
        title="Matter Brain"
        sub="Think → Remember → Create. Everything captured across your matters this week, auto-summarized and distilled into structured knowledge."
        right={<Badge tone="amber">Phase 2 · Paid add-on</Badge>}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Memories" value="1,634" hint="+42 this week" />
        <Stat label="Patterns detected" value="7" hint="3 need attention" />
        <Stat label="Sources connected" value="3" hint="Email · DMS · Docket" />
        <Stat label="Questions answered" value="312" hint="with record cites" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Fresh memory · auto-summarized
          </h2>
          <div className="space-y-3">
            {memories.map((m) => (
              <div key={m.id} className="glass glass-hover px-5 py-4">
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
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Today's priorities · from patterns
          </h2>
          <div className="space-y-3">
            {priorities.map((p) => (
              <div key={p.id} className="glass px-5 py-4">
                <div className="flex items-start gap-2">
                  {p.urgent && <Badge tone="amber">urgent</Badge>}
                  <span className="font-medium leading-snug text-white">{p.text}</span>
                </div>
                <div className="mt-2 text-xs text-slate-500">{p.why}</div>
              </div>
            ))}
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
