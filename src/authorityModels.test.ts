import { describe, expect, it } from "vitest";
import { AUTHORITY_MODELS, WHARFKIT_RECOVERY_NOTES } from "./authorityModels";

describe("AUTHORITY_MODELS", () => {
  it("includes account-auth social pattern", () => {
    expect(AUTHORITY_MODELS.some((m) => m.id === "account-auth")).toBe(true);
  });
  it("has WharfKit guidance", () => {
    expect(WHARFKIT_RECOVERY_NOTES.length).toBeGreaterThan(2);
  });
});
