/**
 * Worked educational examples for backup + social recovery on Antelope/WAX.
 */

import type { BackupPosture, SocialRecoveryPolicy } from "./types";

export type ScenarioId =
  | "solo-paper"
  | "hw-plus-paper"
  | "2-of-3-friends"
  | "family-anti-pattern"
  | "dao-treasury-style"
  | "lost-phone-active"
  | "inheritance-2-of-3"
  | "exchange-hot-cold";

export interface ScenarioExample {
  id: ScenarioId;
  title: string;
  summary: string;
  posture: BackupPosture;
  policy: SocialRecoveryPolicy;
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
      "owner = single cold key. active = hot key for daily. No second party can recover owner.",
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
      "owner keys[0] = hardware pubkey. active = separate software key.",
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
      "owner auth: threshold 2; accounts: friend1@active w=1, friend2@active w=1, friend3@active w=1.",
    warnings: [
      "Collusion of any 2 helpers can change owner",
      "Document who signs if using eosio.msig",
    ],
  },
  {
    id: "family-anti-pattern",
    title: "Anti-pattern: one relative has the seed",
    summary:
      "Common failure: seed shared with one family member who can act alone.",
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
      "Effectively single key / single helper with full control — shared custody, not multi-party security.",
    warnings: [
      "High risk: helperCount 1 + threshold 1",
      "High risk: helpersHoldFullSeeds",
    ],
  },
  {
    id: "dao-treasury-style",
    title: "Small treasury: 3-of-5",
    summary:
      "Ops team accounts as weighted owner. Daily spends on active or spending permission.",
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
      "owner threshold 3 among 5 council accounts; active for routine transfers.",
    warnings: [
      "Quorum availability can block recovery",
      "Pair with multi-sig blueprint",
    ],
  },
  {
    id: "lost-phone-active",
    title: "Incident: phone (active) lost",
    summary:
      "Owner still safe offline. Policy focuses on remediation speed, not social owner yet.",
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
      "From owner: updateauth active → new key; revoke old; rotate session permissions.",
    warnings: [
      "If owner was on the same phone, this becomes an owner-loss incident",
      "Drill this path before it is real",
    ],
  },
  {
    id: "inheritance-2-of-3",
    title: "Inheritance-style 2-of-3",
    summary:
      "You + lawyer/executor account + family account; threshold 2. Legal process is off-chain; weights are on-chain.",
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
      "owner: you@key w=1, executor@active w=1, family@active w=1; threshold 2. Not legal advice.",
    warnings: [
      "On-chain design ≠ estate law — coordinate with counsel offline",
      "Executor must understand Antelope signing",
    ],
  },
  {
    id: "exchange-hot-cold",
    title: "Project: hot ops + cold owner",
    summary:
      "Hot active for bots/ops; cold multi-sig owner for upgrades and rescues.",
    posture: {
      offlineCopies: 3,
      restoreDrilled: true,
      ownerSeparatedFromDaily: true,
      writtenRunbook: true,
    },
    policy: {
      helperCount: 4,
      threshold: 3,
      helpersHoldFullSeeds: false,
      usesMultisigWeights: true,
    },
    onChainShape:
      "active: ops keys; owner: 3-of-4 core team account-auth or msig for updateauth.",
    warnings: [
      "Hot key compromise should not imply owner compromise",
      "Document who holds each owner weight",
    ],
  },
];

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
    note: "Requires current owner to sign. Test on throwaway. Prefer WharfKit.",
  };
}

export const CLOUD_WALLET_NOTE = `
Cloud Wallet product recovery only restores keys that product controls.
It does not redesign on-chain owner weights. Treat it as one backup path, never the only one.
`.trim();
