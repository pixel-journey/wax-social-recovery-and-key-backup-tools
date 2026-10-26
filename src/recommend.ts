import { SCENARIO_CATALOG, type ScenarioExample } from "./examples";
import type { BackupPosture, SocialRecoveryPolicy } from "./types";

export type RecommendInput = {
  wantsSocial: boolean;
  hasHardware: boolean;
  isTeamOrDao: boolean;
  prioritizesInheritance: boolean;
};

export function recommendScenarios(input: RecommendInput): ScenarioExample[] {
  const scores = SCENARIO_CATALOG.map((s) => {
    let score = 0;
    if (input.isTeamOrDao && (s.id === "dao-treasury-style" || s.id === "exchange-hot-cold"))
      score += 5;
    if (input.prioritizesInheritance && s.id === "inheritance-2-of-3") score += 5;
    if (input.wantsSocial && s.policy.usesMultisigWeights && s.policy.threshold >= 2)
      score += 3;
    if (input.wantsSocial && s.id === "2-of-3-friends") score += 2;
    if (!input.wantsSocial && s.policy.helperCount === 0) score += 2;
    if (input.hasHardware && s.id === "hw-plus-paper") score += 4;
    if (!input.hasHardware && s.id === "solo-paper") score += 2;
    // Deprioritize pure anti-pattern unless nothing else
    if (s.id === "family-anti-pattern") score -= 10;
    return { s, score };
  });
  scores.sort((a, b) => b.score - a.score);
  return scores.filter((x) => x.score > 0).slice(0, 3).map((x) => x.s);
}

export function postureGaps(posture: BackupPosture): string[] {
  const g: string[] = [];
  if (posture.offlineCopies < 2) g.push("Add a second independent offline copy.");
  if (!posture.restoreDrilled) g.push("Run a restore drill on a throwaway account.");
  if (!posture.ownerSeparatedFromDaily)
    g.push("Move owner off the daily/hot key path.");
  if (!posture.writtenRunbook)
    g.push("Write recovery steps offline (git or paper), not only a website.");
  if (g.length === 0) g.push("Backup posture checks look solid under self-report.");
  return g;
}

export function policyGaps(policy: SocialRecoveryPolicy): string[] {
  const g: string[] = [];
  if (policy.helpersHoldFullSeeds)
    g.push("Stop full-seed sharing; move to weighted account-auth or multi-key.");
  if (policy.helperCount > 0 && policy.threshold < 2)
    g.push("Raise threshold to ≥ 2 so one helper cannot act alone.");
  if (policy.helperCount > 0 && !policy.usesMultisigWeights)
    g.push("Document on-chain weights (account-auth or msig), not informal trust only.");
  if (policy.threshold > policy.helperCount && policy.helperCount > 0)
    g.push("Fix impossible threshold > helper count.");
  if (g.length === 0 && policy.helperCount >= 3 && policy.threshold >= 2)
    g.push("Policy structure looks balanced; still model collusion.");
  if (g.length === 0 && policy.helperCount === 0)
    g.push("Solo design — ensure offline copies and drills are excellent.");
  return g;
}
