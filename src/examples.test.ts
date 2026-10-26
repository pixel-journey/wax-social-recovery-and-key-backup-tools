import { describe, expect, it } from "vitest";
import { analyzeSocialRecovery } from "./engines";
import {
  SCENARIO_CATALOG,
  sketchUpdateOwnerFor2of3,
} from "./examples";

describe("SCENARIO_CATALOG", () => {
  it("has at least 8 scenarios", () => {
    expect(SCENARIO_CATALOG.length).toBeGreaterThanOrEqual(8);
  });

  it("2-of-3 looks balanced", () => {
    const s = SCENARIO_CATALOG.find((x) => x.id === "2-of-3-friends")!;
    const risks = analyzeSocialRecovery(s.policy);
    expect(risks.some((r) => r.id === "balanced")).toBe(true);
  });

  it("sketches updateauth for 2-of-3", () => {
    const a = sketchUpdateOwnerFor2of3("alice.wam", [
      "bob.wam",
      "carol.wam",
      "dave.wam",
    ]);
    expect(a.name).toBe("updateauth");
    expect(a.data.auth.threshold).toBe(2);
  });
});
