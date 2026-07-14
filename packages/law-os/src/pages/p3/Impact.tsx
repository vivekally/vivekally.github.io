import { Badge, PageHead, Stat } from "../../components/Ui";
import { adoption, impactStats, loopTeaser } from "../../data/org";

export default function Impact() {
  const max = Math.max(...adoption);
  const pts = adoption
    .map((v, i) => `${(i / (adoption.length - 1)) * 640 + 30},${170 - (v / max) * 140}`)
    .join(" ");

  return (
    <div>
      <PageHead
        title="Impact"
        sub="Show partners the power of the firm brain: adoption and output across the practice, in one view."
        right={<Badge tone="cyan">demo data</Badge>}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {impactStats.map((s) => (
          <Stat key={s.label} label={s.label} value={s.value} hint={s.hint} />
        ))}
      </div>

      <div className="glass p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-white">Skills run per week</span>
          <span className="text-xs text-slate-500">last 12 weeks</span>
        </div>
        <svg viewBox="0 0 700 190" className="h-auto w-full">
          <defs>
            <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3DDC84" />
              <stop offset="100%" stopColor="#7FE8B0" />
            </linearGradient>
            <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(61,220,132,0.30)" />
              <stop offset="100%" stopColor="rgba(61,220,132,0)" />
            </linearGradient>
          </defs>
          <polygon points={`30,170 ${pts} 670,170`} fill="url(#area)" />
          <polyline points={pts} fill="none" stroke="url(#line)" strokeWidth="3" />
          {adoption.map((v, i) => (
            <circle
              key={i}
              cx={(i / (adoption.length - 1)) * 640 + 30}
              cy={170 - (v / max) * 140}
              r="3.5"
              fill="#3DDC84"
            />
          ))}
        </svg>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-dashed border-white/15 bg-white/[0.02] p-6">
        <div className="flex items-center gap-2">
          <Badge tone="slate">Phase 4 preview</Badge>
          <span className="font-semibold text-white">Recursive loops · self-learning OS</span>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-slate-400">
          {loopTeaser.map((l) => (
            <li key={l} className="flex gap-2">
              <span className="text-accent">↻</span>
              {l}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-slate-500">
          Take this toward a true Law OS: a self-learning OS for the whole firm. On the roadmap.
        </p>
      </div>
    </div>
  );
}
