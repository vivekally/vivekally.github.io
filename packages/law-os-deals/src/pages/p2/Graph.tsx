import { Badge, PageHead } from "../../components/Ui";
import { graphEdges, graphNodes } from "../../data/brain";

const fill: Record<string, string> = {
  person: "#5B8DEF",
  issue: "#B48EF5",
  artifact: "#D9A406",
  decision: "#3DDC84",
};

export default function Graph() {
  const byId = Object.fromEntries(graphNodes.map((n) => [n.id, n]));
  return (
    <div>
      <PageHead
        title="Knowledge Graph"
        sub="Typed edges connect people, issues, artifacts and decisions. The graph wires itself as the deal moves."
        right={<Badge tone="cyan">demo data</Badge>}
      />

      <div className="glass p-4">
        <svg viewBox="0 0 700 400" className="h-auto w-full">
          {graphEdges.map((e, i) => {
            const a = byId[e.from];
            const b = byId[e.to];
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2;
            return (
              <g key={i}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth={1.5}
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
          {graphNodes.map((n) => (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={26} fill={fill[n.kind]} opacity={0.15} />
              <circle cx={n.x} cy={n.y} r={7} fill={fill[n.kind]} />
              <text
                x={n.x}
                y={n.y + 44}
                textAnchor="middle"
                fill="#e2e8f0"
                fontSize="12"
                fontWeight={600}
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
        {Object.entries(fill).map(([k, v]) => (
          <span key={k} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: v }} />
            {k}
          </span>
        ))}
        <span className="ml-auto text-slate-500">
          Edge types: proposed_20% · led_to · shapes · open_in · blocks · feeds
        </span>
      </div>
    </div>
  );
}
