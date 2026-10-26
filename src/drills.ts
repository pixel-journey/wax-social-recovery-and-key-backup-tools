/** Offline recovery drills — practice on throwaway accounts. */

export interface DrillStep {
  id: string;
  title: string;
  detail: string;
  requiresLiveChain: boolean;
}

export const RECOVERY_DRILLS: DrillStep[] = [
  {
    id: "create-throwaway",
    title: "Create a throwaway account",
    detail: "Use a low-value .wam you can abandon. Never drill on the main treasury.",
    requiresLiveChain: true,
  },
  {
    id: "backup-export",
    title: "Export / write offline material",
    detail: "Paper or hardware-backed owner material only — never into a random website form.",
    requiresLiveChain: false,
  },
  {
    id: "restore-active",
    title: "Simulate active-key loss",
    detail: "From owner, update active to a new key; confirm explorer matches; revoke old active.",
    requiresLiveChain: true,
  },
  {
    id: "msig-or-weights",
    title: "Exercise M-of-N path",
    detail:
      "Either (a) multi-key/account-auth owner threshold or (b) eosio.msig propose→approve→exec an updateauth.",
    requiresLiveChain: true,
  },
  {
    id: "time-runbook",
    title: "Time the full runbook",
    detail: "Note ambiguous steps; update offline docs until a second person can follow them.",
    requiresLiveChain: false,
  },
  {
    id: "session-keys",
    title: "Optional: limited dApp permission",
    detail:
      "Install a gameplay/session permission with linkauth so daily dApps never need owner (session-keys blueprint).",
    requiresLiveChain: true,
  },
];

export function drillChecklistMarkdown(): string {
  const lines = [
    "# Recovery drill checklist",
    "",
    "Practice on a **throwaway** account only.",
    "",
    ...RECOVERY_DRILLS.map(
      (d) =>
        `- [ ] **${d.title}**${d.requiresLiveChain ? " _(chain)_" : ""} — ${d.detail}`
    ),
    "",
    "Sign authority changes with **WharfKit** (Anchor), not eosjs greenfield.",
  ];
  return lines.join("\n");
}
