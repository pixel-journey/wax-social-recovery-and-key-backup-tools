/** Educational models of how recovery authority is expressed on Antelope. */

export type AuthorityModelId =
  | "single-key"
  | "multi-key"
  | "account-auth"
  | "eosio-msig"
  | "hybrid";

export interface AuthorityModel {
  id: AuthorityModelId;
  title: string;
  summary: string;
  whenToUse: string;
  risks: string[];
  exampleShape: string;
}

export const AUTHORITY_MODELS: AuthorityModel[] = [
  {
    id: "single-key",
    title: "Single key on owner",
    summary: "One public key meets owner threshold alone.",
    whenToUse: "Solo users with strong offline backup + optional hardware.",
    risks: [
      "Lost key without backup = lost account",
      "Stolen key = full account takeover",
    ],
    exampleShape: "owner: threshold 1 · keys: [{ key: PUB_K1_…, weight: 1 }]",
  },
  {
    id: "multi-key",
    title: "Multi-key owner (weights on keys)",
    summary: "Several keys with weights; threshold requires combination.",
    whenToUse: "You control multiple devices/keys (phone + hardware + paper-derived).",
    risks: [
      "Poor weight design (1-of-N) is still single-key risk",
      "Must track which physical device holds which key",
    ],
    exampleShape:
      "owner: threshold 2 · keys: [hw w=1, paper-derived w=1, hot-backup w=1]",
  },
  {
    id: "account-auth",
    title: "Account authorities (friends on owner)",
    summary:
      "Other accounts’ permissions (e.g. friend@active) appear in your owner auth with weights.",
    whenToUse: "True social recovery without sharing seeds — preferred pattern in this repo.",
    risks: [
      "Helpers’ own active keys must stay healthy",
      "Collusion of M helpers can change your owner",
      "Helpers must understand they are co-signers",
    ],
    exampleShape:
      "owner: threshold 2 · accounts: [bob@active w=1, carol@active w=1, dave@active w=1]",
  },
  {
    id: "eosio-msig",
    title: "eosio.msig propose / approve / exec",
    summary:
      "Recovery actions are packed transactions proposed under msig; approvers add weight until exec.",
    whenToUse: "DAOs, treasuries, or when you want an explicit proposal trail.",
    risks: [
      "Proposals can expire; process must be drilled",
      "Still need correct underlying account permissions",
    ],
    exampleShape:
      "See wax-multi-sig-proposal-builder-and-simulator — propose updateauth under msig.",
  },
  {
    id: "hybrid",
    title: "Hybrid: your key + helpers",
    summary: "You keep weight 1; helpers add weights; threshold 2+ so you alone or helpers together can recover.",
    whenToUse: "Personal accounts that want self-service *or* social path.",
    risks: [
      "If your key weight ≥ threshold, helpers never needed (and single-key risk remains)",
      "Document intended paths clearly in the runbook",
    ],
    exampleShape:
      "owner: threshold 2 · keys: [you w=1] · accounts: [bob@active w=1, carol@active w=1]",
  },
];

export const WHARFKIT_RECOVERY_NOTES = [
  "Prefer @wharfkit/session + Anchor (or Cloud Wallet) for any live updateauth.",
  "Avoid eosjs / UAL / standalone Anchor Link for greenfield authority changes.",
  "Preview the full auth JSON before device confirm — blind-signing owner changes is catastrophic.",
  "Practice on a throwaway .wam account before touching production owner.",
  "This educational app does not broadcast authority changes; use multi-sig / hardware blueprints for live flows.",
] as const;
