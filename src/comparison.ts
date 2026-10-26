/** Side-by-side recovery approach comparison (education). */

export type ApproachId =
  | "cloud-only"
  | "paper-solo"
  | "hardware"
  | "account-auth"
  | "eosio-msig";

export interface ApproachRow {
  id: ApproachId;
  name: string;
  survivesVendorExit: "yes" | "partial" | "no";
  multiParty: "yes" | "no" | "optional";
  seedSharingRequired: "yes" | "no";
  complexity: "low" | "medium" | "high";
  note: string;
}

export const APPROACH_MATRIX: ApproachRow[] = [
  {
    id: "cloud-only",
    name: "Cloud Wallet only",
    survivesVendorExit: "no",
    multiParty: "no",
    seedSharingRequired: "no",
    complexity: "low",
    note: "Convenient product path; not a full on-chain design.",
  },
  {
    id: "paper-solo",
    name: "Paper / offline solo",
    survivesVendorExit: "yes",
    multiParty: "no",
    seedSharingRequired: "no",
    complexity: "low",
    note: "You must not lose all copies; drill restore.",
  },
  {
    id: "hardware",
    name: "Hardware owner",
    survivesVendorExit: "yes",
    multiParty: "optional",
    seedSharingRequired: "no",
    complexity: "medium",
    note: "Strong isolation; still single-party unless weights added.",
  },
  {
    id: "account-auth",
    name: "Account-auth M-of-N",
    survivesVendorExit: "yes",
    multiParty: "yes",
    seedSharingRequired: "no",
    complexity: "medium",
    note: "Preferred social pattern in this repo.",
  },
  {
    id: "eosio-msig",
    name: "eosio.msig proposals",
    survivesVendorExit: "yes",
    multiParty: "yes",
    seedSharingRequired: "no",
    complexity: "high",
    note: "Explicit audit trail; drill propose/approve/exec.",
  },
];
