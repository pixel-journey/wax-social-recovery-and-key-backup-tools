import { describe, expect, it } from "vitest";
import {
  analyzeWeightDesign,
  canReachThreshold,
  minimalQuorumSizes,
} from "./thresholdMath";

describe("thresholdMath", () => {
  const parties = [
    { id: "a", label: "you", weight: 1, isSelf: true },
    { id: "b", label: "bob", weight: 1 },
    { id: "c", label: "carol", weight: 1 },
  ];

  it("2-of-3 needs two parties", () => {
    expect(canReachThreshold(parties, 2, ["a"])).toBe(false);
    expect(canReachThreshold(parties, 2, ["a", "b"])).toBe(true);
    expect(minimalQuorumSizes(parties, 2)[0]).toBe(2);
  });

  it("flags self-alone", () => {
    const notes = analyzeWeightDesign(
      [{ id: "a", label: "you", weight: 2, isSelf: true }],
      2
    );
    expect(notes.some((n) => n.includes("Self alone"))).toBe(true);
  });
});
