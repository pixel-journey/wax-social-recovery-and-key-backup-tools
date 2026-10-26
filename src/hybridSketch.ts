/** Hybrid owner: your key weight + helper account authorities. */

export function sketchHybridOwner(input: {
  account: string;
  yourPublicKey: string;
  helpers: string[];
  /** Minimum weight to satisfy owner */
  threshold: number;
  yourWeight?: number;
  helperWeight?: number;
}) {
  const yourWeight = input.yourWeight ?? 1;
  const helperWeight = input.helperWeight ?? 1;
  const helpers = input.helpers.map((h) => h.trim()).filter(Boolean);

  return {
    account: "eosio",
    name: "updateauth",
    authorization: [{ actor: input.account, permission: "owner" }],
    data: {
      account: input.account,
      permission: "owner",
      parent: "",
      auth: {
        threshold: input.threshold,
        keys: input.yourPublicKey
          ? [{ key: input.yourPublicKey, weight: yourWeight }]
          : [],
        accounts: helpers.map((actor) => ({
          permission: { actor, permission: "active" },
          weight: helperWeight,
        })),
        waits: [],
      },
    },
    note:
      "Educational sketch. If yourWeight >= threshold, helpers are optional for recovery (single-key risk remains). Test on throwaway. Sign with WharfKit.",
  };
}

export function hybridFeasibility(input: {
  threshold: number;
  yourWeight: number;
  helperCount: number;
  helperWeight: number;
}): string[] {
  const notes: string[] = [];
  const max =
    input.yourWeight + input.helperCount * input.helperWeight;
  if (input.threshold > max) {
    notes.push(
      `Impossible: threshold ${input.threshold} > max achievable weight ${max}`
    );
  }
  if (input.yourWeight >= input.threshold) {
    notes.push(
      "Your key alone meets threshold — helpers are not required for recovery (and single-key loss still hurts)."
    );
  }
  if (
    input.helperCount * input.helperWeight >= input.threshold &&
    input.yourWeight < input.threshold
  ) {
    notes.push(
      "Helpers alone can meet threshold without you — intentional for true social recovery, or lower helper weights."
    );
  }
  if (notes.length === 0) {
    notes.push("Weights look structurally reachable; still model collusion.");
  }
  return notes;
}
