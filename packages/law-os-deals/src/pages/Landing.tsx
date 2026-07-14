import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { prepare, layout } from "../lib/pretext";
import "../landing.css";

// Law OS — Deals edition. Workbench B landing on the PM OS skeleton;
// class names match landing.css verbatim. All deals and firms are fictional.

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
          <div className="hero-label">Law OS &middot; Deals edition</div>
          <h1
            className="hero-head"
            id="hero-h"
            data-pretext="true"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
          >
            The operating system for <em>deal lawyers</em>.
          </h1>
          <p className="hero-sub">
            Your AI knows nothing about your deals. Law OS fixes that:{" "}
            <strong>context, skills, workflows and automation</strong> for every lawyer,
            plus a <strong>deal brain</strong> that remembers every position, precedent
            and trade. Onboard in minutes. Compound every deal.
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
            plain markdown &middot; no vector DB &middot; deal files never leave your machine
          </div>
          <div className="pillars" aria-label="The pillars of Law OS">
            <span className="pillar" title="Phase 1 · Lawyer Onboarding">Context</span>
            <span className="pillar" title="Phase 1 · Lawyer Onboarding">Skills</span>
            <span className="pillar" title="Phase 1 · Lawyer Onboarding">Workflows</span>
            <span className="pillar" title="Phase 1 · Lawyer Onboarding">Automation</span>
            <span className="pillar brain" title="Phase 2 · Deal Brain">+ Deal Brain</span>
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
                <span className="mockup-url">~/alderfinch-brain &middot; /deal-brain</span>
              </div>
              <div className="mockup-body">
                <nav className="mockup-nav">
                  <div className="m-nav-lbl">NEW DEAL</div>
                  <div className="m-item done"><span className="ic">&#10003;</span> Client &amp; mandate</div>
                  <div className="m-item done"><span className="ic">&#10003;</span> Structure</div>
                  <div className="m-item active"><span className="ic">&#8594;</span> Key terms</div>
                  <div className="m-item"><span className="ic">&#9675;</span> Risk &amp; diligence</div>
                  <div className="m-item"><span className="ic">&#9675;</span> Closing plan</div>
                </nav>
                <div className="mockup-main">
                  <h3>What are the terms so far?</h3>
                  <div className="sub">Type freely. We synthesize it into the brain as you go.</div>
                  <div className="m-input">
                    Basalt buys 100% of Corven for $85M — cash plus a 15% management
                    rollover. Founders want an earnout on 2027 revenue. Indemnity cap
                    isn't agreed; their counsel floated 20%.
                  </div>
                  <div className="m-code-lbl">SYNTHESIZING &rarr;</div>
                  <div className="m-code">
                    <span className="m-file">deals/basalt-corven/terms.md</span>
                    <span className="m-claim">## Structure</span>
                    <span className="m-claim">
                      100% for $85M, 15% rollover<span className="tag doc">documented</span>
                    </span>
                    <span className="m-claim">
                      Earnout on FY27 revenue<span className="tag verbal">verbal</span>
                    </span>
                    <span className="m-file">deals/basalt-corven/positions.md</span>
                    <span className="m-claim">
                      Indemnity cap &mdash; counter at 12%<span className="tag hunch">hunch</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THREE QUESTIONS */}
        <section className="questions" aria-label="The three questions deal work answers">
          <div className="questions-inner">
            <div className="q-cell">
              <div className="q-num">01</div>
              <h3>What's <em>market</em>?</h3>
              <p>Positions and fallbacks from your own executed deals &mdash; not a hunch about what other firms accept, your actual precedent history.</p>
            </div>
            <div className="q-cell">
              <div className="q-num">02</div>
              <h3>What did we already <em>trade</em>?</h3>
              <p>Every concession logged with who, when, and what you got back &mdash; so trades stay deliberate across ten turns of markup.</p>
            </div>
            <div className="q-cell">
              <div className="q-num">03</div>
              <h3>What <em>closes</em> the deal?</h3>
              <p>Conditions, consents, signatures and funds flow in one live checklist &mdash; the long poles flagged before they slip.</p>
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
            Most lawyers use AI as a chat box. The real problem, ten turns of markup, keeps compounding.
          </h2>
          <p className="lead">
            The deal gets re-explained every session, drafts come back off-market, and
            the best clause language stays trapped in one associate's files. Meanwhile
            redlines, data-room documents and calls pile up faster than anyone can
            connect them.
          </p>

          <div className="two-col">
            <div className="col-card bad">
              <div className="card-lbl">Without Law OS</div>
              <h3>Every session from scratch</h3>
              <p>Ten minutes of catching the AI up before a useful answer. It guesses the structure, invents market terms, and drafts a clause your partner strikes on sight.</p>
              <div className="snippet bad-snip">
                "Reminder &mdash; we represent Basalt buying Corven Systems. $85M, cash
                plus rollover. The sticking points are the indemnity cap and the earnout
                because&hellip;"
              </div>
            </div>
            <div className="col-card good">
              <div className="card-lbl">With Law OS</div>
              <h3>The deal loaded, with receipts</h3>
              <p>Your brain rides into any Claude or ChatGPT session. It knows the terms, your positions, and the open points &mdash; and every claim is tagged with where it came from.</p>
              <div className="snippet good-snip">
                <span className="m-file" style={{ color: "var(--verbal)" }}>deals/basalt-corven/positions.md</span>
                <span className="k">indemnity_cap</span> = counter 12% of EV{" "}
                <span className="tag doc">documented</span><br />
                <span className="k">survival</span> = 18 months{" "}
                <span className="tag doc">documented</span><br />
                <span className="k">earnout_risk</span> = revenue definition{" "}
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
            deal. Scale it to your firm.
          </p>

          <div className="phase-grid">
            <article className="phase">
              <div className="phase-top">
                <span className="phase-num">PHASE 01</span>
                <span className="badge free">Free</span>
              </div>
              <h3>Lawyer Onboarding</h3>
              <div className="phase-tag">Your AI associate, preloaded</div>
              <p>Write your deal context once &mdash; client, structure, positions, precedents &mdash; then run curated skills for term sheets, drafting, markup review and closing.</p>
              <details className="fold">
                <summary>What's inside</summary>
                <ul>
                  <li>Deal intake + Deal Health</li>
                  <li>Skills Library, Skill Builder, orchestration</li>
                  <li>Workflows that chain draft &rarr; markup &rarr; response</li>
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
              <h3>Deal Brain</h3>
              <div className="phase-tag">A second brain for your deals</div>
              <p>Every redline, data-room doc and call becomes structured knowledge. Ask what's market, get answers cited to your own deals, and watch a graph connect parties, clauses and precedents.</p>
              <details className="fold">
                <summary>What's inside</summary>
                <ul>
                  <li>Memory with provenance on every position</li>
                  <li>Knowledge graph of parties, clauses, precedents</li>
                  <li>Connectors: email, data room, DMS</li>
                  <li>Open-points + positions sweep, every Friday</li>
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
              <p>Deal teams share a firm brain of positions and precedents. Walls keep each deal room sealed while market knowledge compounds &mdash; and partners see adoption in one place.</p>
              <details className="fold">
                <summary>What's inside</summary>
                <ul>
                  <li>Shared firm brain</li>
                  <li>Walled deal rooms per source</li>
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
            The Deal Brain<span className="phase-chip">Phase 2 &middot; Deal Brain</span>
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
            and deal files never leave your control.
          </p>

          <div className="anatomy">
            <div className="anatomy-tree" aria-hidden="true">
              <div className="root">alderfinch-brain/</div>
              <div><span className="folder">&#9492;&#9472; deals/</span> <span className="desc"># terms, open points, closing plan per deal</span></div>
              <div><span className="folder">&#9492;&#9472; positions/</span> <span className="desc"># your asks + fallbacks, by clause</span></div>
              <div><span className="folder">&#9492;&#9472; precedents/</span> <span className="desc"># executed agreements + what got accepted</span></div>
              <div><span className="folder">&#9492;&#9472; clients/</span> <span className="desc"># risk appetite, approval chains</span></div>
              <div><span className="folder">&#9492;&#9472; ingestion/</span> <span className="desc"># synthesis of every doc the brain read</span></div>
              <div><span className="folder">&#9492;&#9472; source/</span> <span className="desc"># untouched originals, audit trail</span></div>
            </div>
            <div className="anatomy-points">
              <div className="ap">
                <h4>
                  Provenance on every position <span className="mini-badge">[documented]</span>
                </h4>
                <p>Each load-bearing term wears a marker: an executed document, a verbal position on a call, your negotiation instinct, or market practice. Paper outweighs recollection &mdash; in plain text, so you can override it.</p>
              </div>
              <details className="fold">
                <summary>How it stays honest</summary>
                <div className="fold-body">
                  <div className="ap">
                    <h4>One artifact, four to six files</h4>
                    <p>Drop in a counterparty redline and the synthesis propagates: <code>positions.md</code> updates, the open-points list re-ranks, and the trade gets logged with its history.</p>
                  </div>
                  <div className="ap">
                    <h4>Friday sweep keeps it honest</h4>
                    <p><code>/review</code> reads every open deal weekly, flags aging open points, and surfaces inconsistencies &mdash; like a cap you accepted last month contradicting this week's markup.</p>
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
            How it works<span className="phase-chip">Phase 2 &middot; Deal Brain</span>
          </div>
          <h2
            id="how-h"
            data-pretext="true"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
          >
            The brain has one loop. Every deal runs through it.
          </h2>
          <p className="lead">
            Feed it an artifact. It sources the original, synthesizes the signal,
            propagates it everywhere it applies, and tags the provenance. Then sweeps
            every open deal each Friday.
          </p>

          <div className="loop">
            <div className="loop-step">
              <div className="ls-num">01 &middot; INGEST</div>
              <h4>Feed it</h4>
              <p>A redline, a data-room doc, a call note, or a pull from email / data room / DMS.</p>
            </div>
            <div className="loop-step">
              <div className="ls-num">02 &middot; SYNTHESIZE</div>
              <h4>Source it</h4>
              <p>The original copies to <code>source/</code>. Observations land in <code>ingestion/</code>, tagged by party and date.</p>
            </div>
            <div className="loop-step">
              <div className="ls-num">03 &middot; PROPAGATE</div>
              <h4>Spread it</h4>
              <p>Terms, positions and open points update wherever the new signal applies &mdash; often four to six files at once.</p>
            </div>
            <div className="loop-step">
              <div className="ls-num">04 &middot; SWEEP</div>
              <h4>Keep it clean</h4>
              <p>Friday's review flags aging open points, drift, and positions that contradict your own precedent.</p>
            </div>
          </div>

          <details className="fold">
            <summary>The 3-step workflow</summary>
            <div className="fold-body steps">
              <article className="step">
                <div className="step-num">01 &middot; Capture</div>
                <h3>Open a deal in a guided interview</h3>
                <p>A short conversation captures client, structure, key terms, positions and the closing plan. Start fresh, or point it at the existing deal file and it absorbs it.</p>
              </article>
              <article className="step">
                <div className="step-num">02 &middot; Orchestrate</div>
                <h3>Run skills that draw on it</h3>
                <p>Invoke a skill &mdash; term sheet, agreement draft, markup review &mdash; and it loads the deal first, then applies the playbook. Output cites the terms and precedents it used.</p>
              </article>
              <article className="step">
                <div className="step-num">03 &middot; Portable</div>
                <h3>Take it to any AI</h3>
                <p>The brain is plain files. Load it into Claude Code, Cursor, Claude Desktop, or paste it into a chat. Same deal, same provenance, no platform lock-in.</p>
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
              <strong>47</strong> skills &middot; <strong>7</strong> practice packs &middot;{" "}
              <strong>26</strong> chained workflows
            </div>
          </div>
          <p className="lead">
            Each skill encodes how good deal lawyers actually work &mdash; market-standard
            positions, diligence frameworks, closing mechanics &mdash; and walks you
            through it step by step. Commands chain skills end to end, then suggest what
            to run next.
          </p>

          <div className="cmd-grid">
            <div className="cmd">
              <div className="cmd-name">/term-sheet</div>
              <p>Turn agreed business terms into a term sheet with market-standard conditions.</p>
              <div className="cmd-chain">structure &rarr; key-terms &rarr; conditions</div>
              <span className="fw">Market standards</span>
            </div>
            <div className="cmd">
              <div className="cmd-name">/draft</div>
              <p>Draft the agreement from your precedent bank, adapted to the terms, then route it past five reviewer agents.</p>
              <div className="cmd-chain">precedent-select &rarr; adapt-to-terms &rarr; defined-terms-check &rarr; reviewer-agents</div>
              <span className="fw">Precedent bank</span>
            </div>
            <div className="cmd">
              <div className="cmd-name">/markup</div>
              <p>Classify every change in a counterparty redline against your positions, with a response plan.</p>
              <div className="cmd-chain">diff &rarr; classify-changes &rarr; position-check &rarr; response-plan</div>
              <span className="fw">Issues list</span>
            </div>
          </div>
          <details className="fold" style={{ marginTop: 14 }}>
            <summary>3 more commands</summary>
            <div className="fold-body cmd-grid">
              <div className="cmd">
                <div className="cmd-name">/intake</div>
                <p>Open a new deal: conflicts cleared, engagement drafted, file scaffolded.</p>
                <div className="cmd-chain">conflicts-check &rarr; engagement-letter &rarr; deal-scaffold</div>
                <span className="fw">Firm intake playbook</span>
              </div>
              <div className="cmd">
                <div className="cmd-name">/dd-summary</div>
                <p>Sweep the data room for red flags and produce the diligence memo.</p>
                <div className="cmd-chain">doc-sweep &rarr; red-flags &rarr; memo</div>
                <span className="fw">DD checklist</span>
              </div>
              <div className="cmd">
                <div className="cmd-name">/closing</div>
                <p>Build and track conditions precedent, signatures and funds flow.</p>
                <div className="cmd-chain">cp-list &rarr; signatures &rarr; funds-flow</div>
                <span className="fw">Closing mechanics</span>
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
                  <h4>The deal loaded before the skill runs</h4>
                  <div className="ctx-bar">
                    <span className="ctx-file">deals/basalt-corven/terms.md</span>
                    <span className="ctx-file hunch">deals/basalt-corven/positions.md</span>
                    <span className="ctx-file">deals/basalt-corven/open-points.md</span>
                    <span className="ctx-file verbal">clients/basalt.md</span>
                    <span className="ctx-file">precedents/spa-index.md</span>
                  </div>
                  <div className="answer-block">
                    <code>/markup</code> &mdash; analyzing the counterparty's SPA v4
                    redline against firm positions: 41 changes classified, 6 against{" "}
                    <code>positions.md</code>, response plan drafted from your own
                    precedent history, not invented.
                  </div>
                </div>
                <div className="proto-col">
                  <h4>Five reviewer agents, one pass</h4>
                  <ul className="agent-list">
                    <li className="done"><span className="st">&#10003;</span> Partner review <span className="verdict">approved</span></li>
                    <li className="done"><span className="st">&#10003;</span> Tax review <span className="verdict">1 flag</span></li>
                    <li className="running"><span className="st">&#9679;</span> Counterparty sim <span className="verdict">running&hellip;</span></li>
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
                  <h4>Ask what's market, get answers cited to your deals</h4>
                  <div className="m-input" style={{ marginBottom: 12 }}>
                    What indemnity cap did we accept in our last three private deals?
                  </div>
                  <div className="answer-block">
                    12% of EV with 18-month survival on Halcyon{" "}
                    <span className="tag doc">documented</span>; 15% on Redwood{" "}
                    <span className="tag doc">documented</span>. On Corven, the client
                    signalled they'd take 15% to protect quarter-end signing{" "}
                    <span className="tag verbal">verbal</span> &mdash; hold it back as the
                    final trade.
                    <span className="cite">sources: precedents/halcyon-spa.md &middot; redwood closing set &middot; call note 07-01</span>
                  </div>
                </div>
                <div className="proto-col">
                  <h4>Fresh memory, tagged by source</h4>
                  <ul className="agent-list">
                    <li className="done"><span className="st">&#9679;</span> Non-solicit carve-out accepted in markup v4 <span className="verdict">redline &middot; 1d</span></li>
                    <li className="done"><span className="st">&#9679;</span> CoC consent required on Northgate MSA <span className="verdict">data room &middot; 2d</span></li>
                    <li className="done"><span className="st">&#9679;</span> CFO wants signing before quarter-end <span className="verdict">call &middot; 4d</span></li>
                    <li className="done"><span className="st">&#9679;</span> Their counsel floated a 20% indemnity cap <span className="verdict">email &middot; 1w</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="proto-foot">
              <span className="hint">/phase-2/ask &middot; answers cited to your own deals</span>
              <Link className="proto-link" to="/phase-2/ask">Open this screen in the prototype &rarr;</Link>
            </div>
          </div>

          <div className="proto-panel" role="tabpanel" id="panel-p3" aria-labelledby="tab-p3" hidden={tab !== 2}>
            <div className="proto-body">
              <div className="proto-row">
                <div className="proto-col">
                  <h4>One firm brain, walls per deal room</h4>
                  <table className="perm-table">
                    <thead>
                      <tr><th scope="col">Source</th><th scope="col">Owner</th><th scope="col">Visibility</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>deals/basalt-corven/</td><td>E. Whitmore</td><td><span className="perm private">deal team</span></td></tr>
                      <tr><td>positions/ (playbook)</td><td>firm</td><td><span className="perm team">firm-wide</span></td></tr>
                      <tr><td>precedents/executed/</td><td>firm</td><td><span className="perm team">firm-wide</span></td></tr>
                      <tr><td>clients/basalt.md</td><td>partner</td><td><span className="perm private">private</span></td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="proto-col">
                  <h4>Partners see it compound</h4>
                  <div className="answer-block">
                    Deal rooms stay sealed; the positions playbook compounds. The
                    adoption dashboard shows which lawyers are onboarded, which skills run
                    most, and where "what's market?" got answered from your own paper in
                    seconds.
                  </div>
                </div>
              </div>
            </div>
            <div className="proto-foot">
              <span className="hint">/phase-3/company-brain &middot; shared playbook &amp; walled deal rooms</span>
              <Link className="proto-link" to="/phase-3/company-brain">Open this screen in the prototype &rarr;</Link>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* COMPOSE */}
        <section className="section" aria-label="How the brain and skills compose">
          <div className="compose">
            <h3>The skill is <em>how the work is done</em> once. The brain is <em>what the firm knows</em> across every deal.</h3>
            <p>Deal Brain is the memory layer. Skills are the workflow modules. They compose &mdash; a skill drafts the agreement, the brain supplies your positions and remembers what got accepted.</p>
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
            Stop re-explaining the deal to your AI.
          </h2>
          <p>Start with Phase 1 &mdash; it's free. Open your first deal in one guided sitting and take it to any AI.</p>
          <div className="cta-actions">
            <Link className="btn-primary" to="/phase-1/setup">Explore the clickable prototype</Link>
            <a className="btn-secondary" href="https://vivekally.github.io/law-os/">Litigation edition &rarr;</a>
          </div>
          <div className="fine">research preview &middot; your brain commits locally &middot; deal files never leave your control</div>
        </section>
      </main>

      <footer role="contentinfo">
        <div className="footer-inner">
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--accent)" }}>law-os.app</span>
          <span>
            <a href="#phases">The 3 phases</a> &middot; <a href="#brain">The Brain</a> &middot;{" "}
            <a href="#skills">Skills</a> &middot; <a href="#prototype">Prototype</a> &middot;{" "}
            <a href="https://vivekally.github.io/law-os/">Litigation edition</a>
          </span>
          <span>Research preview &middot; 2026 &middot; all deals fictional</span>
        </div>
      </footer>
    </div>
  );
}
