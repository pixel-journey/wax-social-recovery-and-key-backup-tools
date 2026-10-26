import { describe, expect, it } from "vitest";
import { RECOVERY_MYTHS } from "./myths";

describe("RECOVERY_MYTHS", () => {
  it("covers seed-sharing myth", () => {
    expect(RECOVERY_MYTHS.some((m) => m.id === "email-seed")).toBe(true);
  });
});
