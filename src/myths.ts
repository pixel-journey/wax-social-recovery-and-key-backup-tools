/** Common misconceptions — educational Q&A. */

export interface Myth {
  id: string;
  claim: string;
  reality: string;
}

export const RECOVERY_MYTHS: Myth[] = [
  {
    id: "cloud-is-enough",
    claim: "Cloud Wallet recovery is enough for my WAX account.",
    reality:
      "It only covers keys that product controls. On-chain owner can still be a different key. Keep independent offline owner material and/or multi-party weights.",
  },
  {
    id: "email-seed",
    claim: "Social recovery means emailing my seed to three friends.",
    reality:
      "That multiplies theft and coercion risk. Prefer account-auth weights or multi-key thresholds so no single helper holds full control alone.",
  },
  {
    id: "active-fixes-owner",
    claim: "If I lose owner, I can fix it with active.",
    reality:
      "Active cannot replace owner. Only owner (or a pre-arranged multi-party owner path) can change owner.",
  },
  {
    id: "msig-only",
    claim: "I must use eosio.msig for any recovery design.",
    reality:
      "msig is excellent for explicit proposals. Weighted keys or account authorities on owner are also valid social/multi-party designs.",
  },
  {
    id: "one-helper",
    claim: "One trusted person as recovery is fine.",
    reality:
      "Threshold 1 with one helper is shared custody, not multi-party security. Aim for M≥2 independent weights.",
  },
  {
    id: "website-runbook",
    claim: "A good website FAQ is my recovery plan.",
    reality:
      "If that domain dies, so does the plan (PX §11). Keep offline/git runbooks.",
  },
  {
    id: "paper-unsafe",
    claim: "Paper wallets are obsolete; only apps matter.",
    reality:
      "Offline copies still matter. Paper is one medium; hardware + tested restore is the goal, not app lock-in.",
  },
];
