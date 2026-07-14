// Phase 3 mock data: "Double Down on 2nd Brain" + "Expand from single PM to entire PM Org"
// (PM OS Phase-3 map). Per-source permission model grounded in GBrain Company Brain research
// (private / shared / read-only source scoping). Names and numbers are mock values.

export const members = [
  { name: "Ava Chen", role: "Group PM", brain: "Personal + Company", skillsRun: 214, initials: "AC" },
  { name: "Rohan Mehta", role: "Senior PM", brain: "Personal + Company", skillsRun: 178, initials: "RM" },
  { name: "Lena Fischer", role: "PM, Growth", brain: "Personal + Company", skillsRun: 141, initials: "LF" },
  { name: "Sam Torres", role: "PM, Platform", brain: "Personal", skillsRun: 96, initials: "ST" },
  { name: "Yuki Tanaka", role: "APM", brain: "Company (read)", skillsRun: 54, initials: "YT" },
  { name: "Dan Okafor", role: "PM, Mobile", brain: "Invited", skillsRun: 0, initials: "DO" },
];

export const sources = [
  { name: "Personal notes", scope: "Private to each PM", access: "read / write", tone: "violet" },
  { name: "Team wiki", scope: "Shared with PM org", access: "read / write", tone: "cyan" },
  { name: "Customer interviews", scope: "Shared with PM org", access: "read / write", tone: "cyan" },
  { name: "CRM notes", scope: "Federated from Sales", access: "read only", tone: "amber" },
  { name: "Exec strategy docs", scope: "Leads only", access: "read only", tone: "amber" },
];

export const sharedKnowledge = [
  { q: "Who knows about the Acme migration?", a: "Rohan (led discovery), Maya from Eng owns the risk log." },
  { q: "Have we tested usage-based pricing?", a: "Yes: Growth ran a 2-week test in March. Doc + verdict linked." },
  { q: "What did we learn from churned enterprise accounts?", a: "3 themes across 11 exit interviews: onboarding time, seat cost, missing SSO." },
];

export const impactStats = [
  { label: "Active PMs", value: "5 / 6", hint: "weekly" },
  { label: "Skills run", value: "683", hint: "this quarter" },
  { label: "Docs produced", value: "127", hint: "PRDs, briefs, updates" },
  { label: "Questions answered by Brain", value: "312", hint: "with cited sources" },
];

export const adoption = [12, 18, 25, 31, 42, 55, 61, 74, 82, 90, 97, 108];

export const loopTeaser = [
  "Nightly maintenance: dedupe, re-link, re-embed memory",
  "Skills improve from usage feedback",
  "Context files update themselves from fresh signals",
];
