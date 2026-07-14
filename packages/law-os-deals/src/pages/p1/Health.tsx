import { Link } from "react-router-dom";
import { Badge, PageHead, ProgressBar } from "../../components/Ui";
import { contextFiles } from "../../data/context";

function grade(h: number) {
  if (h >= 80) return { label: "Strong", tone: "text-accent" };
  if (h >= 60) return { label: "Good", tone: "text-slate-300" };
  return { label: "Needs work", tone: "text-[#D9A406]" };
}

export default function Health() {
  const avg = Math.round(contextFiles.reduce((a, f) => a + f.health, 0) / contextFiles.length);
  return (
    <div>
      <PageHead
        title="Deal Health"
        sub="Skills are only as good as the deal files they read. Keep these fresh and every draft improves."
        right={<Badge tone="green">Phase 1 · Free</Badge>}
      />

      <div className="glass mb-6 flex items-center gap-6 p-6">
        <div>
          <div className="text-5xl font-extrabold text-white">{avg}</div>
          <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">overall score</div>
        </div>
        <div className="flex-1">
          <ProgressBar pct={avg} />
          <p className="mt-3 text-sm text-slate-400">
            Two files are drifting: positions.md lags the v4 markup, the precedent
            index is 6 weeks old.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {contextFiles.map((f) => {
          const g = grade(f.health);
          return (
            <div key={f.id} className="glass glass-hover flex items-center gap-5 px-5 py-4">
              <code className="w-52 shrink-0 text-xs text-codegreen">{f.file}</code>
              <div className="flex-1">
                <ProgressBar pct={f.health} tone={f.health < 60 ? "amber" : "violet"} />
              </div>
              <span className={`w-24 text-right text-sm font-semibold ${g.tone}`}>{g.label}</span>
              <span className="w-16 text-right text-sm text-slate-400">{f.health}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-accent/25 bg-accent/5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">This is where Deal Brain comes in</span>
              <Badge tone="amber">paid add-on</Badge>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              With the Brain enabled, deal files stop going stale: redlines, data-room
              docs and calls are auto-summarized and distilled into the deal record, and
              drift like this gets flagged the day it appears.
            </p>
          </div>
          <Link
            to="/phase-2"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-ink shadow-glow"
          >
            Preview Deal Brain →
          </Link>
        </div>
      </div>
    </div>
  );
}
