import { describe, expect, it } from "vitest";
import { generateRunbookMarkdown } from "./runbook";

describe("generateRunbookMarkdown", () => {
  it("includes account and threshold", () => {
    const md = generateRunbookMarkdown({
      accountName: "alice.wam",
      reviewedAt: "2026-10-20",
      posture: {
        offlineCopies: 2,
        restoreDrilled: true,
        ownerSeparatedFromDaily: true,
        writtenRunbook: true,
      },
      policy: {
        helperCount: 3,
        threshold: 2,
        helpersHoldFullSeeds: false,
        usesMultisigWeights: true,
      },
    });
    expect(md).toContain("alice.wam");
    expect(md).toContain("2-of-3");
    expect(md).toContain("2026-10-20");
    expect(md).toContain("owner");
    expect(md).toContain("active");
  });

  it("flags undrilled backups in table", () => {
    const md = generateRunbookMarkdown({
      posture: {
        offlineCopies: 1,
        restoreDrilled: false,
        ownerSeparatedFromDaily: false,
        writtenRunbook: false,
      },
      policy: {
        helperCount: 0,
        threshold: 1,
        helpersHoldFullSeeds: false,
        usesMultisigWeights: false,
      },
    });
    expect(md).toMatch(/Restore drilled.*NO/i);
  });
});
