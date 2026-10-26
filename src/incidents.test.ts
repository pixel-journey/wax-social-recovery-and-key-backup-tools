import { describe, expect, it } from "vitest";
import { INCIDENT_PLAYBOOKS } from "./incidents";

describe("INCIDENT_PLAYBOOKS", () => {
  it("includes owner-lost critical path", () => {
    const p = INCIDENT_PLAYBOOKS.find((x) => x.id === "owner-lost");
    expect(p?.severity).toBe("critical");
    expect(p!.steps.length).toBeGreaterThan(2);
  });
});
