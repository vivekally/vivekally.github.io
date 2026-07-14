// Context file set comes from the mySecond.ai research doc:
// context/ = company, product, personas, competitors, goals.
// Health scores and file contents are mock values (invented for the prototype).

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
    id: "company",
    file: "context/company.md",
    label: "Company",
    health: 92,
    updated: "2d ago",
    summary: "Mission, business model, teams, tone of voice.",
  },
  {
    id: "product",
    file: "context/product.md",
    label: "Product",
    health: 84,
    updated: "5d ago",
    summary: "Surfaces, capabilities, pricing, current bets.",
  },
  {
    id: "personas",
    file: "context/personas.md",
    label: "Personas",
    health: 61,
    updated: "3w ago",
    summary: "Primary and secondary personas with jobs-to-be-done.",
  },
  {
    id: "competitors",
    file: "context/competitors.md",
    label: "Competitors",
    health: 47,
    updated: "6w ago",
    summary: "Landscape, positioning notes, win/loss themes.",
  },
  {
    id: "goals",
    file: "context/goals.md",
    label: "Goals",
    health: 88,
    updated: "1w ago",
    summary: "Company and team OKRs for the current quarter.",
  },
];

export const setupSteps = [
  { id: 1, label: "Install PM OS", detail: "One command. Works with your existing AI subscription.", done: true },
  { id: 2, label: "Write context once", detail: "Company, product, personas, competitors, goals.", done: true },
  { id: 3, label: "Connect tools", detail: "Jira, Slack, Notion, analytics via MCP.", done: false },
  { id: 4, label: "Run your first skill", detail: "Try /prd-generator with your real backlog.", done: false },
];
