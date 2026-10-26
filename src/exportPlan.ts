import { analyzeSocialRecovery, scoreBackupPosture } from "./engines";
import type { BackupPosture, SocialRecoveryPolicy } from "./types";

export function exportPlanJson(
  account: string,
  posture: BackupPosture,
  policy: SocialRecoveryPolicy
): string {
  const score = scoreBackupPosture(posture);
  const risks = analyzeSocialRecovery(policy);
  return JSON.stringify(
    {
      kind: "pxj-social-recovery-plan",
      version: 1,
      account,
      posture,
      policy,
      score,
      risks,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}
