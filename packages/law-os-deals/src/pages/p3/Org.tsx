import { Badge, PageHead, Stat } from "../../components/Ui";
import { members } from "../../data/org";

export default function Org() {
  return (
    <div>
      <PageHead
        title="Practice Group"
        sub="Expand from one lawyer to the whole practice group. Same OS, shared know-how, one place to manage it."
        right={
          <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink">
            + Invite lawyer
          </button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Lawyers onboarded" value="5 / 6" />
        <Stat label="Shared brains" value="1" hint="Firm Brain" />
        <Stat label="Personal brains" value="4" />
        <Stat label="Shared skills" value="12" hint="firm library" />
      </div>

      <div className="glass divide-y divide-white/5">
        {members.map((m) => (
          <div key={m.name} className="flex items-center gap-4 px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-line2 bg-panel2 font-mono text-xs font-bold text-accent">
              {m.initials}
            </div>
            <div className="w-44">
              <div className="font-semibold text-white">{m.name}</div>
              <div className="text-xs text-slate-500">{m.role}</div>
            </div>
            <div className="flex-1">
              <Badge tone={m.brain === "Invited" ? "slate" : m.brain.includes("Company") ? "cyan" : "violet"}>
                {m.brain}
              </Badge>
            </div>
            <div className="text-right text-sm text-slate-400">
              {m.skillsRun > 0 ? `${m.skillsRun} skills run` : "pending"}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-[#D9A406]/20 bg-[#D9A406]/5 p-5 text-sm leading-relaxed text-slate-300">
        <span className="font-semibold text-[#D9A406]">Why this works:</span> onboarding is
        replicable by design. The same context + skills + workflows foundation that
        onboarded one lawyer rolls out to the practice group, and later to the whole firm.
      </div>
    </div>
  );
}
