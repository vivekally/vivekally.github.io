// Matter file set — Law OS Litigation edition. Health scores and contents are
// mock values (invented for the prototype). Running example matter:
// Meridian Logistics v. Corestone Manufacturing (fictional).

export type ContextFile = {
  id: string;
  file: string;
  label: string;
  health: number;
  updated: string;
  summary: string;
};

export const contextFiles: ContextFile[] = [
  {
    id: "facts",
    file: "matters/meridian/facts.md",
    label: "Facts & record",
    health: 88,
    updated: "1d ago",
    summary: "Chronology, exhibits, admissions — every entry tagged by source.",
  },
  {
    id: "theory",
    file: "matters/meridian/theory.md",
    label: "Case theory",
    health: 74,
    updated: "4d ago",
    summary: "Elements map, strengths, and the weaknesses you already know about.",
  },
  {
    id: "deadlines",
    file: "matters/meridian/deadlines.md",
    label: "Deadlines",
    health: 96,
    updated: "1d ago",
    summary: "Limitation dates, court deadlines, reminder rules.",
  },
  {
    id: "client",
    file: "clients/meridian.md",
    label: "Client",
    health: 69,
    updated: "2w ago",
    summary: "Risk appetite, reporting cadence, key contacts.",
  },
  {
    id: "authorities",
    file: "authorities/notice.md",
    label: "Authorities",
    health: 52,
    updated: "5w ago",
    summary: "Cases and statutes on notice — and how courts have treated them.",
  },
];

export const setupSteps = [
  { id: 1, label: "Install Law OS", detail: "One command. Works with your existing AI subscription.", done: true },
  { id: 2, label: "Open a matter", detail: "Client, parties, facts, theory, deadlines.", done: true },
  { id: 3, label: "Connect sources", detail: "Email, DMS, docket via MCP. Privileged files stay local.", done: false },
  { id: 4, label: "Run your first skill", detail: "Try /research-memo on a live question.", done: false },
];
