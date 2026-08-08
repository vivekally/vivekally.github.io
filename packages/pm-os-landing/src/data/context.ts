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

// ─────────────────────────────────────────────────────────────────────────────
// Interactive onboarding wizard data (Phase 1 · Setup)
// All values are mock content for the "~/datapulse-brain" demo — a B2B SaaS
// activation-analytics company, matching the deck's "data lead who owns
// activation" persona. Claim counts are representative, not measured.
// ─────────────────────────────────────────────────────────────────────────────

export type Provenance = "documented" | "verbal" | "hunch" | "industry";

/** Maps a provenance value to the Badge tone with the exact DESIGN.md color. */
export const provenanceTone: Record<Provenance, "doc" | "verbal" | "hunch" | "industry"> = {
  documented: "doc",
  verbal: "verbal",
  hunch: "hunch",
  industry: "industry",
};

export type Claim = { text: string; prov: Provenance };

export type InterviewAnswer = {
  label: string;
  /** representative claims shown as pills */
  claims: Claim[];
  /** number the running "claims captured" counter increments by */
  count: number;
};

export type InterviewQuestion = {
  id: string;
  file: string;
  fileLabel: string;
  q: string;
  answers: InterviewAnswer[];
};

export const interview: InterviewQuestion[] = [
  {
    id: "company",
    file: "context/company.md",
    fileLabel: "company",
    q: "What does your company do, in one line?",
    answers: [
      {
        label: "Activation analytics for B2B data teams",
        count: 6,
        claims: [
          { text: "B2B SaaS · analytics for data teams", prov: "documented" },
          { text: "PLG motion, freemium entry", prov: "documented" },
          { text: "Category: product analytics", prov: "industry" },
        ],
      },
    ],
  },
  {
    id: "product",
    file: "context/product.md",
    fileLabel: "product",
    q: "What's your product's current big bet?",
    answers: [
      {
        label: "Self-serve connector setup",
        count: 7,
        claims: [
          { text: "Big bet: self-serve connectors", prov: "documented" },
          { text: "Setup is the activation gate", prov: "verbal" },
          { text: "Pricing: seat + usage hybrid", prov: "documented" },
        ],
      },
    ],
  },
  {
    id: "personas",
    file: "context/personas.md",
    fileLabel: "personas",
    q: "Who is your primary persona?",
    answers: [
      {
        label: "Data lead who owns activation",
        count: 9,
        claims: [
          { text: "Primary: data lead owns activation", prov: "documented" },
          { text: "Churns at connector setup", prov: "verbal" },
          { text: "Enterprise will pay for SSO", prov: "hunch" },
        ],
      },
    ],
  },
  {
    id: "competitors",
    file: "context/competitors.md",
    fileLabel: "competitors",
    q: "Who do you lose deals to most?",
    answers: [
      {
        label: "Incumbent dashboards (Looker, Mode)",
        count: 6,
        claims: [
          { text: "Lose to incumbent dashboards", prov: "documented" },
          { text: "Edge: activation, not reporting", prov: "hunch" },
          { text: "Switchers cite setup time", prov: "verbal" },
        ],
      },
    ],
  },
  {
    id: "goals",
    file: "context/goals.md",
    fileLabel: "goals",
    q: "What's this quarter's top OKR?",
    answers: [
      {
        label: "Lift activation 20% → 35%",
        count: 5,
        claims: [
          { text: "OKR: activation 20% → 35%", prov: "documented" },
          { text: "Guardrail: setup under 10 min", prov: "documented" },
        ],
      },
    ],
  },
];

export type Connector = {
  id: string;
  label: string;
  glyph: string;
  imports: string;
  claimsAdded: number;
};

export const connectors: Connector[] = [
  { id: "jira", label: "Jira", glyph: "▤", imports: "128 tickets, 3 boards", claimsAdded: 8 },
  { id: "slack", label: "Slack", glyph: "▦", imports: "#product, #research", claimsAdded: 5 },
  { id: "notion", label: "Notion", glyph: "◫", imports: "42 docs, 2 wikis", claimsAdded: 6 },
  { id: "analytics", label: "Analytics", glyph: "◉", imports: "Amplitude events", claimsAdded: 4 },
];

/** Claims already imported from existing artifacts during install (Notion/Jira dump). */
export const seededClaims = 7;
