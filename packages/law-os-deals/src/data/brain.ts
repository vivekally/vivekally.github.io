// Deal Brain mock data — Law OS Deals edition.
// Same structure as PM Brain; all deals, people and entries are fictional.
// Running example: Project Basalt — acquisition of Corven Systems (fictional).

export type Memory = {
  id: string;
  title: string;
  source: "Redline" | "Data room" | "Email" | "Call" | "Draft";
  provenance: "documented" | "verbal";
  when: string;
  note: string;
  tags: string[];
};

export const memories: Memory[] = [
  {
    id: "m1",
    title: "Counterparty accepted our non-solicit carve-out",
    source: "Redline",
    provenance: "documented",
    when: "Yesterday",
    note: "Their markup v4 leaves clause 9.3 untouched.",
    tags: ["positions", "spa"],
  },
  {
    id: "m2",
    title: "DD flag: change-of-control consent on top customer contract",
    source: "Data room",
    provenance: "documented",
    when: "2d ago",
    note: "Corven's MSA with Northgate requires consent on change of control.",
    tags: ["diligence", "risk"],
  },
  {
    id: "m3",
    title: "Client CFO wants signing before quarter-end",
    source: "Call",
    provenance: "verbal",
    when: "4d ago",
    note: "Willing to trade on the indemnity cap to hit 09-30.",
    tags: ["timeline", "client"],
  },
  {
    id: "m4",
    title: "Their counsel floated a 20% indemnity cap",
    source: "Email",
    provenance: "documented",
    when: "1w ago",
    note: "Framed as 'market for carve-out deals'; our precedent set says 12–15%.",
    tags: ["positions", "indemnity"],
  },
  {
    id: "m5",
    title: "Founders anxious about earnout metrics",
    source: "Call",
    provenance: "verbal",
    when: "1w ago",
    note: "Worried the revenue definition lets the buyer game the earnout.",
    tags: ["earnout", "people"],
  },
];

export const priorities = [
  { id: "p1", text: "Chase Northgate consent — long pole to closing", why: "m2: consent path takes 3+ weeks", urgent: true },
  { id: "p2", text: "Counter indemnity cap at 12% with the precedent set", why: "m4 vs our last three private deals", urgent: false },
  { id: "p3", text: "Lock the earnout revenue definition before the next turn", why: "m5; founders may walk on ambiguity", urgent: false },
];

export type GraphNode = { id: string; label: string; kind: "person" | "issue" | "artifact" | "decision"; x: number; y: number };
export type GraphEdge = { from: string; to: string; label: string };

export const graphNodes: GraphNode[] = [
  { id: "n1", label: "Indemnity cap", kind: "issue", x: 300, y: 90 },
  { id: "n2", label: "Earnout definition", kind: "issue", x: 140, y: 190 },
  { id: "n3", label: "SPA v5", kind: "artifact", x: 460, y: 190 },
  { id: "n4", label: "M. Reyes (their counsel)", kind: "person", x: 600, y: 90 },
  { id: "n5", label: "Counter at 12%", kind: "decision", x: 300, y: 300 },
  { id: "n6", label: "Northgate consent", kind: "issue", x: 80, y: 60 },
  { id: "n7", label: "Closing checklist", kind: "artifact", x: 470, y: 320 },
];

export const graphEdges: GraphEdge[] = [
  { from: "n4", to: "n1", label: "proposed_20%" },
  { from: "n1", to: "n5", label: "led_to" },
  { from: "n5", to: "n3", label: "shapes" },
  { from: "n2", to: "n3", label: "open_in" },
  { from: "n6", to: "n7", label: "blocks" },
  { from: "n3", to: "n7", label: "feeds" },
];

export const cannedAnswer = {
  question: "What's our position on the indemnity cap, and why?",
  answer:
    "Counter at 12% of EV with 18-month survival. Our last three private deals closed at 12–15% (Halcyon at 12%, Redwood at 15% — both executed), and their counsel's 20% ask was framed as market without support. The client has signalled they'd accept 15% to protect the quarter-end signing — hold that back as the final trade.",
  sources: ["m4", "m3"],
  decision: "Counter at 12%",
};

export const connectors = [
  { name: "Email", status: "connected", items: "6,120 messages distilled" },
  { name: "Data room", status: "connected", items: "3,418 documents swept" },
  { name: "iManage DMS", status: "connected", items: "1,240 precedents indexed" },
  { name: "Call notes", status: "available", items: "Client + counsel calls" },
  { name: "E-signature", status: "available", items: "Signature tracking" },
  { name: "Billing", status: "available", items: "Time entries" },
];

export const pipeline = [
  { step: "Capture", detail: "Redlines, data-room docs, emails and call notes land in the inbox" },
  { step: "Auto-summarize", detail: "Each item compressed to what matters" },
  { step: "Distill", detail: "Deduped, linked to parties, clauses, precedents" },
  { step: "Structured knowledge", detail: "Searchable deal memory with provenance" },
];
