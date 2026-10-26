import { describe, expect, it } from "vitest";
import { policyGaps, recommendScenarios } from "./recommend";

describe("recommend", () => {
  it("suggests dao scenario for teams", () => {
    const r = recommendScenarios({
      wantsSocial: true,
      hasHardware: false,
      isTeamOrDao: true,
      prioritizesInheritance: false,
    });
    expect(r.some((s) => s.id === "dao-treasury-style")).toBe(true);
  });

  it("flags seed sharing", () => {
    const g = policyGaps({
      helperCount: 2,
      threshold: 2,
      helpersHoldFullSeeds: true,
      usesMultisigWeights: true,
    });
    expect(g.some((x) => x.includes("seed"))).toBe(true);
  });
});
