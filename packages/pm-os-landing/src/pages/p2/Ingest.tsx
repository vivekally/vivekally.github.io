import { useState } from "react";
import { Badge, PageHead } from "../../components/Ui";
import { connectors, pipeline } from "../../data/brain";

type ConnState = "connecting" | "on";
// mock item counts added when an available connector is linked
const addItems: Record<string, number> = { Gong: 96, Amplitude: 210, HubSpot: 143 };

export default function Ingest() {
  const [conn, setConn] = useState<Record<string, ConnState>>({});
  const [stage, setStage] = useState(0); // 0 idle · 1–4 running · 5 done
  const [running, setRunning] = useState(false);
  const [distilled, setDistilled] = useState(1634);

  function connect(name: string) {
    if (conn[name]) return;
    setConn((c) => ({ ...c, [name]: "connecting" }));
    setTimeout(() => {
      setConn((c) => ({ ...c, [name]: "on" }));
      setDistilled((d) => d + (addItems[name] ?? 0));
    }, 800);
  }

  function runSample() {
    if (running) return;
    setRunning(true);
    setStage(0);
    [1, 2, 3, 4].forEach((s) => setTimeout(() => setStage(s), 550 * s));
    setTimeout(() => {
      setStage(5);
      setRunning(false);
      setDistilled((d) => d + 1);
    }, 550 * 5);
  }

  return (
    <div>
      <PageHead
        title="Connectors & Ingest"
        sub="Consolidate data from the tools you already use. Every item flows through the same pipeline into memory."
        right={<Badge tone="amber">Phase 2 · Paid add-on</Badge>}
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Pipeline · auto-summarize → distill → structured knowledge
        </h2>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-slate-500">
            memories in brain{" "}
            <span className="text-accent">{distilled.toLocaleString()}</span>
          </span>
          <button
            onClick={runSample}
            disabled={running}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink disabled:opacity-60"
          >
            {running ? "Ingesting…" : "Run a sample item"}
          </button>
        </div>
      </div>

      <div className="mb-4 grid gap-3 md:grid-cols-4">
        {pipeline.map((p, i) => {
          const step = i + 1;
          const active = stage === step;
          const done = stage > step || stage === 5;
          return (
            <div
              key={p.step}
              className={`glass relative p-5 transition ${
                active ? "border-accent shadow-glow" : done ? "border-accent/30" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-accent">STEP {step}</span>
                {active && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />}
                {done && !active && <span className="text-xs text-accent">✓</span>}
              </div>
              <div className="mt-1 font-semibold text-white">{p.step}</div>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">{p.detail}</p>
              {i < pipeline.length - 1 && (
                <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-slate-600 md:block">
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>

      {stage === 5 && (
        <div className="mb-8 rounded-lg border border-accent/25 bg-accent/5 p-4">
          <div className="flex items-center gap-2 text-xs">
            <Badge tone="cyan">Gong</Badge>
            <Badge tone="verbal">verbal</Badge>
            <span className="ml-auto text-slate-500">just now</span>
          </div>
          <div className="mt-2 text-sm font-semibold text-white">
            Acme flagged SSO as a security-review blocker
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Distilled from a 42-min call · linked to “Enterprise buyers stall at security review”.
          </p>
        </div>
      )}

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Connectors
      </h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {connectors.map((c) => {
          const state = c.status === "connected" ? "on" : conn[c.name];
          return (
            <div key={c.name} className="glass glass-hover flex items-center gap-4 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-white">
                {c.name[0]}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">{c.name}</div>
                <div className="text-xs text-slate-400">
                  {state === "on" && c.status !== "connected"
                    ? `${addItems[c.name] ?? 0} items distilled`
                    : c.items}
                </div>
              </div>
              {state === "on" ? (
                <span className="flex items-center gap-1.5 text-xs font-medium text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_#3DDC84]" />
                  connected
                </span>
              ) : state === "connecting" ? (
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  connecting…
                </span>
              ) : (
                <button
                  onClick={() => connect(c.name)}
                  className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/5"
                >
                  Connect
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
