/**
 * Types for educational backup & social recovery checklists.
 */

export interface BackupPosture {
  /** Independent offline copies of seed/key material */
  offlineCopies: number;
  /** User has successfully restored on a test path */
  restoreDrilled: boolean;
  /** Owner key is not the same daily hot key */
  ownerSeparatedFromDaily: boolean;
  /** Written steps exist outside a single website */
  writtenRunbook: boolean;
}

export interface SocialRecoveryPolicy {
  helperCount: number;
  threshold: number;
  /** Helpers hold full seeds (anti-pattern if true) */
  helpersHoldFullSeeds: boolean;
  /** Uses multi-sig / weighted perms instead of seed sharing */
  usesMultisigWeights: boolean;
}

export type RiskLevel = "low" | "medium" | "high";

export interface RecoveryRisk {
  id: string;
  level: RiskLevel;
  title: string;
  detail: string;
  trigger: string;
}

export interface ChecklistItem {
  id: string;
  passed: boolean;
  label: string;
  detail: string;
}

export interface BackupScore {
  score: number;
  items: ChecklistItem[];
}
