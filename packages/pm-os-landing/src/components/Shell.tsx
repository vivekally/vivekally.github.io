import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Badge } from "./Ui";

const phases = [
  { id: "phase-1", label: "Phase 1", name: "PM Onboarding", tier: "Free", tierTone: "green" as const },
  { id: "phase-2", label: "Phase 2", name: "PM Brain", tier: "Pro", tierTone: "amber" as const },
  { id: "phase-3", label: "Phase 3", name: "Scale to Org", tier: "Teams", tierTone: "slate" as const },
];

const nav: Record<string, { to: string; label: string; icon: string }[]> = {
  "phase-1": [
    { to: "/phase-1/setup", label: "Setup", icon: "◇" },
    { to: "/phase-1/skills", label: "Skills Library", icon: "⌘" },
    { to: "/phase-1/runner", label: "Skill Runner", icon: "▷" },
    { to: "/phase-1/health", label: "Context Health", icon: "♥" },
    { to: "/phase-1/branding", label: "Personal Branding", icon: "✦" },
  ],
  "phase-2": [
    { to: "/phase-2/dashboard", label: "Brain Dashboard", icon: "◉" },
    { to: "/phase-2/ask", label: "Ask the Brain", icon: "?" },
    { to: "/phase-2/graph", label: "Knowledge Graph", icon: "⬡" },
    { to: "/phase-2/ingest", label: "Connectors & Ingest", icon: "⇄" },
  ],
  "phase-3": [
    { to: "/phase-3/org", label: "PM Org", icon: "▦" },
    { to: "/phase-3/company-brain", label: "Company Brain", icon: "◫" },
    { to: "/phase-3/impact", label: "Impact", icon: "↗" },
  ],
};

export default function Shell() {
  const { pathname } = useLocation();
  const current = phases.find((p) => pathname.startsWith(`/${p.id}`)) ?? phases[0];

  return (
    <div className="flex min-h-screen bg-ink">
      <aside className="fixed inset-y-0 left-0 z-20 flex w-60 flex-col border-r border-line bg-[#0A0E16] px-4 py-5">
        <Link to="/" className="flex items-center gap-2 px-1">
          <span className="font-mono text-[15px] font-medium tracking-wide text-accent">
            pm<span className="text-slate-600">-</span>os
          </span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-slate-600">
            proto
          </span>
        </Link>
        <div className="mt-3 flex items-center gap-2 px-1 font-mono text-[11px] text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_#3DDC84]" />
          Brain loaded <span className="text-slate-400">~/datapulse-brain</span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-1 rounded-lg border border-line bg-panel p-1">
          {phases.map((p) => (
            <Link
              key={p.id}
              to={`/${p.id}`}
              className={`rounded px-1 py-1.5 text-center font-mono text-[11px] font-medium transition ${
                current.id === p.id
                  ? "bg-accent/10 text-accent"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {p.label}
            </Link>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 px-1 text-xs font-medium">
          <span className="text-slate-200">{current.name}</span>
          <Badge tone={current.tierTone}>{current.tier}</Badge>
        </div>

        <nav className="mt-5 flex flex-col gap-1">
          {nav[current.id].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded px-3 py-2 text-[13px] font-medium transition ${
                  isActive
                    ? "bg-accent/10 text-white shadow-[inset_2px_0_0_#3DDC84]"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`
              }
            >
              <span className="w-4 text-center font-mono text-xs text-accent/70">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          {current.id === "phase-1" && (
            <Link
              to="/phase-2"
              className="mt-1 flex items-center gap-2.5 rounded px-3 py-2 text-[13px] font-medium text-slate-500 transition hover:bg-white/5"
            >
              <span className="w-4 text-center font-mono text-xs">◈</span>
              PM Brain
              <span className="ml-auto">
                <Badge tone="amber">Pro</Badge>
              </span>
            </Link>
          )}
        </nav>

        <div className="mt-auto space-y-3">
          {current.id === "phase-1" && (
            <div className="glass p-3 text-xs leading-relaxed text-slate-400">
              <span className="font-semibold text-white">Free to start.</span> Every
              skill is free, plus your first 25 memories. Pro unlocks unlimited memory,
              connectors and the weekly sweep.
              <Link
                to="/phase-2"
                className="mt-2 block rounded bg-accent px-3 py-1.5 text-center font-semibold text-ink transition hover:opacity-90"
              >
                Preview PM Brain
              </Link>
            </div>
          )}
          <Link to="/" className="block px-1 text-xs text-slate-500 hover:text-slate-300">
            ← Back to landing
          </Link>
        </div>
      </aside>

      <main className="ml-60 flex-1 px-8 py-7">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
