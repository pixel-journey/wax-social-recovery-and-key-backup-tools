/**
 * Pure educational engines for backup posture and social recovery risks.
 */

import type {
  BackupPosture,
  BackupScore,
  ChecklistItem,
  RecoveryRisk,
  SocialRecoveryPolicy,
} from "./types";

export function scoreBackupPosture(posture: BackupPosture): BackupScore {
  const items: ChecklistItem[] = [
    {
      id: "copies",
      passed: posture.offlineCopies >= 2,
      label: "At least two independent offline copies",
      detail:
        posture.offlineCopies >= 2
          ? `${posture.offlineCopies} copies reported`
          : "Single or zero offline copies — device loss is existential",
    },
    {
      id: "drill",
      passed: posture.restoreDrilled,
      label: "Restore drill completed",
      detail: posture.restoreDrilled
        ? "User has practiced restore on a safe path"
        : "Untested backups fail when it matters",
    },
    {
      id: "owner-split",
      passed: posture.ownerSeparatedFromDaily,
      label: "Owner separated from daily active key",
      detail: posture.ownerSeparatedFromDaily
        ? "Owner not used for routine signing"
        : "Daily key is also owner — malware/phishing impact is maximal",
    },
    {
      id: "runbook",
      passed: posture.writtenRunbook,
      label: "Written recovery runbook (not only a website)",
      detail: posture.writtenRunbook
        ? "Steps exist outside a single domain"
        : "If the only instructions live on one site, continuity is weak (PX §11)",
    },
  ];

  const passed = items.filter((i) => i.passed).length;
  const score = Math.round((passed / items.length) * 100);
  return { score, items };
}

export function analyzeSocialRecovery(
  policy: SocialRecoveryPolicy
): RecoveryRisk[] {
  const risks: RecoveryRisk[] = [];

  if (policy.helperCount < 2) {
    risks.push({
      id: "few-helpers",
      level: "high",
      title: "Too few helpers",
      detail: "Social recovery with fewer than two independent helpers is fragile.",
      trigger: "helperCount",
    });
  }

  if (policy.threshold < 2) {
    risks.push({
      id: "threshold-1",
      level: "high",
      title: "Threshold below 2",
      detail: "Any single helper can complete recovery — that is not multi-party security.",
      trigger: "threshold",
    });
  }

  if (policy.threshold > policy.helperCount && policy.helperCount > 0) {
    risks.push({
      id: "impossible",
      level: "high",
      title: "Impossible threshold",
      detail: `Threshold ${policy.threshold} exceeds helper count ${policy.helperCount}.`,
      trigger: "threshold",
    });
  }

  if (policy.helpersHoldFullSeeds) {
    risks.push({
      id: "seed-sharing",
      level: "high",
      title: "Helpers hold full seeds",
      detail:
        "Sharing complete seeds multiplies theft and social-engineering risk. Prefer weighted multi-sig.",
      trigger: "helpersHoldFullSeeds",
    });
  }

  if (!policy.usesMultisigWeights && policy.helperCount > 0) {
    risks.push({
      id: "no-msig",
      level: "medium",
      title: "No multi-sig weight design",
      detail:
        "Document how helpers actually authorize recovery on-chain (msig / permissions).",
      trigger: "usesMultisigWeights",
    });
  }

  if (
    policy.helperCount >= 3 &&
    policy.threshold >= 2 &&
    policy.threshold <= policy.helperCount &&
    !policy.helpersHoldFullSeeds &&
    policy.usesMultisigWeights
  ) {
    risks.push({
      id: "balanced",
      level: "low",
      title: "Policy looks structurally balanced",
      detail:
        "Under these inputs, threshold and helper design avoid the worst anti-patterns. Residual collusion risk remains.",
      trigger: "overall",
    });
  }

  if (risks.length === 0) {
    risks.push({
      id: "review",
      level: "medium",
      title: "Needs explicit policy review",
      detail: "Provide helper count, threshold, and whether seeds are shared.",
      trigger: "overall",
    });
  }

  return risks;
}
