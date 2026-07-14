import { ReactNode } from "react";

export function Badge({
  children,
  tone = "green",
}: {
  children: ReactNode;
  tone?: "violet" | "cyan" | "amber" | "green" | "slate" | "doc" | "verbal";
}) {
  // Workbench B: green = free/active, amber = paid, slate = teams/neutral.
  // "violet" and "cyan" map to green/slate so legacy call sites stay valid.
  // "doc"/"verbal" are provenance tags — exact DESIGN.md colors, never reused
  // for other meaning.
  const tones: Record<string, string> = {
    green: "bg-accent/10 text-accent border-accent/25",
    violet: "bg-accent/10 text-accent border-accent/25",
    amber: "bg-[#D9A406]/10 text-[#D9A406] border-[#D9A406]/25",
    cyan: "bg-panel2 text-slate-400 border-line2",
    slate: "bg-panel2 text-slate-400 border-line2",
    doc: "bg-[#7FE8B0]/10 text-[#7FE8B0] border-[#7FE8B0]/25",
    verbal: "bg-[#5BC0EB]/10 text-[#5BC0EB] border-[#5BC0EB]/25",
  };
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function PageHead({
  title,
  sub,
  right,
}: {
  title: string;
  sub?: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold text-white">{title}</h1>
        {sub && <p className="mt-1 max-w-2xl text-sm text-slate-400">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="glass p-4">
      <div className="font-mono text-2xl font-bold text-white">{value}</div>
      <div className="mt-1 font-mono text-xs uppercase tracking-wider text-slate-500">
        {label}
      </div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}

export function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="toggle"
      className={`relative h-5 w-9 rounded-full transition ${
        on ? "bg-accent" : "bg-white/15"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${
          on ? "left-[18px] bg-ink" : "left-0.5 bg-white"
        }`}
      />
    </button>
  );
}

export function ProgressBar({ pct, tone = "green" }: { pct: number; tone?: string }) {
  const bg = tone === "amber" ? "bg-[#D9A406]" : "bg-accent";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <div className={`h-full rounded-full ${bg}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
