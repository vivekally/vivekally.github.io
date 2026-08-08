import { useState } from "react";
import { Badge, PageHead } from "../../components/Ui";
import { memoryById, queries, type Query } from "../../data/brain";

export default function Ask() {
  const [active, setActive] = useState<Query>(queries[0]);
  const [stage, setStage] = useState(0); // 0 idle · 1 searching · 2 found · 3 answered
  const [running, setRunning] = useState(false);

  const cited = active.sources.map((id) => memoryById[id]).filter(Boolean);

  function ask(q: Query) {
    setActive(q);
    setStage(0);
    setRunning(true);
    setTimeout(() => setStage(1), 60);
    setTimeout(() => setStage(2), 750);
    setTimeout(() => {
      setStage(3);
      setRunning(false);
    }, 1500);
  }

  const thinking = [
    "searching 1,634 memories",
    `found ${active.sources.length} relevant ${active.sources.length === 1 ? "source" : "sources"}`,
    "composing answer with receipts",
  ];

  return (
    <div>
      <PageHead
        title="Ask the Brain"
        sub="Answers come with receipts: every claim links back to the memory it came from."
        right={<Badge tone="cyan">demo data</Badge>}
      />

      <div className="glass p-5">
        <div className="flex gap-2">
          <input
            readOnly
            value={active.question}
            className="flex-1 rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <button
            onClick={() => ask(active)}
            disabled={running}
            className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink disabled:opacity-60"
          >
            {running ? "Thinking…" : "Ask"}
          </button>
        </div>

        {/* retrieval trace */}
        {stage > 0 && stage < 3 && (
          <div className="mt-4 rounded-lg border border-line bg-[#0A0E16] p-4 font-mono text-[12.5px] leading-relaxed">
            {thinking.slice(0, stage).map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300">
                <span className={i === stage - 1 ? "animate-pulse text-accent" : "text-accent"}>▸</span>
                {t}
              </div>
            ))}
          </div>
        )}

        {/* answer + receipts */}
        {stage === 3 && (
          <div className="mt-5 space-y-4">
            <div className="rounded-lg bg-white/[0.05] p-5">
              <p className="text-sm leading-relaxed text-slate-200">{active.answer}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {active.decision && <Badge tone="green">decision: {active.decision}</Badge>}
                <Badge tone="cyan">
                  {cited.length} {cited.length === 1 ? "source" : "sources"}
                </Badge>
              </div>
            </div>
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Cited memories
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {cited.map((m) => (
                  <div key={m.id} className="rounded-lg border border-accent/20 bg-accent/5 p-4">
                    <div className="flex items-center gap-2">
                      <Badge tone="cyan">{m.source}</Badge>
                      <Badge tone={m.provenance === "documented" ? "doc" : "verbal"}>
                        {m.provenance}
                      </Badge>
                      <span className="ml-auto text-xs text-slate-500">{m.when}</span>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white">{m.title}</div>
                    <div className="mt-1 text-xs text-slate-400">{m.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {stage === 0 && (
          <div className="mt-5 text-xs text-slate-500">
            Press Ask, or pick a question below — every answer cites the memories it used.
          </div>
        )}
      </div>

      {/* clickable question bank */}
      <div className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Try asking
      </div>
      <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
        {queries.map((q) => (
          <button
            key={q.id}
            onClick={() => ask(q)}
            className={`glass glass-hover px-4 py-3 text-left transition ${
              active.id === q.id ? "border-accent/40 bg-accent/5 text-white" : "text-slate-300"
            }`}
          >
            <span className="text-slate-500">“</span>
            {q.question}
            <span className="text-slate-500">”</span>
          </button>
        ))}
      </div>
    </div>
  );
}
