import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import EmailCapture from "../components/EmailCapture";
import { GITHUB_URL } from "../config";
import "../landing.css";

// Workbench B landing — ported from the finalized design artifact
// (designs/final-landing-20260707/finalized.html). Markup and class names
// match the artifact so landing.css applies verbatim. The artifact's
// pretext height-measurement + contentEditable headline demo was removed
// during the 2026-07 copy rework: it pinned headings to a measured height,
// which clipped/overlapped once headline lengths changed.

const protoTabs = [
  { id: "p1", label: "Skill Runner" },
  { id: "p2", label: "Ask the Brain" },
  { id: "p3", label: "Company Brain" },
];

export default function Landing() {
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
            pm<span>-</span>os<span>.app</span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            <a href="#phases">What you get</a>
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
          <div className="hero-label">PM OS &middot; Research preview &middot; live</div>
          <h1 className="hero-head" id="hero-h">
            The AI that <em>remembers</em> your product decisions.
          </h1>
          <p className="hero-sub">
            Your AI knows nothing about your product. PM OS gives it a{" "}
            <strong>memory</strong>: every interview, decision and metric, tagged with
            where it came from &mdash; so every PRD, strategy doc and answer comes back
            grounded in your product, <strong>with receipts</strong>. Skills and
            workflows included. One guided sitting to build your brain; compounding from
            day one.
          </p>
          <div className="hero-actions">
            <EmailCapture />
          </div>
          <div className="hero-secondary">
            <Link to="/phase-1/setup">See the 13-screen prototype &rarr;</Link>
          </div>
          <div className="hero-meta">
            your brain is plain markdown in your repo &middot; no vector DB &middot;
            commits locally &mdash; never pushed anywhere you don&rsquo;t control
          </div>
          <div className="pillars" aria-label="The pillars of PM OS">
            <span className="pillar brain" title="Memory with provenance">Memory · receipts</span>
            <span className="pillar" title="Context files, seeded in one sitting">Context</span>
            <span className="pillar" title="Skills that cite the brain">Skills</span>
            <span className="pillar" title="Chained workflows">Workflows</span>
            <span className="pillar" title="Agents and loops">Automation</span>
          </div>
          <div className="phase-path" aria-label="Rollout path">
            01 Remember <b>(free to start)</b> &rarr; 02 Create <b>(skills free)</b>{" "}
            &rarr; 03 Share <b>(teams)</b>
          </div>

          <div className="mockup-wrap" aria-hidden="true">
            <div className="mockup-frame">
              <div className="mockup-chrome">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="mockup-url">~/datapulse-brain &middot; /pm-brain</span>
              </div>
              <div className="mockup-body">
                <nav className="mockup-nav">
                  <div className="m-nav-lbl">PM BRAIN</div>
                  <div className="m-item done"><span className="ic">&#10003;</span> Company &amp; role</div>
                  <div className="m-item done"><span className="ic">&#10003;</span> Product</div>
                  <div className="m-item active"><span className="ic">&#8594;</span> Users &amp; ICP</div>
                  <div className="m-item"><span className="ic">&#9675;</span> Strategy &amp; bets</div>
                  <div className="m-item"><span className="ic">&#9675;</span> Decisions</div>
                </nav>
                <div className="mockup-main">
                  <h3>Who is your ideal customer?</h3>
                  <div className="sub">Type freely. We synthesize it into the brain as you go.</div>
                  <div className="m-input">
                    Data leads at 50&ndash;500 person B2B SaaS. They own activation and get
                    grilled on it monthly. No way to see where users drop off in week 1.
                  </div>
                  <div className="m-code-lbl">SYNTHESIZING &rarr;</div>
                  <div className="m-code">
                    <span className="m-file">knowledge/users.md</span>
                    <span className="m-claim">## Segment</span>
                    <span className="m-claim">
                      Data leads, 50&ndash;500p B2B SaaS<span className="tag verbal">verbal</span>
                    </span>
                    <span className="m-claim">
                      Owns activation, reviewed monthly<span className="tag verbal">verbal</span>
                    </span>
                    <span className="m-file">hypotheses/activation.md</span>
                    <span className="m-claim">
                      Wk-1 drop-off is invisible to them<span className="tag hunch">hunch</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THREE QUESTIONS */}
        <section className="questions" aria-label="The three questions product management answers">
          <div className="questions-inner">
            <div className="q-cell">
              <div className="q-num">01</div>
              <h3>Are we building the <em>right thing</em>?</h3>
              <p>Discovery, assumptions, and the evidence behind every bet &mdash; held in one place, not scattered across tabs.</p>
            </div>
            <div className="q-cell">
              <div className="q-num">02</div>
              <h3>For the <em>right customer</em>?</h3>
              <p>Your ICP, their jobs-to-be-done, and what you actually heard in the last interview &mdash; tagged by source.</p>
            </div>
            <div className="q-cell">
              <div className="q-num">03</div>
              <h3>At the <em>right time</em>?</h3>
              <p>Strategy, current bets, and the decisions you've already made &mdash; so you never reopen a settled call by accident.</p>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="section" aria-labelledby="problem-h">
          <div className="sec-lbl">The context tax</div>
          <h2
            id="problem-h"
          >
            Most teams use AI as a chat box. The real problem, information overload, keeps compounding.
          </h2>
          <p className="lead">
            Context gets re-explained every session, results come back generic, and the
            best prompts stay trapped in one person's browser. Meanwhile insights from
            meetings, tickets and threads pile up faster than any PM can connect them.
          </p>

          <div className="two-col">
            <div className="col-card bad">
              <div className="card-lbl">Without PM OS</div>
              <h3>Every session from scratch</h3>
              <p>Ten minutes of context-setting before a useful answer. The AI guesses your product, invents a persona, and hands you a generic listicle.</p>
              <div className="snippet bad-snip">
                "Let me remind you &mdash; we're a B2B SaaS tool for data teams. Our
                persona is the data lead who owns activation. We're freemium. Our big bet
                right now is the onboarding rework because&hellip;"
              </div>
            </div>
            <div className="col-card good">
              <div className="card-lbl">With PM OS</div>
              <h3>Context already loaded, with receipts</h3>
              <p>Your brain rides into any Claude or ChatGPT session. It knows your product, ICP, metrics, and bets &mdash; and every claim is tagged with where it came from.</p>
              <div className="snippet good-snip">
                <span className="m-file" style={{ color: "var(--verbal)" }}>knowledge/product.md</span>
                <span className="k">north_star</span> = activation rate, wk-1{" "}
                <span className="tag doc">documented</span><br />
                <span className="k">current_bet</span> = onboarding rework{" "}
                <span className="tag doc">documented</span><br />
                <span className="k">icp.pain</span> = drop-off is invisible{" "}
                <span className="tag hunch">hunch</span>
              </div>
            </div>
          </div>
        </section>

        {/* PHASES */}
        <section className="section" id="phases" aria-labelledby="phases-h">
          <div className="sec-lbl">What you get</div>
          <h2
            id="phases-h"
          >
            Remember. Create. Share.
          </h2>
          <p className="lead">
            Start free: your first 25 memories, the guided brain-building interview, and
            every skill. Upgrade when your brain outgrows it.
          </p>

          <div className="phase-grid">
            <article className="phase">
              <div className="phase-top">
                <span className="phase-num">01 · REMEMBER</span>
                <span className="badge free">Free to start</span>
              </div>
              <h3>Seed your brain</h3>
              <div className="phase-tag">One guided sitting, no cold start</div>
              <p>A guided interview plus your existing artifacts &mdash; Notion exports, Jira boards, transcripts &mdash; become a sourced, cited knowledge base in one sitting. Skills read it automatically from the first run.</p>
              <details className="fold">
                <summary>What's inside</summary>
                <ul>
                  <li>Guided brain-building interview</li>
                  <li>Instant import: Notion, Jira, transcripts</li>
                  <li>Provenance on every claim</li>
                  <li>Context health + drift flags</li>
                </ul>
              </details>
              <Link className="phase-cta" to="/phase-1/setup">See it in the prototype &rarr;</Link>
            </article>

            <article className="phase">
              <div className="phase-top">
                <span className="phase-num">02 · CREATE</span>
                <span className="badge free">Skills · free</span>
              </div>
              <h3>Skills that cite</h3>
              <div className="phase-tag">Evidence in, receipts out</div>
              <p>Run PM skills &mdash; PRDs, discovery, strategy, meeting prep &mdash; that load your real context first and cite the brain files they used. Every run writes back, so the memory compounds. Unlimited memory and connectors on Pro.</p>
              <details className="fold">
                <summary>What's inside</summary>
                <ul>
                  <li>Cited answers &mdash; every claim links to its source</li>
                  <li>Knowledge graph of people, themes, decisions</li>
                  <li>Connectors: Slack, Jira, Notion and more <span className="badge paid">Pro</span></li>
                  <li>Weekly sweep: drift + contradiction flags</li>
                </ul>
              </details>
              <Link className="phase-cta" to="/phase-2/dashboard">See it in the prototype &rarr;</Link>
            </article>

            <article className="phase">
              <div className="phase-top">
                <span className="phase-num">03 · SHARE</span>
                <span className="badge teams">Teams</span>
              </div>
              <h3>Scale to the Org</h3>
              <div className="phase-tag">From one PM to the entire PM org</div>
              <p>Expand the brain from one PM to the whole product team. Per-source permissions keep private notes private while team knowledge compounds &mdash; and leaders see adoption in one place.</p>
              <details className="fold">
                <summary>What's inside</summary>
                <ul>
                  <li>Shared company brain</li>
                  <li>Per-source permissions</li>
                  <li>Adoption and impact dashboard</li>
                </ul>
              </details>
              <Link className="phase-cta" to="/phase-3/org">See it in the prototype &rarr;</Link>
            </article>
          </div>

          <div className="roadmap-strip">
            <span className="badge roadmap">Next &middot; in design</span>
            A weekly drift report that compares what your team shipped against what you
            decided &mdash; and flags the drift, with receipts.
          </div>
        </section>

        <hr className="divider" />

        {/* BRAIN ANATOMY */}
        <section className="section" id="brain" aria-labelledby="brain-h">
          <div className="sec-lbl">
            The PM Brain<span className="phase-chip">Memory layer</span>
          </div>
          <h2
            id="brain-h"
          >
            A memory with receipts. Grep-able by you, readable by any AI.
          </h2>
          <p className="lead">
            No embeddings, no retrieval tricks. Just an opinionated folder structure with
            maintenance built in. The memory lives in your repo, not in the model.
          </p>

          <div className="anatomy">
            <div className="anatomy-tree" aria-hidden="true">
              <div className="root">datapulse-brain/</div>
              <div><span className="folder">&#9492;&#9472; knowledge/</span> <span className="desc"># strategy, product, users, market</span></div>
              <div><span className="folder">&#9492;&#9472; hypotheses/</span> <span className="desc"># what you're tracking evidence for</span></div>
              <div><span className="folder">&#9492;&#9472; decisions/</span> <span className="desc"># calls made + what would reopen them</span></div>
              <div><span className="folder">&#9492;&#9472; stakeholders/</span> <span className="desc"># one file per person, asks &amp; concerns</span></div>
              <div><span className="folder">&#9492;&#9472; ingestion/</span> <span className="desc"># synthesis of every doc the brain read</span></div>
              <div><span className="folder">&#9492;&#9472; source/</span> <span className="desc"># untouched originals, audit trail</span></div>
            </div>
            <div className="anatomy-points">
              <div className="ap">
                <h4>
                  Provenance on every claim <span className="mini-badge">[documented]</span>
                </h4>
                <p>Each load-bearing fact wears a marker: a documented interview, a verbal aside, your hunch, or industry knowledge. Documented outweighs verbal outweighs intuition &mdash; in plain text, so you can override it.</p>
              </div>
              <details className="fold">
                <summary>How it stays honest</summary>
                <div className="fold-body">
                  <div className="ap">
                    <h4>One artifact, four to six files</h4>
                    <p>Drop in a transcript and the synthesis propagates: a user insight updates <code>knowledge/</code>, opens a <code>hypotheses/</code> stub, and flags a <code>stakeholders/</code> follow-up.</p>
                  </div>
                  <div className="ap">
                    <h4>Friday sweep keeps it honest</h4>
                    <p><code>/review</code> reads the whole folder weekly, flags what's drifting, and surfaces contradictions &mdash; like a decision that a new interview just undermined.</p>
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
            How it works<span className="phase-chip">The loop</span>
          </div>
          <h2
            id="how-h"
          >
            The brain has one loop. Every task runs through it.
          </h2>
          <p className="lead">
            Feed it an artifact. It sources the original, synthesizes the signal,
            propagates it everywhere it applies, and tags the provenance. Then sweeps the
            whole thing every Friday.
          </p>

          <div className="loop">
            <div className="loop-step">
              <div className="ls-num">01 &middot; INGEST</div>
              <h4>Feed it</h4>
              <p>A transcript, a doc, a screenshot, a line in chat, or a pull from Notion / Jira / Slack.</p>
            </div>
            <div className="loop-step">
              <div className="ls-num">02 &middot; SYNTHESIZE</div>
              <h4>Source it</h4>
              <p>The original copies to <code>source/</code>. Observations land in <code>ingestion/</code>, tagged by speaker and date.</p>
            </div>
            <div className="loop-step">
              <div className="ls-num">03 &middot; PROPAGATE</div>
              <h4>Spread it</h4>
              <p>The durable layer updates wherever the new signal applies &mdash; often four to six files at once.</p>
            </div>
            <div className="loop-step">
              <div className="ls-num">04 &middot; SWEEP</div>
              <h4>Keep it clean</h4>
              <p>Friday's review flags drift, resolves small things, and drafts the bigger calls for you.</p>
            </div>
          </div>

          <details className="fold">
            <summary>The 3-step workflow</summary>
            <div className="fold-body steps">
              <article className="step">
                <div className="step-num">01 &middot; Capture</div>
                <h3>Build your brain in a guided interview</h3>
                <p>A short, five-batch conversation captures your company, product, users, strategy, and decisions. Start fresh, or point it at existing Notion exports and Jira boards and it absorbs them.</p>
              </article>
              <article className="step">
                <div className="step-num">02 &middot; Orchestrate</div>
                <h3>Run skills that draw on it</h3>
                <p>Invoke a PM skill &mdash; write a PRD, define a north star, run discovery &mdash; and it loads your real context first, then applies the framework. Output cites the brain files it used.</p>
              </article>
              <article className="step">
                <div className="step-num">03 &middot; Portable</div>
                <h3>Take it to any AI</h3>
                <p>The brain is plain files. Load it into Claude Code, Cursor, Claude Desktop, or paste it into a chat. Same context, same provenance, no platform lock-in.</p>
              </article>
            </div>
          </details>
        </section>

        <hr className="divider" />

        {/* SKILLS */}
        <section className="section" id="skills" aria-labelledby="skills-h">
          <div className="sec-lbl">
            The skill layer<span className="phase-chip">Free &middot; reads the brain</span>
          </div>
          <div className="skills-head">
            <h2
              id="skills-h"
              style={{ marginBottom: 0 }}
            >
              Frameworks, not blank pages.
            </h2>
            <div className="skills-stats">
              <strong>68</strong> skills &middot; <strong>9</strong> plugins &middot;{" "}
              <strong>42</strong> chained workflows
            </div>
          </div>
          <p className="lead">
            Each skill encodes a proven PM framework &mdash; Teresa Torres on discovery,
            Cagan on product strategy, Savoia on pretotyping &mdash; and walks you through
            it step by step. Commands chain skills end to end, then suggest what to run
            next.
          </p>

          <div className="cmd-grid">
            <div className="cmd">
              <div className="cmd-name">/discover</div>
              <p>Turn a fuzzy idea into testable bets, grounded in your ICP.</p>
              <div className="cmd-chain">brainstorm-ideas &rarr; identify-assumptions &rarr; prioritize-assumptions &rarr; brainstorm-experiments</div>
              <span className="fw">Opportunity Solution Tree</span>
            </div>
            <div className="cmd">
              <div className="cmd-name">/north-star</div>
              <p>Define a north star with secondary and guardrail metrics for the current bet.</p>
              <div className="cmd-chain">metric-tree &rarr; input-metrics &rarr; guardrails</div>
              <span className="fw">Amplitude North Star</span>
            </div>
            <div className="cmd">
              <div className="cmd-name">/prd-generator</div>
              <p>Draft a PRD scoped to the bet and ICP already in your brain, then route it past five reviewer agents.</p>
              <div className="cmd-chain">problem-statement &rarr; scope &rarr; success-metrics &rarr; reviewer-agents</div>
              <span className="fw">Marty Cagan</span>
            </div>
          </div>
          <details className="fold" style={{ marginTop: 14 }}>
            <summary>3 more commands</summary>
            <div className="fold-body cmd-grid">
              <div className="cmd">
                <div className="cmd-name">/strategy</div>
                <p>Pressure-test direction against what you know and what you've decided.</p>
                <div className="cmd-chain">diagnosis &rarr; guiding-policy &rarr; coherent-actions</div>
                <span className="fw">Rumelt Good Strategy</span>
              </div>
              <div className="cmd">
                <div className="cmd-name">/risk</div>
                <p>Five-area risk scan; opens hypothesis stubs for anything uncovered.</p>
                <div className="cmd-chain">value &rarr; usability &rarr; feasibility &rarr; viability &rarr; ethics</div>
                <span className="fw">Cagan Four Risks</span>
              </div>
              <div className="cmd">
                <div className="cmd-name">/prep</div>
                <p>One-page brief before a meeting: their open asks and last unresolved concern.</p>
                <div className="cmd-chain">load-stakeholder &rarr; open-threads &rarr; suggested-questions</div>
                <span className="fw">Stakeholder file</span>
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
                  <h4>Context loaded before the skill runs</h4>
                  <div className="ctx-bar">
                    <span className="ctx-file">context/company.md</span>
                    <span className="ctx-file">context/product.md</span>
                    <span className="ctx-file verbal">context/personas.md</span>
                    <span className="ctx-file">context/goals.md</span>
                    <span className="ctx-file hunch">hypotheses/activation.md</span>
                  </div>
                  <div className="answer-block">
                    <code>/prd-generator</code> &mdash; drafting &ldquo;Onboarding rework:
                    connector-first setup&rdquo; against the loaded context. Problem
                    statement and success metrics pulled from <code>context/goals.md</code>,
                    not invented.
                  </div>
                </div>
                <div className="proto-col">
                  <h4>Five reviewer agents, one pass</h4>
                  <ul className="agent-list">
                    <li className="done"><span className="st">&#10003;</span> CTO review <span className="verdict">feasible &middot; 2 flags</span></li>
                    <li className="done"><span className="st">&#10003;</span> UX review <span className="verdict">approved</span></li>
                    <li className="running"><span className="st">&#9679;</span> Sales review <span className="verdict">running&hellip;</span></li>
                    <li><span className="st">&#9675;</span> Exec review <span className="verdict">queued</span></li>
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
                  <h4>Ask a question, get cited answers</h4>
                  <div className="m-input" style={{ marginBottom: 12 }}>
                    Why is activation dipping, and what did we already decide about it?
                  </div>
                  <div className="answer-block">
                    Activation drops at connector setup &mdash; 38% of new workspaces never
                    finish their first connector <span className="tag doc">documented</span>.
                    You decided on 05-12 to rework onboarding connector-first; reopening
                    requires new funnel data <span className="tag doc">documented</span>. Eng
                    flagged the Q3 platform work may slip 3 weeks{" "}
                    <span className="tag verbal">verbal</span>.
                    <span className="cite">sources: funnel-doc &middot; decisions/onboarding.md &middot; #eng-leads thread</span>
                  </div>
                </div>
                <div className="proto-col">
                  <h4>Fresh memories, tagged by source</h4>
                  <ul className="agent-list">
                    <li className="done"><span className="st">&#9679;</span> Persona shift: senior PMs now primary adopters <span className="verdict">interview &middot; 2d</span></li>
                    <li className="done"><span className="st">&#9679;</span> Activation drops at connector setup <span className="verdict">doc &middot; 4d</span></li>
                    <li className="done"><span className="st">&#9679;</span> Per-seat pricing fatigue: 14 tickets this month <span className="verdict">tickets &middot; 1w</span></li>
                    <li className="done"><span className="st">&#9679;</span> Enterprise deals stall at security review <span className="verdict">meeting &middot; 1d</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="proto-foot">
              <span className="hint">/phase-2/ask &middot; cited answers from the brain</span>
              <Link className="proto-link" to="/phase-2/ask">Open this screen in the prototype &rarr;</Link>
            </div>
          </div>

          <div className="proto-panel" role="tabpanel" id="panel-p3" aria-labelledby="tab-p3" hidden={tab !== 2}>
            <div className="proto-body">
              <div className="proto-row">
                <div className="proto-col">
                  <h4>One company brain, per-source permissions</h4>
                  <table className="perm-table">
                    <thead>
                      <tr><th scope="col">Source</th><th scope="col">Owner</th><th scope="col">Visibility</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>slack/#eng-leads</td><td>Rohan M.</td><td><span className="perm team">team</span></td></tr>
                      <tr><td>interviews/2026-q2/</td><td>Ava C.</td><td><span className="perm private">private</span></td></tr>
                      <tr><td>docs/activation-funnel</td><td>Ava C.</td><td><span className="perm team">team</span></td></tr>
                      <tr><td>jira/PLAT board</td><td>Rohan M.</td><td><span className="perm team">team</span></td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="proto-col">
                  <h4>Leaders see it compound</h4>
                  <div className="answer-block">
                    Private notes stay private; team knowledge compounds. The adoption
                    dashboard shows which PMs are onboarded, which skills run most, and
                    where the shared brain answered a question that used to take a meeting.
                  </div>
                </div>
              </div>
            </div>
            <div className="proto-foot">
              <span className="hint">/phase-3/company-brain &middot; shared sources &amp; permissions</span>
              <Link className="proto-link" to="/phase-3/company-brain">Open this screen in the prototype &rarr;</Link>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* COMPOSE */}
        <section className="section" aria-label="How the brain and skills compose">
          <div className="compose">
            <h3>Skill packs give your AI <em>instructions</em>. PM OS gives it <em>evidence</em>.</h3>
            <p>Instructions are everywhere &mdash; free, $49, $39 a month. A cited memory of <em>your</em> product exists nowhere else. The skill is how to do the work once; the brain is what you know across all the times you did it. They compose &mdash; a skill runs the framework, the brain supplies the context and remembers the result.</p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="cta-section" aria-labelledby="cta-h">
          <h2
            id="cta-h"
          >
            Stop briefing your AI from memory.
          </h2>
          <p>
            Free while in research preview: the guided interview, your first project's
            brain, and every skill. Runs on the Claude subscription you already have.
          </p>
          <div className="cta-actions">
            <EmailCapture compact />
          </div>
          <div className="cta-secondary">
            <Link to="/phase-1/setup">Explore the clickable prototype &rarr;</Link>
          </div>
          <div className="fine">
            research preview &middot; your brain commits locally &middot; never pushed
            anywhere you don't control &middot; <a href={GITHUB_URL}>GitHub</a>
          </div>
        </section>
      </main>

      <footer role="contentinfo">
        <div className="footer-inner">
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--accent)" }}>pm-os.app</span>
          <span>
            <a href="#phases">What you get</a> &middot; <a href="#brain">The Brain</a> &middot;{" "}
            <a href="#skills">Skills</a> &middot; <a href="#prototype">Prototype</a>
          </span>
          <span>Research preview &middot; 2026</span>
        </div>
      </footer>
    </div>
  );
}
