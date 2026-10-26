/**
 * Worked educational examples for backup + social recovery on Antelope/WAX.
 * Sketches only — do not broadcast from this module.
 */

import type { BackupPosture, SocialRecoveryPolicy } from "./types";

export type ScenarioId =
  | "solo-paper"
  | "hw-plus-paper"
  | "2-of-3-friends"
  | "family-anti-pattern"
  | "dao-treasury-style";

export interface ScenarioExample {
  id: ScenarioId;
  title: string;
  summary: string;
  posture: BackupPosture;
  policy: SocialRecoveryPolicy;
  /** What "good" looks like on-chain in plain language */
  onChainShape: string;
  warnings: string[];
}

export const SCENARIO_CATALOG: ScenarioExample[] = [
  {
    id: "solo-paper",
    title: "Solo: paper + phone",
    summary:
      "One person, two offline copies, owner never on the phone. No social helpers yet.",
    posture: {
      offlineCopies: 2,
      restoreDrilled: true,
      ownerSeparatedFromDaily: true,
      writtenRunbook: true,
    },
    policy: {
      helperCount: 0,
      threshold: 1,
      helpersHoldFullSeeds: false,
      usesMultisigWeights: false,
    },
    onChainShape:
      "owner = single cold key (paper/hardware). active = hot key for daily. No second party can recover owner.",
    warnings: [
      "Device + both paper copies lost → account unrecoverable",
      "Add multi-party owner only after you understand threshold math",
    ],
  },
  {
    id: "hw-plus-paper",
    title: "Hardware + paper backup",
    summary:
      "Owner on Ledger (via Anchor); second offline seed; active hot. Best solo baseline.",
    posture: {
      offlineCopies: 2,
      restoreDrilled: true,
      ownerSeparatedFromDaily: true,
      writtenRunbook: true,
    },
    policy: {
      helperCount: 0,
      threshold: 1,
      helpersHoldFullSeeds: false,
      usesMultisigWeights: false,
    },
    onChainShape:
      "owner keys[0] = hardware pubkey. active = separate software key. See hardware-patterns blueprint.",
    warnings: [
      "Still single-party owner — social layer optional next",
      "Never type the seed into a website",
    ],
  },
  {
    id: "2-of-3-friends",
    title: "2-of-3 weighted friends",
    summary:
      "Three helper accounts on owner with weight 1, threshold 2. No full seeds shared.",
    posture: {
      offlineCopies: 2,
      restoreDrilled: true,
      ownerSeparatedFromDaily: true,
      writtenRunbook: true,
    },
    policy: {
      helperCount: 3,
      threshold: 2,
      helpersHoldFullSeeds: false,
      usesMultisigWeights: true,
    },
    onChainShape:
      "owner auth: threshold 2; accounts: friend1@active w=1, friend2@active w=1, friend3@active w=1 (or their keys). You may keep your own key with weight 1 as well.",
    warnings: [
      "Collusion of any 2 helpers can change owner",
      "Document who signs propose/approve if using eosio.msig instead",
    ],
  },
  {
    id: "family-anti-pattern",
    title: "Anti-pattern: one relative has the seed",
    summary:
      "Common failure: email or paper seed shared with one family member who can act alone.",
    posture: {
      offlineCopies: 1,
      restoreDrilled: false,
      ownerSeparatedFromDaily: false,
      writtenRunbook: false,
    },
    policy: {
      helperCount: 1,
      threshold: 1,
      helpersHoldFullSeeds: true,
      usesMultisigWeights: false,
    },
    onChainShape:
      "Effectively single key / single helper with full control — looks like recovery, behaves like shared custody.",
    warnings: [
      "High risk: helperCount 1 + threshold 1",
      "High risk: helpersHoldFullSeeds",
      "Prefer weights so one relative cannot move owner alone",
    ],
  },
  {
    id: "dao-treasury-style",
    title: "Small treasury: 3-of-5",
    summary:
      "Ops team accounts as weighted owner authorities. Daily spends on active or spending permission.",
    posture: {
      offlineCopies: 3,
      restoreDrilled: true,
      ownerSeparatedFromDaily: true,
      writtenRunbook: true,
    },
    policy: {
      helperCount: 5,
      threshold: 3,
      helpersHoldFullSeeds: false,
      usesMultisigWeights: true,
    },
    onChainShape:
      "owner threshold 3 among 5 council accounts; active used for routine transfers with lower risk keys. Multi-sig propose/approve/exec for owner changes.",
    warnings: [
      "Quorum availability (travel, burnout) can block recovery",
      "Pair with multi-sig blueprint for propose flows",
    ],
  },
];

/** Conceptual owner authority for a 2-of-3 account-auth design. */
export function sketchOwnerAuth2of3(helpers: [string, string, string]) {
  return {
    threshold: 2,
    keys: [] as Array<{ key: string; weight: number }>,
    accounts: helpers.map((actor) => ({
      permission: { actor, permission: "active" },
      weight: 1,
    })),
    waits: [] as unknown[],
  };
}

/** Educational updateauth data blob (not for blind broadcast). */
export function sketchUpdateOwnerFor2of3(
  account: string,
  helpers: [string, string, string]
) {
  return {
    account: "eosio",
    name: "updateauth",
    authorization: [{ actor: account, permission: "owner" }],
    data: {
      account,
      permission: "owner",
      parent: "",
      auth: sketchOwnerAuth2of3(helpers),
    },
    note: "Requires current owner to sign. Test on a throwaway account. Prefer WharfKit session.transact.",
  };
}

export const CLOUD_WALLET_NOTE = `
Cloud Wallet product recovery (email / device re-link) only restores keys that product controls.
It does not redesign on-chain owner weights. Treat it as one backup path, never the only one.
`.trim();
