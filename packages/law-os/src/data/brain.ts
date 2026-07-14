// Matter Brain mock data — Law OS Litigation edition.
// Same structure as PM Brain; all matters, people and entries are fictional.

export type Memory = {
  id: string;
  title: string;
  source: "Deposition" | "Email" | "Filing" | "Call" | "Hearing";
  provenance: "documented" | "verbal";
  when: string;
  note: string;
  tags: string[];
};

export const memories: Memory[] = [
  {
    id: "m1",
    title: "Ops lead admitted delay in 04-09 email",
    source: "Email",
    provenance: "documented",
    when: "Yesterday",
    note: "Corestone ops lead, Ex. 14: 'we knew the units would slip by six weeks.'",
    tags: ["liability", "exhibits"],
  },
  {
    id: "m2",
    title: "Depo: site manager confirms plant idle 6 weeks",
    source: "Deposition",
    provenance: "documented",
    when: "2d ago",
    note: "Tr. 114:3–12 — no interim workaround was available.",
    tags: ["damages", "testimony"],
  },
  {
    id: "m3",
    title: "Opposing counsel floated a mediation window",
    source: "Call",
    provenance: "verbal",
    when: "4d ago",
    note: "Their lead counsel raised late-September mediation 'if discovery goes cleanly.'",
    tags: ["strategy"],
  },
  {
    id: "m4",
    title: "Court moved pretrial conference to 10-02",
    source: "Filing",
    provenance: "documented",
    when: "1w ago",
    note: "Docket entry 87; trial date unchanged.",
    tags: ["deadlines"],
  },
  {
    id: "m5",
    title: "Client CFO hesitant about Windsor testimony",
    source: "Call",
    provenance: "verbal",
    when: "1w ago",
    note: "CFO reluctant to put the commercial director on the stand.",
    tags: ["witnesses", "risk"],
  },
];

export const priorities = [
  { id: "p1", text: "Confirm CFO deposition date before discovery cutoff", why: "m3 + m4 compound: window is closing", urgent: true },
  { id: "p2", text: "Fold idle-plant testimony into theory.md", why: "m2 strengthens causation; theory is 4d stale", urgent: false },
  { id: "p3", text: "Brief client on the mediation window before 09-01", why: "m3; client prefers early resolution", urgent: false },
];

export type GraphNode = { id: string; label: string; kind: "person" | "issue" | "artifact" | "decision"; x: number; y: number };
export type GraphEdge = { from: string; to: string; label: string };

export const graphNodes: GraphNode[] = [
  { id: "n1", label: "Late delivery", kind: "issue", x: 300, y: 90 },
  { id: "n2", label: "Notice defence", kind: "issue", x: 140, y: 190 },
  { id: "n3", label: "Trial plan", kind: "artifact", x: 460, y: 190 },
  { id: "n4", label: "D. Whitfield (ops lead)", kind: "person", x: 600, y: 90 },
  { id: "n5", label: "Move for partial SJ", kind: "decision", x: 300, y: 300 },
  { id: "n6", label: "Idle plant · $2.1M", kind: "issue", x: 80, y: 60 },
  { id: "n7", label: "MSJ brief v2", kind: "artifact", x: 470, y: 320 },
];

export const graphEdges: GraphEdge[] = [
  { from: "n4", to: "n1", label: "admitted" },
  { from: "n1", to: "n6", label: "caused" },
  { from: "n6", to: "n5", label: "supports" },
  { from: "n2", to: "n5", label: "risk_to" },
  { from: "n5", to: "n7", label: "produced" },
  { from: "n1", to: "n3", label: "informs" },
];

export const cannedAnswer = {
  question: "Why are we moving for partial summary judgment?",
  answer:
    "The 04-09 email has Corestone's ops lead admitting the six-week slip (Ex. 14), and their site manager confirmed the plant sat idle with no workaround (Tr. 114:3–12). Liability under §4.2 is clean on the record; damages stay for trial. The decision 'Move for partial SJ' came out of that — reopen only if the notice defence gains traction.",
  sources: ["m1", "m2"],
  decision: "Move for partial SJ",
};

export const connectors = [
  { name: "Email", status: "connected", items: "8,412 messages distilled" },
  { name: "iManage DMS", status: "connected", items: "1,904 documents indexed" },
  { name: "Docket / PACER", status: "connected", items: "87 entries tracked" },
  { name: "Transcripts", status: "available", items: "Depositions & hearings" },
  { name: "Call notes", status: "available", items: "Client + counsel calls" },
  { name: "Billing", status: "available", items: "Time entries" },
];

export const pipeline = [
  { step: "Capture", detail: "Emails, filings, transcripts and call notes land in the inbox" },
  { step: "Auto-summarize", detail: "Each item compressed to what matters" },
  { step: "Distill", detail: "Deduped, linked to parties, issues, authorities" },
  { step: "Structured knowledge", detail: "Searchable matter memory with provenance" },
];
