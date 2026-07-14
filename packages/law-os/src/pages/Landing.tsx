import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { prepare, layout } from "../lib/pretext";
import "../landing.css";

// Law OS — Litigation edition. Workbench B landing on the PM OS skeleton;
// class names match landing.css verbatim. All matters and firms are fictional.

function usePretext() {
  useEffect(() => {
    let disposed = false;
    const observers: Array<ResizeObserver | MutationObserver> = [];
    (async () => {
      await document.fonts.ready;
      if (disposed) return;
      const els = Array.from(
        document.querySelectorAll<HTMLElement>('[data-pretext="true"]')
      );
      const prepared = new Map<HTMLElement, unknown>();
      const measure = (el: HTMLElement) =>
        prepare(el.textContent ?? "", getComputedStyle(el).font);
      els.forEach((el) => prepared.set(el, measure(el)));
      const relayout = () => {
        prepared.forEach((handle, el) => {
          const lh = parseFloat(getComputedStyle(el).lineHeight);
          if (el.clientWidth > 0 && lh > 0) {
            el.style.height = `${layout(handle, el.clientWidth, lh).height}px`;
          }
        });
      };
      const ro = new ResizeObserver(relayout);
      ro.observe(document.body);
      observers.push(ro);
      relayout();
      els.forEach((el) => {
        if (el.isContentEditable) {
          const mo = new MutationObserver(() => {
            prepared.set(el, measure(el));
            relayout();
          });
          mo.observe(el, { characterData: true, subtree: true, childList: true });
          observers.push(mo);
        }
      });
    })();
    return () => {
      disposed = true;
      observers.forEach((o) => o.disconnect());
    };
  }, []);
}

const protoTabs = [
  { id: "p1", label: "Phase 1 · Skill Runner" },
  { id: "p2", label: "Phase 2 · Ask the Brain" },
  { id: "p3", label: "Phase 3 · Firm Brain" },
];

export default function Landing() {
  usePretext();
  const [tab, setTab] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const next =
      e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const n = (next + protoTabs.length) % protoTabs.length;
    setTab(n);
    tabRefs.current[n]?.focus();
  };

  return (
    <div className="landing-root">
      <header role="banner">
        <div className="nav-inner">
          <a className="logo" href="#">
            law<span>-</span>os<span>.app</span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            <a href="#phases">The 3 phases</a>
            <a href="#brain">The Brain</a>
            <a href="#skills">Skills</a>
            <a href="#how">How it works</a>
            <Link className="nav-cta" to="/phase-1/setup">
              Open the prototype
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" aria-labelledby="hero-h">
          <div className="hero-label">Law OS &middot; Litigation edition</div>
          <h1
            className="hero-head"
            id="hero-h"
            data-pretext="true"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
          >
            The operating system for <em>litigators</em>.
          </h1>
          <p className="hero-sub">
            Your AI knows nothing about your matters. Law OS fixes that:{" "}
            <strong>context, skills, workflows and automation</strong> for every lawyer,
            plus a <strong>matter brain</strong> that remembers every fact, deadline and
            decision. Onboard in minutes. Compound every matter.
          </p>
          <div className="hero-actions">
            <Link className="btn-primary" to="/phase-1/setup">
              Explore the clickable prototype
            </Link>
            <a className="btn-secondary" href="#phases">
              See the 3 phases
            </a>
          </div>
          <div className="hero-meta">
            plain markdown &middot; no vector DB &middot; privileged files never leave your machine
          </div>
          <div className="pillars" aria-label="The pillars of Law OS">
            <span className="pillar" title="Phase 1 · Lawyer Onboarding">Context</span>
            <span className="pillar" title="Phase 1 · Lawyer Onboarding">Skills</span>
            <span className="pillar" title="Phase 1 · Lawyer Onboarding">Workflows</span>
            <span className="pillar" title="Phase 1 · Lawyer Onboarding">Automation</span>
            <span className="pillar brain" title="Phase 2 · Matter Brain">+ Matter Brain</span>
          </div>
          <div className="phase-path" aria-label="Rollout path">
            01 Onboard <b>(free)</b> &rarr; 02 Remember <b>(add-on)</b> &rarr; 03 Scale{" "}
            <b>(firm)</b> &rarr; 04 Self-learn <b>(roadmap)</b>
          </div>

          <div className="mockup-wrap" aria-hidden="true">
            <div className="mockup-frame">
              <div className="mockup-chrome">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="mockup-url">~/hartwell-brain &middot; /matter-brain</span>
              </div>
              <div className="mockup-body">
                <nav className="mockup-nav">
                  <div className="m-nav-lbl">NEW MATTER</div>
                  <div className="m-item done"><span className="ic">&#10003;</span> Client &amp; engagement</div>
                  <div className="m-item done"><span className="ic">&#10003;</span> Parties</div>
                  <div className="m-item active"><span className="ic">&#8594;</span> Facts &amp; record</div>
                  <div className="m-item"><span className="ic">&#9675;</span> Theory &amp; risks</div>
                  <div className="m-item"><span className="ic">&#9675;</span> Deadlines</div>
                </nav>
                <div className="mockup-main">
                  <h3>What happened, in plain English?</h3>
                  <div className="sub">Type freely. We synthesize it into the brain as you go.</div>
                  <div className="m-input">
                    Corestone delivered the control units six weeks late. Meridian's plant
                    sat idle and they lost the Windsor contract. There's an email where
                    Corestone's ops lead admits the delay.
                  </div>
                  <div className="m-code-lbl">SYNTHESIZING &rarr;</div>
                  <div className="m-code">
                    <span className="m-file">matters/meridian/facts.md</span>
                    <span className="m-claim">## Timeline</span>
                    <span className="m-claim">
                      Units due 03-01, arrived 04-12<span className="tag doc">documented</span>
                    </span>
                    <span className="m-claim">
                      Ops lead admitted delay by email<span className="tag doc">documented</span>
                    </span>
                    <span className="m-file">hypotheses/causation.md</span>
                    <span className="m-claim">
                      Windsor loss flows from idle plant<span className="tag hunch">hunch</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THREE QUESTIONS */}
        <section className="questions" aria-label="The three questions litigation answers">
          <div className="questions-inner">
            <div className="q-cell">
              <div className="q-num">01</div>
              <h3>Do we have the <em>full record</em>?</h3>
              <p>Facts, exhibits and testimony &mdash; held in one place with every entry tagged by source, not scattered across binders and inboxes.</p>
            </div>
            <div className="q-cell">
              <div className="q-num">02</div>
              <h3>What does the <em>authority</em> say?</h3>
              <p>The cases and statutes you rely on, plus how courts have treated them since &mdash; checked before you cite, not after.</p>
            </div>
            <div className="q-cell">
              <div className="q-num">03</div>
              <h3>What's the <em>play</em>?</h3>
              <p>Your theory, the strategy calls already made, and what would reopen them &mdash; so you never argue against your own file.</p>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="section" aria-labelledby="problem-h">
          <div className="sec-lbl">The briefing tax</div>
          <h2
            id="problem-h"
            data-pretext="true"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
          >
            Most lawyers use AI as a chat box. The real problem, the growing record, keeps compounding.
          </h2>
          <p className="lead">
            The matter gets re-explained every session, drafts come back generic and cite
            nothing, and the best prompts stay trapped in one associate's browser.
            Meanwhile filings, transcripts and emails pile up faster than anyone can
            connect them.
          </p>

          <div className="two-col">
            <div className="col-card bad">
              <div className="card-lbl">Without Law OS</div>
              <h3>Every session from scratch</h3>
              <p>Ten minutes of catching the AI up before a useful answer. It guesses the facts, invents a standard, and hands you a memo you can't file.</p>
              <div className="snippet bad-snip">
                "Let me catch you up &mdash; we act for Meridian against Corestone in a
                supply-contract dispute. Trial is in November. Our theory is that the
                six-week delay caused the plant shutdown because&hellip;"
              </div>
            </div>
            <div className="col-card good">
              <div className="card-lbl">With Law OS</div>
              <h3>The matter loaded, with receipts</h3>
              <p>Your brain rides into any Claude or ChatGPT session. It knows the record, the theory, and the deadlines &mdash; and every claim is tagged with where it came from.</p>
              <div className="snippet good-snip">
                <span className="m-file" style={{ color: "var(--verbal)" }}>matters/meridian/theory.md</span>
                <span className="k">breach</span> = late delivery, &sect;4.2{" "}
                <span className="tag doc">documented</span><br />
                <span className="k">damages</span> = idle plant, $2.1M{" "}
                <span className="tag doc">documented</span><br />
                <span className="k">weakness</span> = notice email ambiguous{" "}
                <span className="tag hunch">hunch</span>
              </div>
            </div>
          </div>
        </section>

        {/* PHASES */}
        <section className="section" id="phases" aria-labelledby="phases-h">
          <div className="sec-lbl">The three phases</div>
          <h2
            id="phases-h"
            data-pretext="true"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
          >
            Three phases. One OS.
          </h2>
          <p className="lead">
            Start free with onboarding. Add the brain when you're ready to remember every
            matter. Scale it to your firm.
          </p>

          <div className="phase-grid">
            <article className="phase">
              <div className="phase-top">
                <span className="phase-num">PHASE 01</span>
                <span className="badge free">Free</span>
              </div>
              <h3>Lawyer Onboarding</h3>
              <div className="phase-tag">Your AI associate, preloaded</div>
              <p>Write your matter context once &mdash; client, parties, facts, theory, deadlines &mdash; then run curated skills for research, drafting, discovery and hearing prep.</p>
              <details className="fold">
                <summary>What's inside</summary>
                <ul>
                  <li>Matter intake + Matter Health</li>
                  <li>Skills Library, Skill Builder, orchestration</li>
                  <li>Workflows that chain research &rarr; draft &rarr; review</li>
                  <li>Practice development, built in</li>
                </ul>
              </details>
              <Link className="phase-cta" to="/phase-1/setup">Open Phase 1 &rarr;</Link>
            </article>

            <article className="phase">
              <div className="phase-top">
                <span className="phase-num">PHASE 02</span>
                <span className="badge paid">Paid add-on</span>
              </div>
              <h3>Matter Brain</h3>
              <div className="phase-tag">A second brain for your matters</div>
              <p>Every transcript, exhibit and call becomes structured knowledge: auto-summarize, distill, remember. Ask questions, get answers that cite the record, and watch a graph connect parties, issues and authorities.</p>
              <details className="fold">
                <summary>What's inside</summary>
                <ul>
                  <li>Memory with provenance on every fact</li>
                  <li>Knowledge graph of parties, issues, authorities</li>
                  <li>Connectors: email, DMS, docket</li>
                  <li>Deadline + limitation sweep, every Friday</li>
                </ul>
              </details>
              <Link className="phase-cta" to="/phase-2/dashboard">Open Phase 2 &rarr;</Link>
            </article>

            <article className="phase">
              <div className="phase-top">
                <span className="phase-num">PHASE 03</span>
                <span className="badge teams">Teams</span>
              </div>
              <h3>Scale to the Firm</h3>
              <div className="phase-tag">From one lawyer to the whole practice</div>
              <p>Expand the brain from one lawyer to the practice group. Privilege walls and per-matter permissions keep client confidences intact while firm know-how compounds &mdash; and partners see adoption in one place.</p>
              <details className="fold">
                <summary>What's inside</summary>
                <ul>
                  <li>Shared firm brain</li>
                  <li>Privilege + ethical walls per source</li>
                  <li>Adoption and impact dashboard</li>
                </ul>
              </details>
              <Link className="phase-cta" to="/phase-3/org">Open Phase 3 &rarr;</Link>
            </article>
          </div>

          <div className="roadmap-strip">
            <span className="badge roadmap">Phase 4 &middot; on the roadmap</span>
            Recursive loops + self-learning: toward a true self-learning OS for the whole firm.
          </div>
        </section>

        <hr className="divider" />

        {/* BRAIN ANATOMY */}
        <section className="section" id="brain" aria-labelledby="brain-h">
          <div className="sec-lbl">
            The Matter Brain<span className="phase-chip">Phase 2 &middot; Matter Brain</span>
          </div>
          <h2
            id="brain-h"
            data-pretext="true"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
          >
            A second brain made of markdown. Grep-able by you, readable by any AI.
          </h2>
          <p className="lead">
            No embeddings, no retrieval tricks. Just an opinionated folder structure with
            maintenance built in. The memory lives in your files, not in the model &mdash;
            and privileged material never leaves your control.
          </p>

          <div className="anatomy">
            <div className="anatomy-tree" aria-hidden="true">
              <div className="root">hartwell-brain/</div>
              <div><span className="folder">&#9492;&#9472; matters/</span> <span className="desc"># facts, theory, deadlines per matter</span></div>
              <div><span className="folder">&#9492;&#9472; authorities/</span> <span className="desc"># cases &amp; statutes + how courts treat them</span></div>
              <div><span className="folder">&#9492;&#9472; precedents/</span> <span className="desc"># drafts and arguments that worked</span></div>
              <div><span className="folder">&#9492;&#9472; clients/</span> <span className="desc"># one file per client: risk appetite, prefs</span></div>
              <div><span className="folder">&#9492;&#9472; ingestion/</span> <span className="desc"># synthesis of every doc the brain read</span></div>
              <div><span className="folder">&#9492;&#9472; source/</span> <span className="desc"># untouched originals, audit trail</span></div>
            </div>
            <div className="anatomy-points">
              <div className="ap">
                <h4>
                  Provenance on every fact <span className="mini-badge">[documented]</span>
                </h4>
                <p>Each load-bearing fact wears a marker: a document in the record, a verbal aside on a client call, your strategy instinct, or market practice. The record outweighs recollection &mdash; in plain text, so you can override it.</p>
              </div>
              <details className="fold">
                <summary>How it stays honest</summary>
                <div className="fold-body">
                  <div className="ap">
                    <h4>One artifact, four to six files</h4>
                    <p>Drop in a deposition transcript and the synthesis propagates: an admission updates <code>facts.md</code>, opens a <code>hypotheses/</code> stub, and flags a witness follow-up.</p>
                  </div>
                  <div className="ap">
                    <h4>Friday sweep keeps it honest</h4>
                    <p><code>/review</code> reads every open matter weekly, flags approaching limitation dates, and surfaces contradictions &mdash; like a new exhibit that undercuts your theory.</p>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* HOW IT WORKS / THE LOOP */}
        <section className="section" id="how" aria-labelledby="how-h">
          <div className="sec-lbl">
            How it works<span className="phase-chip">Phase 2 &middot; Matter Brain</span>
          </div>
          <h2
            id="how-h"
            data-pretext="true"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
          >
            The brain has one loop. Every matter runs through it.
          </h2>
          <p className="lead">
            Feed it an artifact. It sources the original, synthesizes the signal,
            propagates it everywhere it applies, and tags the provenance. Then sweeps
            every open matter each Friday.
          </p>

          <div className="loop">
            <div className="loop-step">
              <div className="ls-num">01 &middot; INGEST</div>
              <h4>Feed it</h4>
              <p>A transcript, an exhibit, a hearing note, or a pull from email / DMS / the docket.</p>
            </div>
            <div className="loop-step">
              <div className="ls-num">02 &middot; SYNTHESIZE</div>
              <h4>Source it</h4>
              <p>The original copies to <code>source/</code>. Observations land in <code>ingestion/</code>, tagged by witness and date.</p>
            </div>
            <div className="loop-step">
              <div className="ls-num">03 &middot; PROPAGATE</div>
              <h4>Spread it</h4>
              <p>Facts, theory and deadlines update wherever the new signal applies &mdash; often four to six files at once.</p>
            </div>
            <div className="loop-step">
              <div className="ls-num">04 &middot; SWEEP</div>
              <h4>Keep it clean</h4>
              <p>Friday's review flags limitation dates, drift, and contradictions before they bite.</p>
            </div>
          </div>

          <details className="fold">
            <summary>The 3-step workflow</summary>
            <div className="fold-body steps">
              <article className="step">
                <div className="step-num">01 &middot; Capture</div>
                <h3>Open a matter in a guided interview</h3>
                <p>A short conversation captures client, parties, facts, theory, and deadlines. Start fresh, or point it at the existing case file and it absorbs the record.</p>
              </article>
              <article className="step">
                <div className="step-num">02 &middot; Orchestrate</div>
                <h3>Run skills that draw on it</h3>
                <p>Invoke a skill &mdash; research memo, motion draft, depo outline &mdash; and it loads the matter first, then applies the playbook. Output cites the record it used.</p>
              </article>
              <article className="step">
                <div className="step-num">03 &middot; Portable</div>
                <h3>Take it to any AI</h3>
                <p>The brain is plain files. Load it into Claude Code, Cursor, Claude Desktop, or paste it into a chat. Same record, same provenance, no platform lock-in.</p>
              </article>
            </div>
          </details>
        </section>

        <hr className="divider" />

        {/* SKILLS */}
        <section className="section" id="skills" aria-labelledby="skills-h">
          <div className="sec-lbl">
            The skill layer<span className="phase-chip">Phase 1 &middot; Lawyer Onboarding</span>
          </div>
          <div className="skills-head">
            <h2
              id="skills-h"
              style={{ marginBottom: 0 }}
              data-pretext="true"
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
            >
              Playbooks, not blank pages.
            </h2>
            <div className="skills-stats">
              <strong>54</strong> skills &middot; <strong>8</strong> practice packs &middot;{" "}
              <strong>31</strong> chained workflows
            </div>
          </div>
          <p className="lead">
            Each skill encodes how good litigators actually work &mdash; issue-spotting
            checklists, IRAC memos, deposition outlines &mdash; and walks you through it
            step by step. Commands chain skills end to end, then suggest what to run next.
          </p>

          <div className="cmd-grid">
            <div className="cmd">
              <div className="cmd-name">/intake</div>
              <p>Open a new matter: conflicts cleared, engagement drafted, file scaffolded.</p>
              <div className="cmd-chain">conflicts-check &rarr; engagement-letter &rarr; matter-scaffold</div>
              <span className="fw">Firm intake playbook</span>
            </div>
            <div className="cmd">
              <div className="cmd-name">/research</div>
              <p>Answer a legal question with authorities checked for treatment, in memo form.</p>
              <div className="cmd-chain">frame-issue &rarr; find-authorities &rarr; treatment-check &rarr; memo</div>
              <span className="fw">IRAC</span>
            </div>
            <div className="cmd">
              <div className="cmd-name">/draft</div>
              <p>Draft a motion from the precedent bank, adapted to your record, then route it past five reviewer agents.</p>
              <div className="cmd-chain">precedent-select &rarr; adapt-to-record &rarr; cite-check &rarr; reviewer-agents</div>
              <span className="fw">Precedent bank</span>
            </div>
          </div>
          <details className="fold" style={{ marginTop: 14 }}>
            <summary>3 more commands</summary>
            <div className="fold-body cmd-grid">
              <div className="cmd">
                <div className="cmd-name">/case-theory</div>
                <p>Turn a chronology into an elements map with strengths and known weaknesses.</p>
                <div className="cmd-chain">chronology &rarr; elements-map &rarr; weakness-scan</div>
                <span className="fw">Elements of claim</span>
              </div>
              <div className="cmd">
                <div className="cmd-name">/depo-prep</div>
                <p>Build a witness outline from admissions, exhibits and the gaps in your proof.</p>
                <div className="cmd-chain">load-witness &rarr; admissions-map &rarr; outline &rarr; exhibits-list</div>
                <span className="fw">Deposition playbook</span>
              </div>
              <div className="cmd">
                <div className="cmd-name">/risk</div>
                <p>Scan the matter for limitation dates, privilege exposure and open risk.</p>
                <div className="cmd-chain">deadlines &rarr; privilege &rarr; exposure</div>
                <span className="fw">Risk checklist</span>
              </div>
            </div>
          </details>
        </section>

        <hr className="divider" />

        {/* PROTOTYPE EXPLORER */}
        <section className="section" id="prototype" aria-labelledby="proto-h">
          <div className="sec-lbl">Inside the prototype</div>
          <h2
            id="proto-h"
            data-pretext="true"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
          >
            Click through all three phases today.
          </h2>
          <p className="lead">
            Thirteen screens, no signup. Pick a phase below, then open the full clickable
            prototype.
          </p>

          <div className="proto-tabs" role="tablist" aria-label="Prototype phases">
            {protoTabs.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => (tabRefs.current[i] = el)}
                className="proto-tab"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === i}
                aria-controls={`panel-${t.id}`}
                tabIndex={tab === i ? 0 : -1}
                onClick={() => setTab(i)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="proto-panel" role="tabpanel" id="panel-p1" aria-labelledby="tab-p1" hidden={tab !== 0}>
            <div className="proto-body">
              <div className="proto-row">
                <div className="proto-col">
                  <h4>The record loaded before the skill runs</h4>
                  <div className="ctx-bar">
                    <span className="ctx-file">matters/meridian/facts.md</span>
                    <span className="ctx-file hunch">matters/meridian/theory.md</span>
                    <span className="ctx-file">matters/meridian/deadlines.md</span>
                    <span className="ctx-file verbal">clients/meridian.md</span>
                    <span className="ctx-file">authorities/notice.md</span>
                  </div>
                  <div className="answer-block">
                    <code>/draft</code> &mdash; drafting &ldquo;Motion for partial summary
                    judgment: liability under &sect;4.2&rdquo; against the loaded record.
                    Elements map and cite list pulled from <code>theory.md</code> and{" "}
                    <code>authorities/</code>, not invented.
                  </div>
                </div>
                <div className="proto-col">
                  <h4>Five reviewer agents, one pass</h4>
                  <ul className="agent-list">
                    <li className="done"><span className="st">&#10003;</span> Partner review <span className="verdict">2 flags</span></li>
                    <li className="done"><span className="st">&#10003;</span> Ethics &amp; privilege <span className="verdict">approved</span></li>
                    <li className="running"><span className="st">&#9679;</span> Opposing counsel sim <span className="verdict">running&hellip;</span></li>
                    <li><span className="st">&#9675;</span> Client perspective <span className="verdict">queued</span></li>
                    <li><span className="st">&#9675;</span> Devil's Advocate <span className="verdict">queued</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="proto-foot">
              <span className="hint">/phase-1/runner &middot; skill runner with reviewer agents</span>
              <Link className="proto-link" to="/phase-1/runner">Open this screen in the prototype &rarr;</Link>
            </div>
          </div>

          <div className="proto-panel" role="tabpanel" id="panel-p2" aria-labelledby="tab-p2" hidden={tab !== 1}>
            <div className="proto-body">
              <div className="proto-row">
                <div className="proto-col">
                  <h4>Ask a question, get answers that cite the record</h4>
                  <div className="m-input" style={{ marginBottom: 12 }}>
                    What did we agree with opposing counsel about the deposition schedule?
                  </div>
                  <div className="answer-block">
                    Corestone's counsel agreed to produce their ops lead on 08-14{" "}
                    <span className="tag verbal">verbal</span>; the stipulation confirming
                    it was filed 07-02 <span className="tag doc">documented</span>. Their
                    CFO's deposition is still unconfirmed &mdash; last position was
                    &ldquo;after document production completes&rdquo;{" "}
                    <span className="tag verbal">verbal</span>.
                    <span className="cite">sources: call note 06-30 &middot; stipulations/depo-schedule.pdf &middot; email thread</span>
                  </div>
                </div>
                <div className="proto-col">
                  <h4>Fresh memory, tagged by source</h4>
                  <ul className="agent-list">
                    <li className="done"><span className="st">&#9679;</span> Ops lead admitted delay in 04-09 email <span className="verdict">email &middot; 1d</span></li>
                    <li className="done"><span className="st">&#9679;</span> Depo: plant idle six weeks, no workaround <span className="verdict">depo &middot; 2d</span></li>
                    <li className="done"><span className="st">&#9679;</span> Mediation window floated for late September <span className="verdict">call &middot; 4d</span></li>
                    <li className="done"><span className="st">&#9679;</span> Pretrial conference moved to 10-02 <span className="verdict">docket &middot; 1w</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="proto-foot">
              <span className="hint">/phase-2/ask &middot; answers cited to the record</span>
              <Link className="proto-link" to="/phase-2/ask">Open this screen in the prototype &rarr;</Link>
            </div>
          </div>

          <div className="proto-panel" role="tabpanel" id="panel-p3" aria-labelledby="tab-p3" hidden={tab !== 2}>
            <div className="proto-body">
              <div className="proto-row">
                <div className="proto-col">
                  <h4>One firm brain, privilege walls per source</h4>
                  <table className="perm-table">
                    <thead>
                      <tr><th scope="col">Source</th><th scope="col">Owner</th><th scope="col">Visibility</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>matters/meridian/</td><td>R. Calloway</td><td><span className="perm team">matter team</span></td></tr>
                      <tr><td>matters/project-swan/</td><td>ethical wall</td><td><span className="perm private">restricted</span></td></tr>
                      <tr><td>knowhow/notice-arguments</td><td>firm</td><td><span className="perm team">firm-wide</span></td></tr>
                      <tr><td>clients/meridian.md</td><td>partner</td><td><span className="perm private">private</span></td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="proto-col">
                  <h4>Partners see it compound</h4>
                  <div className="answer-block">
                    Client confidences stay walled; firm know-how compounds. The adoption
                    dashboard shows which lawyers are onboarded, which skills run most,
                    and where the brain answered in minutes what used to take an
                    associate's afternoon.
                  </div>
                </div>
              </div>
            </div>
            <div className="proto-foot">
              <span className="hint">/phase-3/company-brain &middot; shared know-how &amp; privilege walls</span>
              <Link className="proto-link" to="/phase-3/company-brain">Open this screen in the prototype &rarr;</Link>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* COMPOSE */}
        <section className="section" aria-label="How the brain and skills compose">
          <div className="compose">
            <h3>The skill is <em>how the work is done</em> once. The brain is <em>what the firm knows</em> across every matter.</h3>
            <p>Matter Brain is the memory layer. Skills are the workflow modules. They compose &mdash; a skill drafts the motion, the brain supplies the record and remembers what the court did with it.</p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="cta-section" aria-labelledby="cta-h">
          <h2
            id="cta-h"
            data-pretext="true"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
          >
            Stop re-briefing your AI on every matter.
          </h2>
          <p>Start with Phase 1 &mdash; it's free. Open your first matter in one guided sitting and take it to any AI.</p>
          <div className="cta-actions">
            <Link className="btn-primary" to="/phase-1/setup">Explore the clickable prototype</Link>
            <a className="btn-secondary" href="https://vivekally.github.io/law-os-deals/">Deals edition &rarr;</a>
          </div>
          <div className="fine">research preview &middot; your brain commits locally &middot; privileged material never leaves your control</div>
        </section>
      </main>

      <footer role="contentinfo">
        <div className="footer-inner">
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--accent)" }}>law-os.app</span>
          <span>
            <a href="#phases">The 3 phases</a> &middot; <a href="#brain">The Brain</a> &middot;{" "}
            <a href="#skills">Skills</a> &middot; <a href="#prototype">Prototype</a> &middot;{" "}
            <a href="https://vivekally.github.io/law-os-deals/">Deals edition</a>
          </span>
          <span>Research preview &middot; 2026 &middot; all matters fictional</span>
        </div>
      </footer>
    </div>
  );
}
