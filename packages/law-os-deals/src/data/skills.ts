// Mock data — Law OS Deals edition. Structure mirrors PM OS; every firm,
// deal, person and number below is fictional demo content.

export type Skill = {
  id: string;
  name: string;
  command: string;
  category: string;
  description: string;
  enabled: boolean;
  runs: number;
  skillMd: string;
};

export const categories = [
  "Intake & Conflicts",
  "Term Sheets & Structure",
  "Drafting",
  "Markup & Negotiation",
  "Diligence & Closing",
  "Practice Development",
];

export const skills: Skill[] = [
  {
    id: "conflicts-check",
    name: "Conflicts Check",
    command: "/conflicts-check",
    category: "Intake & Conflicts",
    description: "Sweeps parties and related entities against the firm's conflicts index.",
    enabled: true,
    runs: 41,
    skillMd: `# Conflicts Check

## Purpose
Clear a new deal against current and former clients.

## Context used
- firm/conflicts-index.md
- deals/*/parties.md`,
  },
  {
    id: "engagement-letter",
    name: "Engagement Letter",
    command: "/engagement-letter",
    category: "Intake & Conflicts",
    description: "Drafts the engagement letter from deal scope and firm standard terms.",
    enabled: true,
    runs: 19,
    skillMd: `# Engagement Letter

## Purpose
Draft an engagement letter in firm voice.

## Context used
- clients/<client>.md
- firm/standard-terms.md`,
  },
  {
    id: "term-sheet",
    name: "Term Sheet",
    command: "/term-sheet",
    category: "Term Sheets & Structure",
    description: "Turns agreed business terms into a term sheet with market-standard conditions.",
    enabled: true,
    runs: 24,
    skillMd: `# Term Sheet

## Purpose
Draft a term sheet from the agreed commercial terms.

## Context used
- deals/<deal>/terms.md
- positions/ (firm standard asks)`,
  },
  {
    id: "structure-memo",
    name: "Structure Memo",
    command: "/structure-memo",
    category: "Term Sheets & Structure",
    description: "Compares deal structures with tax and consent implications.",
    enabled: false,
    runs: 9,
    skillMd: `# Structure Memo

## Purpose
Compare candidate structures for the same commercial deal.`,
  },
  {
    id: "agreement-draft",
    name: "Agreement Draft",
    command: "/agreement-draft",
    category: "Drafting",
    description:
      "Drafts from the precedent bank, adapted to the term sheet, defined-terms checked.",
    enabled: true,
    runs: 44,
    skillMd: `# Agreement Draft

## Purpose
Draft the main agreement grounded in your terms and precedents.

## Steps
1. Select nearest executed precedent from precedents/
2. Adapt to deals/<deal>/terms.md
3. Check defined terms and cross-references
4. Run reviewer agents (Partner, Counterparty, Tax)
5. Save to deals/<deal>/drafts/`,
  },
  {
    id: "ancillaries",
    name: "Ancillaries",
    command: "/ancillaries",
    category: "Drafting",
    description: "Generates the ancillary document set from the main agreement.",
    enabled: true,
    runs: 18,
    skillMd: `# Ancillaries

## Purpose
Produce disclosure schedules, resolutions and closing certificates.`,
  },
  {
    id: "markup-review",
    name: "Markup Review",
    command: "/markup-review",
    category: "Markup & Negotiation",
    description:
      "Classifies every change in a counterparty redline against positions.md and drafts responses.",
    enabled: true,
    runs: 36,
    skillMd: `# Markup Review

## Purpose
Analyze a counterparty redline against your positions.

## Steps
1. Diff against the last turn
2. Classify each change: accept / trade / fight
3. Check against positions/ and precedent history
4. Draft the response plan`,
  },
  {
    id: "position-tracker",
    name: "Position Tracker",
    command: "/position-tracker",
    category: "Markup & Negotiation",
    description: "Logs every concession and trade: who, when, and what we got back.",
    enabled: true,
    runs: 21,
    skillMd: `# Position Tracker

## Purpose
Keep a history of positions so trades stay deliberate.`,
  },
  {
    id: "dd-redflags",
    name: "DD Red Flags",
    command: "/dd-redflags",
    category: "Diligence & Closing",
    description: "Sweeps data-room documents for red flags against the diligence checklist.",
    enabled: true,
    runs: 15,
    skillMd: `# DD Red Flags

## Purpose
Surface consent requirements, change-of-control triggers, odd terms.`,
  },
  {
    id: "closing-checklist",
    name: "Closing Checklist",
    command: "/closing-checklist",
    category: "Diligence & Closing",
    description: "Builds and tracks conditions precedent, signatures and funds flow.",
    enabled: false,
    runs: 12,
    skillMd: `# Closing Checklist

## Purpose
One list from signing to funds flow, with owners and status.`,
  },
  {
    id: "client-alert",
    name: "Client Alert Writer",
    command: "/client-alert",
    category: "Practice Development",
    description: "Turns a market shift or ruling into a client alert in your voice.",
    enabled: true,
    runs: 13,
    skillMd: `# Client Alert Writer

## Purpose
Draft a client alert from market terms or a new ruling.

## Context used
- profile.md (your voice)
- Confidentiality screen before anything leaves the machine`,
  },
  {
    id: "deal-points-study",
    name: "Deal Points Study",
    command: "/deal-points-study",
    category: "Practice Development",
    description: "Anonymized market-terms study built from your own executed deals.",
    enabled: false,
    runs: 5,
    skillMd: `# Deal Points Study

## Purpose
Answer "what's market?" from your own precedent bank, anonymized.`,
  },
];

export const workflows = [
  { id: "w1", name: "New deal", steps: "conflicts-check → engagement-letter → deal scaffold", runs: 8 },
  { id: "w2", name: "Draft cycle", steps: "agreement-draft → ancillaries → internal review", runs: 15 },
  { id: "w3", name: "Markup cycle", steps: "markup-review → position-tracker → response redline", runs: 19 },
  { id: "w4", name: "Path to close", steps: "dd-redflags → closing-checklist → funds flow", runs: 6 },
];

export const reviewerAgents = ["Partner", "Counterparty", "Tax", "Client", "Devil's Advocate"];
