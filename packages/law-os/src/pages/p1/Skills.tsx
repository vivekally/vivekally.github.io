import { useState } from "react";
import { Badge, PageHead, Toggle } from "../../components/Ui";
import { categories, skills as seed, workflows, type Skill } from "../../data/skills";

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>(seed);
  const [cat, setCat] = useState<string>("All");
  const [open, setOpen] = useState<Skill | null>(null);

  const shown = skills.filter((s) => cat === "All" || s.category === cat);
  const toggle = (id: string) =>
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));

  return (
    <div>
      <PageHead
        title="Skills Library"
        sub="No commands to memorize. Browse available skills, review skill files, enable what you need, and build your own."
        right={
          <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink">
            + Skill Builder
          </button>
        }
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              cat === c
                ? "bg-accent/10 text-accent ring-1 ring-accent/30"
                : "border border-white/10 text-slate-400 hover:text-slate-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((s) => (
          <div key={s.id} className="glass glass-hover flex flex-col p-5">
            <div className="flex items-start justify-between gap-2">
              <code className="text-xs text-codegreen">{s.command}</code>
              <Toggle on={s.enabled} onClick={() => toggle(s.id)} />
            </div>
            <div className="mt-2 font-semibold text-white">{s.name}</div>
            <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-400">{s.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <Badge tone="slate">{s.category}</Badge>
              <button
                onClick={() => setOpen(s)}
                className="text-xs font-medium text-accent hover:text-codegreen"
              >
                View skill file →
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Workflows · chain skills together
      </h2>
      <div className="glass divide-y divide-white/5">
        {workflows.map((w) => (
          <div key={w.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
            <span className="w-44 font-medium text-white">{w.name}</span>
            <code className="flex-1 text-xs text-slate-400">{w.steps}</code>
            <span className="text-xs text-slate-500">{w.runs} runs</span>
          </div>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-6"
          onClick={() => setOpen(null)}
        >
          <div
            className="glass max-h-[80vh] w-full max-w-lg overflow-auto bg-[#0d1220] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <code className="text-sm text-codegreen">{open.command}/SKILL.md</code>
              <button onClick={() => setOpen(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>
            <pre className="whitespace-pre-wrap rounded-lg bg-black/40 p-4 text-xs leading-relaxed text-slate-300">
              {open.skillMd}
            </pre>
            <div className="mt-4 flex gap-2">
              <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink">
                Run skill
              </button>
              <button className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-slate-200">
                Duplicate & edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
