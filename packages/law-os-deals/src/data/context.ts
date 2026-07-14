// Deal file set — Law OS Deals edition. Health scores and contents are mock
// values (invented for the prototype). Running example deal:
// Project Basalt — acquisition of Corven Systems (fictional).

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
    id: "terms",
    file: "deals/basalt-corven/terms.md",
    label: "Deal terms",
    health: 91,
    updated: "1d ago",
    summary: "Structure, price, rollover, earnout — as agreed so far, by source.",
  },
  {
    id: "positions",
    file: "deals/basalt-corven/positions.md",
    label: "Positions",
    health: 78,
    updated: "3d ago",
    summary: "Your asks and fallbacks by clause, with the history of every trade.",
  },
  {
    id: "openpoints",
    file: "deals/basalt-corven/open-points.md",
    label: "Open points",
    health: 85,
    updated: "1d ago",
    summary: "Every unresolved point with owner, age, and next step.",
  },
  {
    id: "client",
    file: "clients/basalt.md",
    label: "Client",
    health: 66,
    updated: "2w ago",
    summary: "Risk appetite, approval chain, deal team contacts.",
  },
  {
    id: "precedents",
    file: "precedents/spa-index.md",
    label: "Precedents",
    health: 58,
    updated: "6w ago",
    summary: "Executed agreements and what actually got accepted, by clause.",
  },
];

export const setupSteps = [
  { id: 1, label: "Install Law OS", detail: "One command. Works with your existing AI subscription.", done: true },
  { id: 2, label: "Open a deal", detail: "Client, structure, key terms, positions, closing plan.", done: true },
  { id: 3, label: "Connect sources", detail: "Email, data room, DMS via MCP. Deal files stay local.", done: false },
  { id: 4, label: "Run your first skill", detail: "Try /markup-review on a live redline.", done: false },
];
