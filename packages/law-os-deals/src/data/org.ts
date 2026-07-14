// Phase 3 mock data — Law OS Deals edition: one lawyer to the whole practice
// group. Deal rooms stay walled; the positions playbook compounds firm-wide.
// Names and numbers are mock values.

export const members = [
  { name: "E. Whitmore", role: "Partner, M&A", brain: "Personal + Firm", skillsRun: 214, initials: "EW" },
  { name: "K. Aslan", role: "Senior Associate", brain: "Personal + Firm", skillsRun: 178, initials: "KA" },
  { name: "P. Mehta", role: "Associate", brain: "Personal + Firm", skillsRun: 141, initials: "PM" },
  { name: "L. Fontaine", role: "Associate", brain: "Personal", skillsRun: 96, initials: "LF" },
  { name: "D. Kim", role: "Paralegal", brain: "Firm (read)", skillsRun: 54, initials: "DK" },
  { name: "H. Osei", role: "Of Counsel", brain: "Invited", skillsRun: 0, initials: "HO" },
];

export const sources = [
  { name: "Personal notes", scope: "Private to each lawyer", access: "read / write", tone: "violet" },
  { name: "Positions playbook", scope: "Shared with practice group", access: "read / write", tone: "cyan" },
  { name: "Precedent bank · executed", scope: "Shared with practice group", access: "read / write", tone: "cyan" },
  { name: "Deal room · Project Basalt", scope: "Deal team only — walled", access: "no access", tone: "amber" },
  { name: "Client files", scope: "Responsible partner only", access: "read only", tone: "amber" },
];

export const sharedKnowledge = [
  { q: "What's market for earnout periods in software deals?", a: "Our last five: 18–36 months, median 24. The anonymized deal-points study is linked." },
  { q: "Who papered the Halcyon rollover?", a: "Whitmore structured it; Aslan drafted. Equity terms and the tax memo are linked." },
  { q: "Which clients accept 10% indemnity caps?", a: "Two repeat PE clients, both under signing pressure — pattern flagged with dates and the trades we got back." },
];

export const impactStats = [
  { label: "Active lawyers", value: "5 / 6", hint: "weekly" },
  { label: "Skills run", value: "590", hint: "this quarter" },
  { label: "Documents produced", value: "143", hint: "agreements, memos, checklists" },
  { label: "Questions answered by Brain", value: "276", hint: "cited to your deals" },
];

export const adoption = [10, 16, 22, 30, 39, 48, 57, 66, 78, 86, 95, 104];

export const loopTeaser = [
  "Nightly maintenance: dedupe, re-link deal memory",
  "Positions playbook updates from every executed deal",
  "Closing checklists learn from what actually slipped",
];
