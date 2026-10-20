import { describe, expect, it } from "vitest";
import { derivePostureHints, summarizeAccount } from "./getAccount";

describe("summarizeAccount", () => {
  it("flags shared owner/active key", () => {
    const view = summarizeAccount(
      {
        account_name: "alice.wam",
        permissions: [
          {
            perm_name: "owner",
            parent: "",
            required_auth: {
              threshold: 1,
              keys: [{ key: "PUB_K1_SAME", weight: 1 }],
              accounts: [],
            },
          },
          {
            perm_name: "active",
            parent: "owner",
            required_auth: {
              threshold: 1,
              keys: [{ key: "PUB_K1_SAME", weight: 1 }],
              accounts: [],
            },
          },
        ],
      },
      "test"
    );
    expect(view.ownerActiveShareKeys).toBe(true);
    expect(view.ownerSingleKey).toBe(true);
    expect(view.notes.some((n) => /share at least one/i.test(n))).toBe(true);
  });

  it("notes multi-party owner when accounts present", () => {
    const view = summarizeAccount(
      {
        account_name: "dao.wam",
        permissions: [
          {
            perm_name: "owner",
            parent: "",
            required_auth: {
              threshold: 2,
              keys: [],
              accounts: [
                {
                  permission: { actor: "a.wam", permission: "active" },
                  weight: 1,
                },
                {
                  permission: { actor: "b.wam", permission: "active" },
                  weight: 1,
                },
              ],
            },
          },
          {
            perm_name: "active",
            parent: "owner",
            required_auth: { threshold: 1, keys: [], accounts: [] },
          },
        ],
      },
      "test"
    );
    expect(view.owner?.hasAccountAuths).toBe(true);
    expect(view.ownerSingleKey).toBe(false);
    expect(view.notes.some((n) => /M-of-N/i.test(n))).toBe(true);
  });
});

describe("derivePostureHints", () => {
  it("marks owner not separated when keys shared", () => {
    const view = summarizeAccount(
      {
        account_name: "x",
        permissions: [
          {
            perm_name: "owner",
            required_auth: {
              threshold: 1,
              keys: [{ key: "K", weight: 1 }],
            },
          },
          {
            perm_name: "active",
            required_auth: {
              threshold: 1,
              keys: [{ key: "K", weight: 1 }],
            },
          },
        ],
      },
      "t"
    );
    const h = derivePostureHints(view);
    expect(h.ownerSeparatedFromDaily).toBe(false);
  });

  it("suggests helper count from owner accounts", () => {
    const view = summarizeAccount(
      {
        account_name: "dao",
        permissions: [
          {
            perm_name: "owner",
            required_auth: {
              threshold: 2,
              accounts: [
                { permission: { actor: "a", permission: "active" }, weight: 1 },
                { permission: { actor: "b", permission: "active" }, weight: 1 },
                { permission: { actor: "c", permission: "active" }, weight: 1 },
              ],
            },
          },
          { perm_name: "active", required_auth: { threshold: 1 } },
        ],
      },
      "t"
    );
    const h = derivePostureHints(view);
    expect(h.usesMultisigWeights).toBe(true);
    expect(h.suggestedHelperCount).toBe(3);
    expect(h.suggestedThreshold).toBe(2);
  });
});
