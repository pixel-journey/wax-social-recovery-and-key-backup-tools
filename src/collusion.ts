/**
 * Educational collusion analysis for M-of-N weight designs.
 * Enumerates minimal coalitions that meet threshold.
 */

import type { WeightParty } from "./thresholdMath";

export type Coalition = {
  ids: string[];
  labels: string[];
  weight: number;
  includesSelf: boolean;
};

export function enumeratingCoalitions(
  parties: WeightParty[],
  threshold: number,
  maxList = 24
): Coalition[] {
  const n = parties.length;
  const out: Coalition[] = [];
  if (n === 0 || threshold <= 0) return out;
  const limit = 1 << n;
  for (let mask = 1; mask < limit; mask++) {
    let sum = 0;
    const ids: string[] = [];
    const labels: string[] = [];
    let includesSelf = false;
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        const p = parties[i];
        sum += Math.max(0, p.weight);
        ids.push(p.id);
        labels.push(p.label);
        if (p.isSelf) includesSelf = true;
      }
    }
    if (sum >= threshold) {
      out.push({ ids, labels, weight: sum, includesSelf });
    }
  }
  // Prefer smaller coalitions first
  out.sort((a, b) => a.ids.length - b.ids.length || a.weight - b.weight);
  return out.slice(0, maxList);
}

/** Minimal coalitions only (no proper superset of a smaller winning set). */
export function minimalCoalitions(
  parties: WeightParty[],
  threshold: number
): Coalition[] {
  const all = enumeratingCoalitions(parties, threshold, 512);
  return all.filter((c) => {
    const set = new Set(c.ids);
    return !all.some(
      (o) =>
        o.ids.length < c.ids.length &&
        o.ids.every((id) => set.has(id))
    );
  });
}

export function collusionSummary(
  parties: WeightParty[],
  threshold: number
): string[] {
  const notes: string[] = [];
  const minimal = minimalCoalitions(parties, threshold);
  if (minimal.length === 0) {
    notes.push("No coalition reaches threshold (impossible design).");
    return notes;
  }
  notes.push(`${minimal.length} minimal winning coalition(s).`);
  const solo = minimal.filter((c) => c.ids.length === 1);
  if (solo.length) {
    notes.push(
      `Single-party winners: ${solo.map((c) => c.labels[0]).join(", ")}.`
    );
  }
  const withoutSelf = minimal.filter((c) => !c.includesSelf);
  if (withoutSelf.length) {
    notes.push(
      `${withoutSelf.length} minimal coalition(s) exclude you — helpers can recover without your key.`
    );
  }
  const onlyWithSelf = minimal.filter((c) => c.includesSelf);
  if (onlyWithSelf.length && withoutSelf.length === 0) {
    notes.push("Every minimal coalition includes you — helpers cannot exclude you.");
  }
  // Show a few examples
  for (const c of minimal.slice(0, 5)) {
    notes.push(
      `Example: {${c.labels.join(" + ")}} weight ${c.weight} ≥ ${threshold}`
    );
  }
  return notes;
}
