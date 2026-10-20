import { describe, expect, it } from "vitest";
import { analyzeSocialRecovery, scoreBackupPosture } from "./engines";

describe("scoreBackupPosture", () => {
  it("scores perfect posture at 100", () => {
    const { score, items } = scoreBackupPosture({
      offlineCopies: 3,
      restoreDrilled: true,
      ownerSeparatedFromDaily: true,
      writtenRunbook: true,
    });
    expect(score).toBe(100);
    expect(items.every((i) => i.passed)).toBe(true);
  });

  it("flags weak single-copy undrilled setup", () => {
    const { score, items } = scoreBackupPosture({
      offlineCopies: 1,
      restoreDrilled: false,
      ownerSeparatedFromDaily: false,
      writtenRunbook: false,
    });
    expect(score).toBe(0);
    expect(items.find((i) => i.id === "copies")?.passed).toBe(false);
  });
});

describe("analyzeSocialRecovery", () => {
  it("flags threshold 1 as high risk", () => {
    const risks = analyzeSocialRecovery({
      helperCount: 3,
      threshold: 1,
      helpersHoldFullSeeds: false,
      usesMultisigWeights: true,
    });
    expect(risks.some((r) => r.id === "threshold-1" && r.level === "high")).toBe(
      true
    );
  });

  it("flags seed sharing as high", () => {
    const risks = analyzeSocialRecovery({
      helperCount: 3,
      threshold: 2,
      helpersHoldFullSeeds: true,
      usesMultisigWeights: true,
    });
    expect(risks.some((r) => r.id === "seed-sharing")).toBe(true);
  });

  it("emits balanced low risk for sound policy", () => {
    const risks = analyzeSocialRecovery({
      helperCount: 3,
      threshold: 2,
      helpersHoldFullSeeds: false,
      usesMultisigWeights: true,
    });
    expect(risks.some((r) => r.id === "balanced" && r.level === "low")).toBe(
      true
    );
  });

  it("detects impossible threshold", () => {
    const risks = analyzeSocialRecovery({
      helperCount: 2,
      threshold: 5,
      helpersHoldFullSeeds: false,
      usesMultisigWeights: true,
    });
    expect(risks.some((r) => r.id === "impossible")).toBe(true);
  });
});
