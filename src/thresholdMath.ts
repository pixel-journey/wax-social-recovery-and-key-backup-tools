/** Pure helpers for M-of-N weight design education. */

export type WeightParty = {
  id: string;
  label: string;
  weight: number;
  /** true if this is the account owner themselves */
  isSelf?: boolean;
};

export function totalWeight(parties: WeightParty[]): number {
  return parties.reduce((s, p) => s + Math.max(0, p.weight), 0);
}

export function canReachThreshold(
  parties: WeightParty[],
  threshold: number,
  subsetIds: string[]
): boolean {
  const set = new Set(subsetIds);
  const sum = parties
    .filter((p) => set.has(p.id))
    .reduce((s, p) => s + Math.max(0, p.weight), 0);
  return sum >= threshold;
}

/** Smallest subset sizes that meet threshold (by count of parties). */
export function minimalQuorumSizes(
  parties: WeightParty[],
  threshold: number
): number[] {
  const n = parties.length;
  if (n === 0) return [];
  const sizes = new Set<number>();
  const limit = 1 << n;
  for (let mask = 1; mask < limit; mask++) {
    let sum = 0;
    let count = 0;
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        sum += Math.max(0, parties[i].weight);
        count += 1;
      }
    }
    if (sum >= threshold) sizes.add(count);
  }
  return [...sizes].sort((a, b) => a - b);
}

export function analyzeWeightDesign(
  parties: WeightParty[],
  threshold: number
): string[] {
  const notes: string[] = [];
  const total = totalWeight(parties);
  if (threshold <= 0) notes.push("Threshold must be ≥ 1");
  if (threshold > total)
    notes.push(`Impossible: threshold ${threshold} > total weight ${total}`);
  const self = parties.find((p) => p.isSelf);
  if (self && self.weight >= threshold) {
    notes.push(
      "Self alone meets threshold — social path optional; single-key risk remains if that key is lost."
    );
  }
  const withoutSelf = parties.filter((p) => !p.isSelf);
  const helpersTotal = totalWeight(withoutSelf);
  if (helpersTotal >= threshold && withoutSelf.length > 0) {
    notes.push(
      "Helpers can meet threshold without you — intentional social recovery, or raise your weight / threshold."
    );
  }
  const singles = parties.filter((p) => p.weight >= threshold);
  if (singles.length > 0) {
    notes.push(
      `Single-party control: ${singles.map((p) => p.label).join(", ")} each meet threshold alone.`
    );
  }
  const quorums = minimalQuorumSizes(parties, threshold);
  if (quorums.length && threshold <= total) {
    notes.push(
      `Smallest quorum size(s): ${quorums.slice(0, 5).join(", ")} party(ies).`
    );
  }
  if (notes.length === 0) notes.push("No structural red flags under these weights.");
  return notes;
}
