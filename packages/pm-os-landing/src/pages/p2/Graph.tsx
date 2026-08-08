import { useState } from "react";
import { Badge, PageHead } from "../../components/Ui";
import { graphEdges, graphNodes, memoryById, nodeDetail } from "../../data/brain";

// Node-kind legend colors, anchored on the Workbench B palette (accent-green
// forward, amber + slate for contrast). Distinct from the brain-file
// provenance tags, which live only on memory pills.
const fill: Record<string, string> = {
  person: "#8A93A6", // slate
  theme: "#5BC0EB", // teal
  artifact: "#D9A406", // amber
  decision: "#3DDC84", // accent green
};

export default function Graph() {
  const byId = Object.fromEntries(graphNodes.map((n) => [n.id, n]));
  const [selected, setSelected] = useState<string | null>(null);

  const neighborIds = new Set<string>();
  if (selected) {
    graphEdges.forEach((e) => {
      if (e.from === selected) neighborIds.add(e.to);
      if (e.to === selected) neighborIds.add(e.from);
    });
  }
  const isActive = (id: string) => !selected || id === selected || neighborIds.has(id);
  const edgeActive = (e: { from: string; to: string }) =>
    !selected || e.from === selected || e.to === selected;

  const detail = selected ? nodeDetail[selected] : null;
  const selNode = selected ? byId[selected] : null;
  const selEdges = selected
    ? graphEdges.filter((e) => e.from === selected || e.to === selected)
    : [];

  return (
    <div>
      <PageHead
        title="Knowledge Graph"
        sub="Typed edges connect people, themes, artifacts and decisions. Click any node to trace what it touches."
        right={<Badge tone="cyan">demo data</Badge>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* graph */}
        <div className="glass p-4 lg:col-span-2">
          <svg viewBox="0 0 700 400" className="h-auto w-full">
            {graphEdges.map((e, i) => {
              const a = byId[e.from];
              const b = byId[e.to];
              const mx = (a.x + b.x) / 2;
              const my = (a.y + b.y) / 2;
              const on = edgeActive(e);
              return (
                <g key={i} opacity={on ? 1 : 0.15}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={on && selected ? "#3DDC84" : "rgba(255,255,255,0.18)"}
                    strokeWidth={on && selected ? 2 : 1.5}
                  />
                  <text
                    x={mx}
                    y={my - 6}
                    textAnchor="middle"
                    fill="rgba(148,163,184,0.9)"
                    fontSize="10"
                    fontFamily="ui-monospace, monospace"
                  >
                    {e.label}
                  </text>
                </g>
              );
            })}
            {graphNodes.map((n) => {
              const on = isActive(n.id);
              const sel = selected === n.id;
              return (
                <g
                  key={n.id}
                  opacity={on ? 1 : 0.25}
                  onClick={() => setSelected(sel ? null : n.id)}
                  style={{ cursor: "pointer" }}
                >
                  {sel && <circle cx={n.x} cy={n.y} r={16} fill="none" stroke={fill[n.kind]} strokeWidth={1.5} opacity={0.6} />}
                  <circle cx={n.x} cy={n.y} r={26} fill={fill[n.kind]} opacity={0.15} />
                  <circle cx={n.x} cy={n.y} r={sel ? 9 : 7} fill={fill[n.kind]} />
                  <text
                    x={n.x}
                    y={n.y + 44}
                    textAnchor="middle"
                    fill={sel ? "#fff" : "#e2e8f0"}
                    fontSize="12"
                    fontWeight={600}
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* inspector */}
        <div className="glass p-5 lg:col-span-1">
          {detail && selNode ? (
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: fill[selNode.kind] }}
                />
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  {detail.kindLabel}
                </span>
              </div>
              <div className="mt-2 text-lg font-bold text-white">{selNode.label}</div>
              <p className="mt-1 text-sm text-slate-400">{detail.blurb}</p>

              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Connections
              </div>
              <div className="mt-2 space-y-1.5">
                {selEdges.map((e, i) => {
                  const other = e.from === selected ? byId[e.to] : byId[e.from];
                  const dir = e.from === selected ? "→" : "←";
                  return (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-accent">{dir}</span>
                      <span className="font-mono text-slate-500">{e.label}</span>
                      <span className="text-slate-300">{other.label}</span>
                    </div>
                  );
                })}
              </div>

              {detail.memoryIds.length > 0 && (
                <>
                  <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Grounded in
                  </div>
                  <div className="mt-2 space-y-2">
                    {detail.memoryIds.map((id) => {
                      const m = memoryById[id];
                      return (
                        <div key={id} className="rounded-lg border border-line bg-panel2 p-3">
                          <div className="flex items-center gap-2">
                            <Badge tone="cyan">{m.source}</Badge>
                            <span className="ml-auto text-xs text-slate-500">{m.when}</span>
                          </div>
                          <div className="mt-1.5 text-sm font-medium text-white">{m.title}</div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              <button
                onClick={() => setSelected(null)}
                className="mt-4 text-xs text-slate-500 hover:text-slate-300"
              >
                ← clear selection
              </button>
            </div>
          ) : (
            <div className="flex h-full flex-col justify-center">
              <div className="text-sm text-slate-300">Click a node</div>
              <p className="mt-1 text-xs text-slate-500">
                Selecting a node highlights everything it connects to and shows the memories it's
                grounded in.
              </p>
              <div className="mt-5 space-y-2">
                {Object.entries(fill).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: v }} />
                    {k}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 text-xs text-slate-500">
        Edge types: causes · informs · owns_risk · led_to · produced · experiences — the graph wires
        itself as knowledge lands.
      </div>
    </div>
  );
}
