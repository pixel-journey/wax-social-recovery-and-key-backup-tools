import { describe, expect, it } from "vitest";
import { collusionSummary, minimalCoalitions } from "./collusion";

describe("collusion", () => {
  const parties = [
    { id: "a", label: "you", weight: 1, isSelf: true },
    { id: "b", label: "bob", weight: 1 },
    { id: "c", label: "carol", weight: 1 },
  ];

  it("2-of-3 has three minimal pairs", () => {
    const m = minimalCoalitions(parties, 2);
    expect(m).toHaveLength(3);
    expect(m.every((c) => c.ids.length === 2)).toBe(true);
  });

  it("summary mentions helpers without you", () => {
    const s = collusionSummary(parties, 2);
    expect(s.some((x) => x.includes("exclude you"))).toBe(true);
  });
});
