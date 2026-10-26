import { describe, expect, it } from "vitest";
import { exportPlanJson } from "./exportPlan";

describe("exportPlanJson", () => {
  it("includes kind and risks", () => {
    const j = exportPlanJson(
      "alice.wam",
      {
        offlineCopies: 2,
        restoreDrilled: true,
        ownerSeparatedFromDaily: true,
        writtenRunbook: true,
      },
      {
        helperCount: 3,
        threshold: 2,
        helpersHoldFullSeeds: false,
        usesMultisigWeights: true,
      }
    );
    const o = JSON.parse(j);
    expect(o.kind).toBe("pxj-social-recovery-plan");
    expect(o.score.score).toBe(100);
  });
});
