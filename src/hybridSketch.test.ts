import { describe, expect, it } from "vitest";
import { hybridFeasibility, sketchHybridOwner } from "./hybridSketch";

describe("hybridSketch", () => {
  it("builds auth with key + accounts", () => {
    const s = sketchHybridOwner({
      account: "alice.wam",
      yourPublicKey: "PUB_K1_TEST",
      helpers: ["bob.wam", "carol.wam"],
      threshold: 2,
    });
    expect(s.data.auth.keys).toHaveLength(1);
    expect(s.data.auth.accounts).toHaveLength(2);
  });

  it("flags impossible threshold", () => {
    const n = hybridFeasibility({
      threshold: 10,
      yourWeight: 1,
      helperCount: 2,
      helperWeight: 1,
    });
    expect(n.some((x) => x.includes("Impossible"))).toBe(true);
  });
});
