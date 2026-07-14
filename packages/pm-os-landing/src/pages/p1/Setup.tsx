import { Link } from "react-router-dom";
import { Badge, PageHead, ProgressBar } from "../../components/Ui";
import { contextFiles, setupSteps } from "../../data/context";

export default function Setup() {
  const done = setupSteps.filter((s) => s.done).length;
  return (
    <div>
      <PageHead
        title="Welcome to PM OS"
        sub="Write your product knowledge once, into simple files the AI reads automatically. Four steps and your team is onboarded."
        right={<Badge tone="green">Free to start</Badge>}
      />

      <div className="glass mb-6 p-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-white">Setup progress</span>
          <span className="text-slate-400">{done} of {setupSteps.length} complete</span>
        </div>
        <ProgressBar pct={(done / setupSteps.length) * 100} tone="cyan" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {setupSteps.map((s) => (
          <div key={s.id} className={`glass glass-hover p-5 ${s.done ? "opacity-80" : ""}`}>
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  s.done
                    ? "bg-accent/15 text-accent"
                    : "border border-white/20 text-slate-400"
                }`}
              >
                {s.done ? "✓" : s.id}
              </div>
              <div>
                <div className="font-semibold text-white">{s.label}</div>
                <div className="mt-1 text-sm text-slate-400">{s.detail}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Your context files
      </h2>
      <div className="glass divide-y divide-white/5">
        {contextFiles.map((f) => (
          <div key={f.id} className="flex items-center gap-4 px-5 py-3.5">
            <code className="w-52 shrink-0 text-xs text-codegreen">{f.file}</code>
            <span className="hidden flex-1 text-sm text-slate-400 md:block">{f.summary}</span>
            <span className="text-xs text-slate-500">{f.updated}</span>
            <button className="rounded-lg border border-white/15 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-white/5">
              Edit
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-lg border border-accent/20 bg-accent/5 px-5 py-4 text-sm">
        <span className="text-slate-300">
          Context written once. Every skill reads it automatically.
        </span>
        <Link
          to="/phase-1/skills"
          className="rounded-lg bg-accent px-4 py-2 font-semibold text-ink"
        >
          Browse skills →
        </Link>
      </div>
    </div>
  );
}
