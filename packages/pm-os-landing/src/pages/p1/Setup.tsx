import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, PageHead, ProgressBar } from "../../components/Ui";
import {
  connectors,
  interview,
  provenanceTone,
  seededClaims,
  type Claim,
} from "../../data/context";

const INSTALL_CMD = "npx pm-os init";
const INSTALL_OUTPUT = [
  "✓ installed · runs on your Claude Pro/Max — no new subscription",
  "✓ created ~/datapulse-brain/",
  `✓ imported ${seededClaims} claims from an existing Notion + Jira export`,
  "→ ready. run /pm-onboard to seed your brain",
];
const ONBOARD_TARGET = 40; // "onboarded" threshold the claims bar fills toward

type ConnState = "off" | "connecting" | "on";

/** A single provenance-tagged claim row (DESIGN.md "brain file output" pattern). */
function ClaimRow({ claim }: { claim: Claim }) {
  return (
    <div className="flex items-center gap-2 py-0.5 text-xs">
      <span className="text-slate-600">–</span>
      <span className="flex-1 text-slate-300">{claim.text}</span>
      <Badge tone={provenanceTone[claim.prov]}>{claim.prov}</Badge>
    </div>
  );
}

/** Collapsible step container with number / active / done states. */
function Step({
  n,
  title,
  detail,
  status,
  open,
  onToggle,
  children,
}: {
  n: number;
  title: string;
  detail: string;
  status: "done" | "active" | "locked";
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className={`glass overflow-hidden ${status === "locked" ? "opacity-50" : ""}`}>
      <button
        onClick={onToggle}
        disabled={status === "locked"}
        className="flex w-full items-center gap-3 px-5 py-4 text-left disabled:cursor-not-allowed"
      >
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
            status === "done"
              ? "bg-accent/15 text-accent"
              : status === "active"
              ? "bg-accent text-ink"
              : "border border-white/20 text-slate-400"
          }`}
        >
          {status === "done" ? "✓" : n}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-white">{title}</span>
          <span className="block truncate text-sm text-slate-400">{detail}</span>
        </span>
        {status === "done" && <Badge tone="green">done</Badge>}
        {status !== "locked" && (
          <span className="font-mono text-xs text-slate-500">{open ? "▲" : "▼"}</span>
        )}
      </button>
      {open && status !== "locked" && (
        <div className="border-t border-line px-5 py-5">{children}</div>
      )}
    </div>
  );
}

export default function Setup() {
  // ── wizard state ──────────────────────────────────────────────────────────
  const [openStep, setOpenStep] = useState<number | null>(1);

  const [installed, setInstalled] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [installLines, setInstallLines] = useState(0);
  const [copied, setCopied] = useState(false);

  const [answered, setAnswered] = useState<Record<string, number>>({});

  const [conn, setConn] = useState<Record<string, ConnState>>({});
  const [step3Ack, setStep3Ack] = useState(false);

  const [skillStage, setSkillStage] = useState(0); // 0 idle · 1–3 running · 4 done
  const [skillRunning, setSkillRunning] = useState(false);
  const [skillRan, setSkillRan] = useState(false);

  const [openFile, setOpenFile] = useState<string | null>(null);

  // ── derived ─────────────────────────────────────────────────────────────
  const connectedCount = connectors.filter((c) => conn[c.id] === "on").length;

  const doneFlags = [
    installed,
    Object.keys(answered).length === interview.length,
    step3Ack,
    skillRan,
  ];
  const doneCount = doneFlags.filter(Boolean).length;
  const allDone = doneCount === doneFlags.length;

  const statusOf = (i: number): "done" | "active" | "locked" =>
    doneFlags[i] ? "done" : doneFlags.slice(0, i).every(Boolean) ? "active" : "locked";

  const interviewCount = interview.reduce((s, q) => {
    const ai = answered[q.id];
    return ai == null ? s : s + q.answers[ai].count;
  }, 0);
  const connectorCount = connectors.reduce(
    (s, c) => s + (conn[c.id] === "on" ? c.claimsAdded : 0),
    0
  );
  const claimsCaptured = (installed ? seededClaims : 0) + interviewCount + connectorCount;

  // ── handlers ──────────────────────────────────────────────────────────────
  const toggle = (n: number) => setOpenStep((cur) => (cur === n ? null : n));

  function runInstall() {
    if (installing || installed) return;
    setInstalling(true);
    setInstallLines(0);
    INSTALL_OUTPUT.forEach((_, i) => {
      setTimeout(() => {
        setInstallLines(i + 1);
        if (i === INSTALL_OUTPUT.length - 1) {
          setInstalling(false);
          setInstalled(true);
          setOpenStep(2);
        }
      }, 450 * (i + 1));
    });
  }

  function copyCmd() {
    navigator.clipboard?.writeText(INSTALL_CMD).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function answer(qId: string, ai: number) {
    setAnswered((a) => {
      const next = { ...a, [qId]: ai };
      if (Object.keys(next).length === interview.length) setOpenStep(3);
      return next;
    });
  }

  function connect(id: string) {
    if (conn[id]) return;
    setConn((c) => ({ ...c, [id]: "connecting" }));
    setTimeout(() => setConn((c) => ({ ...c, [id]: "on" })), 750);
  }

  function ackStep3() {
    setStep3Ack(true);
    setOpenStep(4);
  }

  function runSkill() {
    if (skillRunning || skillRan) return;
    setSkillRunning(true);
    [1, 2, 3].forEach((s) => setTimeout(() => setSkillStage(s), 550 * s));
    setTimeout(() => {
      setSkillRunning(false);
      setSkillRan(true);
      setSkillStage(4);
    }, 550 * 4);
  }

  // current (first unanswered) interview question
  const currentQ = interview.find((q) => answered[q.id] == null);
  const answeredList = interview.filter((q) => answered[q.id] != null);

  const skillSteps = ["loading brain context", "drafting from your backlog", "attaching receipts"];

  return (
    <div>
      <PageHead
        title="Welcome to PM OS"
        sub="Write your product knowledge once, into simple files the AI reads automatically. Four steps and your team is onboarded."
        right={<Badge tone="green">Free to start</Badge>}
      />

      {/* progress + claims captured */}
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="glass p-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-white">Setup progress</span>
            <span className="text-slate-400">
              {doneCount} of {doneFlags.length} complete
            </span>
          </div>
          <ProgressBar pct={(doneCount / doneFlags.length) * 100} tone="cyan" />
        </div>
        <div className="glass p-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-white">Claims captured</span>
            <span className="font-mono text-accent">{claimsCaptured}</span>
          </div>
          <ProgressBar pct={Math.min((claimsCaptured / ONBOARD_TARGET) * 100, 100)} />
          <p className="mt-2 text-xs text-slate-500">
            {claimsCaptured >= ONBOARD_TARGET
              ? "Enough to ground every skill — your brain is onboarded."
              : `~${ONBOARD_TARGET} sourced claims onboards your brain.`}
          </p>
        </div>
      </div>

      {/* ── the wizard ── */}
      <div className="space-y-3">
        {/* Step 1 — Install */}
        <Step
          n={1}
          title="Install PM OS"
          detail="One command. Works with your existing AI subscription."
          status={statusOf(0)}
          open={openStep === 1}
          onToggle={() => toggle(1)}
        >
          <div className="rounded-lg border border-line bg-[#0A0E16] p-4 font-mono text-[12.5px] leading-relaxed">
            <div className="flex items-center justify-between gap-3">
              <span>
                <span className="text-slate-500">$ </span>
                <span className="text-codegreen">{INSTALL_CMD}</span>
              </span>
              <button
                onClick={copyCmd}
                className="rounded border border-white/15 px-2 py-0.5 text-[11px] text-slate-300 hover:bg-white/5"
              >
                {copied ? "copied ✓" : "copy"}
              </button>
            </div>
            {installLines > 0 && (
              <div className="mt-2 space-y-0.5">
                {INSTALL_OUTPUT.slice(0, installLines).map((l, i) => (
                  <div key={i} className={l.startsWith("→") ? "text-slate-400" : "text-slate-300"}>
                    {l}
                  </div>
                ))}
              </div>
            )}
          </div>
          {!installed && (
            <button
              onClick={runInstall}
              disabled={installing}
              className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink disabled:opacity-60"
            >
              {installing ? "Installing…" : "Run install"}
            </button>
          )}
        </Step>

        {/* Step 2 — Guided interview */}
        <Step
          n={2}
          title="Write context once"
          detail="A short guided interview turns what you know into sourced claims."
          status={statusOf(1)}
          open={openStep === 2}
          onToggle={() => toggle(2)}
        >
          {/* answered so far */}
          {answeredList.length > 0 && (
            <div className="mb-4 space-y-2">
              {answeredList.map((q) => {
                const a = q.answers[answered[q.id]];
                return (
                  <div key={q.id} className="rounded-lg border border-line bg-panel2 p-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-accent">→</span>
                      <code className="text-codegreen">{q.file}</code>
                      <span className="text-slate-500">+{a.count} claims</span>
                    </div>
                    <div className="mt-1.5">
                      {a.claims.map((c, i) => (
                        <ClaimRow key={i} claim={c} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* current question */}
          {currentQ ? (
            <div>
              <div className="mb-1 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                Question {answeredList.length + 1} of {interview.length} ·{" "}
                <span className="text-codegreen">{currentQ.file}</span>
              </div>
              <div className="mb-3 font-semibold text-white">{currentQ.q}</div>
              <div className="flex flex-wrap gap-2">
                {currentQ.answers.map((a, ai) => (
                  <button
                    key={ai}
                    onClick={() => answer(currentQ.id, ai)}
                    className="rounded-lg border border-accent/30 bg-accent/5 px-3.5 py-2 text-sm text-slate-200 transition hover:border-accent/60 hover:bg-accent/10"
                  >
                    ▸ {a.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Pre-filled for the DataPulse demo — in your own brain you'd type or paste the answer.
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-accent">
              ✓ Interview complete — {interviewCount} claims written across {interview.length} files.
            </div>
          )}
        </Step>

        {/* Step 3 — Connect tools */}
        <Step
          n={3}
          title="Connect tools"
          detail="Optional. Let the brain feed itself from where work already happens."
          status={statusOf(2)}
          open={openStep === 3}
          onToggle={() => toggle(3)}
        >
          <div className="space-y-2">
            {connectors.map((c) => {
              const state = conn[c.id] ?? "off";
              return (
                <div
                  key={c.id}
                  className="flex items-center gap-3 rounded-lg border border-line bg-panel2 px-4 py-3"
                >
                  <span className="font-mono text-accent/70">{c.glyph}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-white">{c.label}</div>
                    <div className="truncate text-xs text-slate-500">
                      {state === "on" ? `imported ${c.imports} · +${c.claimsAdded} claims` : c.imports}
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
                      onClick={() => connect(c.id)}
                      className="rounded-lg border border-white/15 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-white/5"
                    >
                      Connect
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={ackStep3}
              disabled={connectedCount === 0}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink disabled:opacity-40"
            >
              Continue →
            </button>
            <button onClick={ackStep3} className="text-sm text-slate-400 hover:text-slate-200">
              Skip for now
            </button>
          </div>
        </Step>

        {/* Step 4 — First skill */}
        <Step
          n={4}
          title="Run your first skill"
          detail="Every skill reads the brain first — and cites it."
          status={statusOf(3)}
          open={openStep === 4}
          onToggle={() => toggle(4)}
        >
          <div className="rounded-lg border border-line bg-[#0A0E16] p-4 font-mono text-[12.5px] leading-relaxed">
            <span className="text-slate-500">$ </span>
            <span className="text-codegreen">/prd-generator</span>
            <span className="text-slate-400"> "self-serve connector setup"</span>
            {skillStage > 0 && (
              <div className="mt-2 space-y-0.5">
                {skillSteps.map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 ${
                      skillStage > i + 1 || skillStage === 4 ? "text-slate-300" : skillStage === i + 1 ? "text-white" : "text-slate-600"
                    }`}
                  >
                    <span className={skillStage === i + 1 && skillStage !== 4 ? "animate-pulse text-accent" : "text-accent"}>
                      {skillStage > i + 1 || skillStage === 4 ? "✓" : "▸"}
                    </span>
                    {s}
                  </div>
                ))}
              </div>
            )}
            {skillRan && (
              <div className="mt-3 border-t border-line pt-3 text-slate-300">
                <div className="text-white">→ PRD draft ready · 4 sections, 9 receipts</div>
                <div className="mt-1 text-xs text-slate-400">
                  “Primary user is the <span className="text-slate-200">data lead who owns activation</span>”
                  <span className="ml-1 text-slate-600">· src: context/personas.md</span>
                </div>
              </div>
            )}
          </div>
          {!skillRan && (
            <button
              onClick={runSkill}
              disabled={skillRunning}
              className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink disabled:opacity-60"
            >
              {skillRunning ? "Running…" : "Run /prd-generator"}
            </button>
          )}
        </Step>
      </div>

      {/* ── live brain panel ── */}
      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Your brain
      </h2>
      <div className="glass divide-y divide-white/5">
        {interview.map((q) => {
          const ai = answered[q.id];
          const captured = ai != null;
          const a = captured ? q.answers[ai] : null;
          const isOpen = openFile === q.file;
          return (
            <div key={q.id} className="px-5 py-3.5">
              <div className="flex items-center gap-4">
                <code className="w-52 shrink-0 text-xs text-codegreen">{q.file}</code>
                <span className="flex-1 text-sm text-slate-400">
                  {captured ? (
                    <span className="text-accent">✓ {a!.count} claims captured</span>
                  ) : (
                    <span className="text-slate-600">not captured yet</span>
                  )}
                </span>
                <button
                  onClick={() => setOpenFile(isOpen ? null : q.file)}
                  disabled={!captured}
                  className="rounded-lg border border-white/15 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-white/5 disabled:opacity-30"
                >
                  {isOpen ? "Hide" : "View"}
                </button>
              </div>
              {isOpen && a && (
                <div className="mt-2 rounded-lg border border-line bg-[#0A0E16] p-3">
                  <div className="mb-1 font-mono text-[11px] text-slate-500">## {q.file}</div>
                  {a.claims.map((c, i) => (
                    <ClaimRow key={i} claim={c} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── completion / next step ── */}
      {allDone ? (
        <div className="mt-6 rounded-lg border border-accent/25 bg-accent/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-bold text-white">Your brain is live.</div>
              <p className="mt-1 text-sm text-slate-300">
                {claimsCaptured} sourced claims across {interview.length} files. Every skill now
                reads this automatically — and cites it.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/phase-1/runner"
                className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
              >
                Skill Runner
              </Link>
              <Link
                to="/phase-1/skills"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink shadow-glow"
              >
                Browse skills →
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex items-center justify-between rounded-lg border border-accent/20 bg-accent/5 px-5 py-4 text-sm">
          <span className="text-slate-300">
            Context written once. Every skill reads it automatically.
          </span>
          <Link to="/phase-1/skills" className="rounded-lg bg-accent px-4 py-2 font-semibold text-ink">
            Browse skills →
          </Link>
        </div>
      )}
    </div>
  );
}
