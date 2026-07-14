// Mock data — Law OS Litigation edition. Structure mirrors PM OS; every firm,
// matter, person and number below is fictional demo content.

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
  "Research & Memos",
  "Drafting",
  "Discovery & Depositions",
  "Hearings & Trial",
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
Clear a new matter against current and former clients.

## Context used
- firm/conflicts-index.md
- matters/*/parties.md

## Steps
1. Extract parties, affiliates, related entities
2. Sweep the conflicts index
3. Flag near-matches for partner review`,
  },
  {
    id: "engagement-letter",
    name: "Engagement Letter",
    command: "/engagement-letter",
    category: "Intake & Conflicts",
    description: "Drafts the engagement letter from matter scope and firm standard terms.",
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
    id: "research-memo",
    name: "Research Memo",
    command: "/research-memo",
    category: "Research & Memos",
    description:
      "Frames the issue, finds authorities, checks their treatment, writes an IRAC memo.",
    enabled: true,
    runs: 52,
    skillMd: `# Research Memo

## Purpose
Answer a legal question with cited authorities.

## Context used
- matters/<matter>/facts.md
- authorities/

## Steps
1. Frame the issue from the record
2. Find controlling authorities
3. Check treatment (followed / distinguished / overruled)
4. Write IRAC memo with pin cites`,
  },
  {
    id: "treatment-check",
    name: "Treatment Check",
    command: "/treatment-check",
    category: "Research & Memos",
    description: "Checks how later courts treated every case you rely on.",
    enabled: true,
    runs: 27,
    skillMd: `# Treatment Check

## Purpose
Verify every cited case is still good law.`,
  },
  {
    id: "motion-draft",
    name: "Motion Draft",
    command: "/motion-draft",
    category: "Drafting",
    description:
      "Drafts a motion from the precedent bank, adapted to the record, cite-checked.",
    enabled: true,
    runs: 38,
    skillMd: `# Motion Draft

## Purpose
Draft a motion grounded in the record.

## Steps
1. Select nearest precedent from precedents/
2. Adapt to matters/<matter>/facts.md + theory.md
3. Cite-check against authorities/
4. Run reviewer agents (Partner, Opposing Counsel, Ethics & Privilege)
5. Save to matters/<matter>/drafts/`,
  },
  {
    id: "brief-polish",
    name: "Brief Polish",
    command: "/brief-polish",
    category: "Drafting",
    description: "Tightens a brief: argument order, signposting, record cites.",
    enabled: true,
    runs: 16,
    skillMd: `# Brief Polish

## Purpose
Edit pass for structure, signposting and cites.`,
  },
  {
    id: "depo-outline",
    name: "Deposition Outline",
    command: "/depo-outline",
    category: "Discovery & Depositions",
    description: "Builds a witness outline from admissions, exhibits and gaps in the record.",
    enabled: true,
    runs: 23,
    skillMd: `# Deposition Outline

## Purpose
Prepare a witness examination outline.

## Context used
- matters/<matter>/facts.md (admissions map)
- matters/<matter>/exhibits.md`,
  },
  {
    id: "discovery-requests",
    name: "Discovery Requests",
    command: "/discovery-requests",
    category: "Discovery & Depositions",
    description: "Drafts targeted requests from what the theory still needs to prove.",
    enabled: false,
    runs: 14,
    skillMd: `# Discovery Requests

## Purpose
Draft requests aimed at the gaps in your proof.`,
  },
  {
    id: "hearing-prep",
    name: "Hearing Prep",
    command: "/hearing-prep",
    category: "Hearings & Trial",
    description: "One-page bench brief: your asks, their likely moves, the judge's history.",
    enabled: true,
    runs: 11,
    skillMd: `# Hearing Prep

## Purpose
Brief yourself for a hearing in one page.`,
  },
  {
    id: "cross-planner",
    name: "Cross Planner",
    command: "/cross-planner",
    category: "Hearings & Trial",
    description: "Plans a cross-examination from prior statements and contradictions in the record.",
    enabled: false,
    runs: 8,
    skillMd: `# Cross Planner

## Purpose
Build a cross from contradictions the brain has already found.`,
  },
  {
    id: "client-alert",
    name: "Client Alert Writer",
    command: "/client-alert",
    category: "Practice Development",
    description: "Turns a new ruling into a client alert in your voice — confidentiality-checked.",
    enabled: true,
    runs: 13,
    skillMd: `# Client Alert Writer

## Purpose
Draft a client alert from a new ruling.

## Context used
- profile.md (your voice)
- Confidentiality screen before anything leaves the machine`,
  },
  {
    id: "speaking-abstract",
    name: "CLE Abstract",
    command: "/speaking-abstract",
    category: "Practice Development",
    description: "Drafts a CLE talk proposal from matters you can speak to, anonymized.",
    enabled: false,
    runs: 4,
    skillMd: `# CLE Abstract

## Purpose
Propose a talk from anonymized matter experience.`,
  },
];

export const workflows = [
  { id: "w1", name: "New matter", steps: "conflicts-check → engagement-letter → matter scaffold", runs: 9 },
  { id: "w2", name: "Research pipeline", steps: "research-memo → treatment-check → brief insert", runs: 17 },
  { id: "w3", name: "Motion practice", steps: "motion-draft → brief-polish → filing checklist", runs: 12 },
  { id: "w4", name: "Depo sprint", steps: "discovery-requests → depo-outline → cross-planner", runs: 7 },
];

export const reviewerAgents = ["Partner", "Opposing Counsel", "Ethics & Privilege", "Client", "Devil's Advocate"];
