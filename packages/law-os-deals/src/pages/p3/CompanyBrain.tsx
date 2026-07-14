import { Badge, PageHead } from "../../components/Ui";
import { sharedKnowledge, sources } from "../../data/org";

export default function CompanyBrain() {
  return (
    <div>
      <PageHead
        title="Firm Brain"
        sub="One shared memory for the practice. Privilege walls and per-source permissions keep client confidences intact while firm know-how compounds."
        right={<Badge tone="cyan">Phase 3 · Teams</Badge>}
      />

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Sources & permissions
      </h2>
      <div className="glass mb-8 divide-y divide-white/5">
        {sources.map((s) => (
          <div key={s.name} className="flex items-center gap-4 px-5 py-3.5">
            <span className="w-48 font-medium text-white">{s.name}</span>
            <span className="flex-1 text-sm text-slate-400">{s.scope}</span>
            <Badge tone={s.tone as "violet" | "cyan" | "amber"}>{s.access}</Badge>
          </div>
        ))}
      </div>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Ask across the firm
      </h2>
      <div className="space-y-3">
        {sharedKnowledge.map((k) => (
          <div key={k.q} className="glass glass-hover px-5 py-4">
            <div className="text-sm font-semibold text-codegreen">"{k.q}"</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{k.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-xs text-slate-500">
        Answers respect walls: a lawyer only sees what their matters allow.
      </div>
    </div>
  );
}
