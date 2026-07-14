// Mock data. Skill categories come from the PM OS Architecture map:
// discovery & user research, strategy, prioritization, PRDs/specs, roadmapping.
// Reviewer agents come from the mySecond.ai research doc (CTO / UX / Sales / Exec / Devil's Advocate).
// Individual skill names and SKILL.md contents are illustrative (invented for the prototype).

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
  "Discovery & User Research",
  "Strategy",
  "Prioritization",
  "PRDs / Specs",
  "Roadmapping",
  "Personal Branding",
];

export const skills: Skill[] = [
  {
    id: "interview-synthesizer",
    name: "Interview Synthesizer",
    command: "/interview-synthesizer",
    category: "Discovery & User Research",
    description:
      "Turns raw interview transcripts into themes, quotes and opportunity statements.",
    enabled: true,
    runs: 34,
    skillMd: `# Interview Synthesizer

## Purpose
Synthesize user interview transcripts into structured insights.

## Context used
- context/personas.md
- context/product.md

## Steps
1. Read transcript from discovery/inputs/
2. Extract pains, gains, quotes
3. Cluster into themes
4. Output opportunity statements with evidence links`,
  },
  {
    id: "survey-analyzer",
    name: "Survey Analyzer",
    command: "/survey-analyzer",
    category: "Discovery & User Research",
    description: "Summarizes survey exports into segments, sentiment and top requests.",
    enabled: true,
    runs: 12,
    skillMd: `# Survey Analyzer

## Purpose
Analyze survey CSV exports and produce a readable insights brief.

## Steps
1. Load CSV from discovery/inputs/
2. Segment by persona (context/personas.md)
3. Rank requests by frequency x severity`,
  },
  {
    id: "competitive-landscape",
    name: "Competitive Landscape",
    command: "/competitive-landscape",
    category: "Strategy",
    description: "Builds a positioning map from context/competitors.md plus fresh notes.",
    enabled: true,
    runs: 9,
    skillMd: `# Competitive Landscape

## Purpose
Generate a competitor positioning brief.

## Context used
- context/competitors.md
- context/goals.md`,
  },
  {
    id: "strategy-review",
    name: "Strategy Reviewer",
    command: "/strategy-review",
    category: "Strategy",
    description:
      "Stress-tests a strategy doc with reviewer agents: CTO, UX, Sales, Exec, Devil's Advocate.",
    enabled: false,
    runs: 4,
    skillMd: `# Strategy Reviewer

## Purpose
Multi-agent review of a strategy document.

## Agents
- CTO, UX, Sales, Exec, Devil's Advocate`,
  },
  {
    id: "rice-prioritizer",
    name: "RICE Prioritizer",
    command: "/rice-prioritizer",
    category: "Prioritization",
    description: "Scores a backlog with RICE using goals and capacity from context files.",
    enabled: true,
    runs: 21,
    skillMd: `# RICE Prioritizer

## Purpose
Score backlog items (Reach, Impact, Confidence, Effort).

## Context used
- context/goals.md`,
  },
  {
    id: "tradeoff-memo",
    name: "Tradeoff Memo",
    command: "/tradeoff-memo",
    category: "Prioritization",
    description: "Writes a decision memo comparing two roadmap options with risks.",
    enabled: true,
    runs: 7,
    skillMd: `# Tradeoff Memo

## Purpose
Produce a one-page decision memo for a roadmap tradeoff.`,
  },
  {
    id: "prd-generator",
    name: "PRD Generator",
    command: "/prd-generator",
    category: "PRDs / Specs",
    description:
      "Drafts a full PRD from a one-line idea, asking 3 to 5 clarifying questions first.",
    enabled: true,
    runs: 48,
    skillMd: `# PRD Generator

## Purpose
Draft a PRD in the team's voice.

## Steps
1. Ask 3-5 clarifying questions
2. Read context/ (company, product, personas, goals)
3. Draft PRD sections
4. Run reviewer agents (CTO, UX, Devil's Advocate)
5. Save to workflows/outputs/`,
  },
  {
    id: "spec-reviewer",
    name: "Spec Reviewer",
    command: "/spec-reviewer",
    category: "PRDs / Specs",
    description: "Reviews an existing spec for gaps, edge cases and missing metrics.",
    enabled: true,
    runs: 15,
    skillMd: `# Spec Reviewer

## Purpose
Critique a spec and list gaps with severity.`,
  },
  {
    id: "roadmap-builder",
    name: "Roadmap Builder",
    command: "/roadmap-builder",
    category: "Roadmapping",
    description: "Assembles a quarter roadmap from prioritized items and goals.",
    enabled: true,
    runs: 11,
    skillMd: `# Roadmap Builder

## Purpose
Build a now / next / later roadmap tied to goals.`,
  },
  {
    id: "stakeholder-update",
    name: "Stakeholder Update",
    command: "/stakeholder-update",
    category: "Roadmapping",
    description: "Writes the weekly stakeholder update from recent activity.",
    enabled: false,
    runs: 26,
    skillMd: `# Stakeholder Update

## Purpose
Draft the weekly update in the team's voice.`,
  },
  {
    id: "linkedin-post",
    name: "LinkedIn Post Writer",
    command: "/linkedin-post",
    category: "Personal Branding",
    description:
      "Turns a shipped feature or insight into a LinkedIn post in your voice.",
    enabled: true,
    runs: 18,
    skillMd: `# LinkedIn Post Writer

## Purpose
Draft a LinkedIn post from a win, insight or launch.

## Context used
- context/profile.md (your voice)`,
  },
  {
    id: "audience-planner",
    name: "Audience Planner",
    command: "/audience-planner",
    category: "Personal Branding",
    description: "Plans a 4-week posting cadence around your product themes.",
    enabled: false,
    runs: 3,
    skillMd: `# Audience Planner

## Purpose
Plan a month of content themes.`,
  },
];

export const workflows = [
  { id: "w1", name: "Discovery sprint", steps: "interview-synthesizer → survey-analyzer → opportunity brief", runs: 6 },
  { id: "w2", name: "Spec pipeline", steps: "prd-generator → spec-reviewer → ticket draft", runs: 14 },
  { id: "w3", name: "Quarterly planning", steps: "rice-prioritizer → tradeoff-memo → roadmap-builder", runs: 3 },
  { id: "w4", name: "Launch comms", steps: "stakeholder-update → linkedin-post", runs: 9 },
];

export const reviewerAgents = ["CTO", "UX", "Sales", "Exec", "Devil's Advocate"];
