// PM Brain mock data.
// Concepts grounded in the Notion sources: auto-summarize → distill → structured knowledge (MVP-1),
// Brain = Knowledge / memory (Direction page), typed knowledge graph + provenance (GBrain research),
// Consolidate Data: Connectors (Architecture map).
// All specific entries below are mock values (invented for the prototype).

export type Memory = {
  id: string;
  title: string;
  source: "Meeting" | "Slack" | "Interview" | "Doc" | "Ticket";
  provenance: "documented" | "verbal";
  when: string;
  note: string;
  tags: string[];
};

export const memories: Memory[] = [
  {
    id: "m1",
    title: "Enterprise buyers stall at security review",
    source: "Meeting",
    provenance: "verbal",
    when: "Yesterday",
    note: "3 of last 5 enterprise deals paused at security questionnaire stage.",
    tags: ["sales", "enterprise", "risk"],
  },
  {
    id: "m2",
    title: "Persona shift: senior PMs now primary adopters",
    source: "Interview",
    provenance: "documented",
    when: "2d ago",
    note: "8 of 10 recent interviewees were 6+ years in role, not juniors.",
    tags: ["personas", "discovery"],
  },
  {
    id: "m3",
    title: "Activation drops at connector setup",
    source: "Doc",
    provenance: "documented",
    when: "4d ago",
    note: "Funnel doc: 38% of new workspaces never finish first connector.",
    tags: ["activation", "metrics"],
  },
  {
    id: "m4",
    title: "Eng flagged roadmap risk on Q3 platform work",
    source: "Slack",
    provenance: "verbal",
    when: "1w ago",
    note: "#eng-leads thread: platform migration may slip 3 weeks.",
    tags: ["roadmap", "risk"],
  },
  {
    id: "m5",
    title: "Pricing objection pattern: per-seat fatigue",
    source: "Ticket",
    provenance: "documented",
    when: "1w ago",
    note: "Support tags show 14 mentions of seat-based pricing pushback this month.",
    tags: ["pricing", "sales"],
  },
];

export const priorities = [
  { id: "p1", text: "Unblock security review for Acme deal", why: "Pattern m1: 3 stalled deals", urgent: true },
  { id: "p2", text: "Rewrite personas.md with senior-PM insight", why: "Pattern m2 contradicts current context", urgent: false },
  { id: "p3", text: "Spec connector-setup fix before Q3 planning", why: "m3 + m4 compound", urgent: false },
];

export type GraphNode = { id: string; label: string; kind: "person" | "theme" | "artifact" | "decision"; x: number; y: number };
export type GraphEdge = { from: string; to: string; label: string };

export const graphNodes: GraphNode[] = [
  { id: "n1", label: "Activation drop", kind: "theme", x: 300, y: 90 },
  { id: "n2", label: "Connector setup", kind: "theme", x: 140, y: 190 },
  { id: "n3", label: "Q3 roadmap", kind: "artifact", x: 460, y: 190 },
  { id: "n4", label: "Maya (Eng lead)", kind: "person", x: 600, y: 90 },
  { id: "n5", label: "Ship guided setup", kind: "decision", x: 300, y: 300 },
  { id: "n6", label: "Senior-PM persona", kind: "theme", x: 80, y: 60 },
  { id: "n7", label: "PRD: Setup v2", kind: "artifact", x: 470, y: 320 },
];

export const graphEdges: GraphEdge[] = [
  { from: "n2", to: "n1", label: "causes" },
  { from: "n1", to: "n3", label: "informs" },
  { from: "n4", to: "n3", label: "owns_risk" },
  { from: "n1", to: "n5", label: "led_to" },
  { from: "n5", to: "n7", label: "produced" },
  { from: "n6", to: "n2", label: "experiences" },
];

/** Fast lookup for citing memories by id. */
export const memoryById: Record<string, Memory> = Object.fromEntries(
  memories.map((m) => [m.id, m])
);

// ── Ask the Brain: a set of grounded Q&A, each citing real memories ──
export type Query = {
  id: string;
  question: string;
  answer: string;
  sources: string[]; // memory ids
  decision?: string;
};

export const queries: Query[] = [
  {
    id: "q1",
    question: "Why did we decide to rebuild connector setup?",
    answer:
      "Activation data showed 38% of new workspaces never finish their first connector (funnel doc, 4d ago). Combined with the eng-flagged Q3 platform risk, the team chose “Ship guided setup” over a full rebuild — and the PRD “Setup v2” came out of that decision.",
    sources: ["m3", "m4"],
    decision: "Ship guided setup",
  },
  {
    id: "q2",
    question: "What's blocking our enterprise deals?",
    answer:
      "Security review is the recurring wall — 3 of the last 5 enterprise deals paused at the security-questionnaire stage. Per-seat pricing fatigue compounds it: support logged 14 seat-pricing objections this month.",
    sources: ["m1", "m5"],
    decision: "Unblock security review for Acme",
  },
  {
    id: "q3",
    question: "Has our target persona changed?",
    answer:
      "Yes — senior PMs are now the primary adopters. 8 of 10 recent interviewees were 6+ years in role, not juniors. personas.md still describes the old junior-PM profile and needs a rewrite.",
    sources: ["m2"],
    decision: "Rewrite personas.md",
  },
  {
    id: "q4",
    question: "Who owns the platform migration risk?",
    answer:
      "Maya (Eng lead) flagged it in #eng-leads — the Q3 platform migration may slip 3 weeks. It compounds the activation problem, since guided setup depends on that platform work landing.",
    sources: ["m4"],
    decision: "Spec connector-setup fix before Q3 planning",
  },
];

// Back-compat alias (first query) for any older reference.
export const cannedAnswer = queries[0];

// ── Knowledge graph: per-node detail for the inspector panel ──
export const nodeDetail: Record<
  string,
  { kindLabel: string; blurb: string; memoryIds: string[] }
> = {
  n1: { kindLabel: "Theme", blurb: "38% of new workspaces never finish the first connector.", memoryIds: ["m3"] },
  n2: { kindLabel: "Theme", blurb: "Connector setup is the activation gate — where friction concentrates.", memoryIds: ["m3"] },
  n3: { kindLabel: "Artifact", blurb: "Q3 roadmap — at risk of a 3-week slip on platform work.", memoryIds: ["m4"] },
  n4: { kindLabel: "Person", blurb: "Eng lead. Owns the platform-migration risk.", memoryIds: ["m4"] },
  n5: { kindLabel: "Decision", blurb: "Ship guided setup instead of a full rebuild.", memoryIds: ["m3", "m4"] },
  n6: { kindLabel: "Theme", blurb: "Senior PMs are now the primary adopters, not juniors.", memoryIds: ["m2"] },
  n7: { kindLabel: "Artifact", blurb: "PRD produced by the guided-setup decision.", memoryIds: [] },
};

// ── Dashboard: detected patterns that connect memories → a priority ──
export type Pattern = {
  id: string;
  title: string;
  memoryIds: string[];
  priorityId: string;
  severity: "attention" | "watch";
};

export const patterns: Pattern[] = [
  { id: "pat1", title: "Enterprise deals stalling at security review", memoryIds: ["m1", "m5"], priorityId: "p1", severity: "attention" },
  { id: "pat2", title: "Persona shifted to senior PMs", memoryIds: ["m2"], priorityId: "p2", severity: "attention" },
  { id: "pat3", title: "Activation + roadmap risk compounding", memoryIds: ["m3", "m4"], priorityId: "p3", severity: "watch" },
];

export const connectors = [
  { name: "Slack", status: "connected", items: "1,204 messages distilled" },
  { name: "Jira", status: "connected", items: "342 tickets indexed" },
  { name: "Notion", status: "connected", items: "88 docs indexed" },
  { name: "Gong", status: "available", items: "Call transcripts" },
  { name: "Amplitude", status: "available", items: "Product analytics" },
  { name: "HubSpot", status: "available", items: "CRM notes" },
];

export const pipeline = [
  { step: "Capture", detail: "Meetings, Slack, docs, tickets land in the inbox" },
  { step: "Auto-summarize", detail: "Each item compressed to what matters" },
  { step: "Distill", detail: "Deduped, linked to people, themes, decisions" },
  { step: "Structured knowledge", detail: "Searchable memory with provenance" },
];
