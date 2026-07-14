// Phase 3 mock data — Law OS Litigation edition: one lawyer to the whole
// practice group. Privilege walls follow the per-source permission model.
// Names and numbers are mock values.

export const members = [
  { name: "R. Calloway", role: "Partner, Litigation", brain: "Personal + Firm", skillsRun: 214, initials: "RC" },
  { name: "A. Osei", role: "Senior Associate", brain: "Personal + Firm", skillsRun: 178, initials: "AO" },
  { name: "M. Duval", role: "Associate", brain: "Personal + Firm", skillsRun: 141, initials: "MD" },
  { name: "S. Novak", role: "Associate", brain: "Personal", skillsRun: 96, initials: "SN" },
  { name: "T. Iwu", role: "Paralegal", brain: "Firm (read)", skillsRun: 54, initials: "TI" },
  { name: "J. Barnes", role: "Of Counsel", brain: "Invited", skillsRun: 0, initials: "JB" },
];

export const sources = [
  { name: "Personal notes", scope: "Private to each lawyer", access: "read / write", tone: "violet" },
  { name: "Firm know-how", scope: "Shared with practice group", access: "read / write", tone: "cyan" },
  { name: "Matter files · Meridian", scope: "Matter team only", access: "read / write", tone: "cyan" },
  { name: "Matter files · Project Swan", scope: "Ethical wall — restricted", access: "no access", tone: "amber" },
  { name: "Client files", scope: "Responsible partner only", access: "read only", tone: "amber" },
];

export const sharedKnowledge = [
  { q: "Who has run a §4.2 notice argument before?", a: "Calloway briefed it in Harmon v. TDX (2024); the memo and the court's reaction are linked." },
  { q: "What's our standard protective-order position?", a: "Two-tier confidentiality; attorneys'-eyes-only reserved for source code. Redline history linked." },
  { q: "What did we learn from the Brennan trial?", a: "Three lessons logged: jury pushback on the damages model, this judge's motion practice, witness-prep gaps." },
];

export const impactStats = [
  { label: "Active lawyers", value: "5 / 6", hint: "weekly" },
  { label: "Skills run", value: "683", hint: "this quarter" },
  { label: "Documents produced", value: "127", hint: "memos, motions, letters" },
  { label: "Questions answered by Brain", value: "312", hint: "with record cites" },
];

export const adoption = [12, 18, 25, 31, 42, 55, 61, 74, 82, 90, 97, 108];

export const loopTeaser = [
  "Nightly maintenance: dedupe, re-link matter memory",
  "Skills improve from partner feedback on drafts",
  "Deadlines update themselves from fresh docket entries",
];
