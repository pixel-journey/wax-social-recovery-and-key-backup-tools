import { describe, expect, it } from "vitest";
import { decodeShareState, encodeShareState } from "./shareState";

describe("shareState", () => {
  it("roundtrips", () => {
    const state = {
      posture: {
        offlineCopies: 2,
        restoreDrilled: true,
        ownerSeparatedFromDaily: true,
        writtenRunbook: false,
      },
      policy: {
        helperCount: 3,
        threshold: 2,
        helpersHoldFullSeeds: false,
        usesMultisigWeights: true,
      },
    };
    expect(decodeShareState(encodeShareState(state))).toEqual(state);
  });
});
