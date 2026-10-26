import { describe, expect, it } from "vitest";
import { RECOVERY_DRILLS, drillChecklistMarkdown } from "./drills";

describe("drills", () => {
  it("includes msig/weights step", () => {
    expect(RECOVERY_DRILLS.some((d) => d.id === "msig-or-weights")).toBe(true);
  });
  it("markdown has checkboxes", () => {
    expect(drillChecklistMarkdown()).toContain("- [ ]");
  });
});
