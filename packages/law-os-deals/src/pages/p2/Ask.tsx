import { useState } from "react";
import { Badge, PageHead } from "../../components/Ui";
import { cannedAnswer, memories } from "../../data/brain";

export default function Ask() {
  const [asked, setAsked] = useState(false);
  const cited = memories.filter((m) => cannedAnswer.sources.includes(m.id));

  return (
    <div>
      <PageHead
        title="Ask the Brain"
        sub="Answers come with receipts: every claim links back to the record it came from."
        right={<Badge tone="cyan">demo data</Badge>}
      />

      <div className="glass p-5">
        <div className="flex gap-2">
          <input
            readOnly
            value={cannedAnswer.question}
            className="flex-1 rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <button
            onClick={() => setAsked(true)}
            className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink"
          >
            Ask
          </button>
        </div>

        {asked && (
          <div className="mt-5 space-y-4">
            <div className="rounded-lg bg-white/[0.05] p-5">
              <p className="text-sm leading-relaxed text-slate-200">{cannedAnswer.answer}</p>
              <div className="mt-3 flex items-center gap-2">
                <Badge tone="violet">decision: {cannedAnswer.decision}</Badge>
                <Badge tone="green">2 sources</Badge>
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
                      <span className="text-xs text-slate-500">{m.when}</span>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white">{m.title}</div>
                    <div className="mt-1 text-xs text-slate-400">{m.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!asked && (
          <div className="mt-5 text-xs text-slate-500">
            Try it: press Ask to see a grounded answer with cited sources.
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-3 text-sm text-slate-400 md:grid-cols-3">
        {[
          "Which consents are still outstanding on Basalt?",
          "What did we concede in the last markup, and what did we get back?",
          "How did we define earnout revenue on Halcyon?",
        ].map((q) => (
          <div key={q} className="glass glass-hover cursor-default px-4 py-3 text-slate-300">
            "{q}"
          </div>
        ))}
      </div>
    </div>
  );
}
