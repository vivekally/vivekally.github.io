import { Badge, PageHead } from "../../components/Ui";
import { connectors, pipeline } from "../../data/brain";

export default function Ingest() {
  return (
    <div>
      <PageHead
        title="Connectors & Ingest"
        sub="Consolidate the matter record from the tools you already use. Every item flows through the same pipeline into memory."
        right={<Badge tone="amber">Phase 2 · Paid add-on</Badge>}
      />

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Pipeline · auto-summarize → distill → structured knowledge
      </h2>
      <div className="mb-8 grid gap-3 md:grid-cols-4">
        {pipeline.map((p, i) => (
          <div key={p.step} className="glass relative p-5">
            <div className="text-xs font-bold text-accent">STEP {i + 1}</div>
            <div className="mt-1 font-semibold text-white">{p.step}</div>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{p.detail}</p>
            {i < pipeline.length - 1 && (
              <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-slate-600 md:block">
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Connectors
      </h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {connectors.map((c) => (
          <div key={c.name} className="glass glass-hover flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-white">
              {c.name[0]}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">{c.name}</div>
              <div className="text-xs text-slate-400">{c.items}</div>
            </div>
            {c.status === "connected" ? (
              <Badge tone="green">connected</Badge>
            ) : (
              <button className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/5">
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
