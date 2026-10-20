import { describe, expect, it } from "vitest";
import { summarizeAccount } from "./getAccount";

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
    expect(view.owner?.hasKeys).toBe(true);
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
    expect(view.notes.some((n) => /M-of-N/i.test(n))).toBe(true);
  });
});
