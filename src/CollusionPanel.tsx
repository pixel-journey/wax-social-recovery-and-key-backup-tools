'use client';

import React, { useMemo, useState } from 'react';
import { collusionSummary, minimalCoalitions } from './collusion';
import type { WeightParty } from './thresholdMath';

const DEFAULT: WeightParty[] = [
  { id: 'self', label: 'you', weight: 1, isSelf: true },
  { id: 'h1', label: 'bob', weight: 1 },
  { id: 'h2', label: 'carol', weight: 1 },
  { id: 'h3', label: 'dave', weight: 1 },
];

export function CollusionPanel() {
  const [parties, setParties] = useState<WeightParty[]>(DEFAULT);
  const [threshold, setThreshold] = useState(2);

  const summary = useMemo(
    () => collusionSummary(parties, threshold),
    [parties, threshold]
  );
  const minimal = useMemo(
    () => minimalCoalitions(parties, threshold),
    [parties, threshold]
  );

  return (
    <section className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 space-y-3">
      <h3 className="font-semibold text-rose-100">Collusion / quorum explorer</h3>
      <p className="text-xs opacity-70">
        Who can form a winning set to change owner? Same weights as a typical 2-of-3+
        design — tweak and read the coalitions.
      </p>
      <label className="text-[10px] opacity-70 block">
        Threshold: {threshold}
        <input
          type="range"
          min={1}
          max={8}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-full mt-1"
        />
      </label>
      <ul className="space-y-1">
        {parties.map((p) => (
          <li key={p.id} className="flex items-center gap-2 text-xs">
            <span className="w-16 font-mono opacity-80">{p.label}</span>
            <input
              type="range"
              min={0}
              max={4}
              value={p.weight}
              onChange={(e) =>
                setParties((ps) =>
                  ps.map((x) =>
                    x.id === p.id
                      ? { ...x, weight: Number(e.target.value) }
                      : x
                  )
                )
              }
              className="flex-1"
            />
            <span className="font-mono w-4">{p.weight}</span>
          </li>
        ))}
      </ul>
      <ul className="text-[11px] list-disc pl-4 space-y-1 text-rose-50/90">
        {summary.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      {minimal.length > 0 && (
        <details className="text-[10px] opacity-80">
          <summary>All minimal coalitions ({minimal.length})</summary>
          <ul className="mt-2 space-y-1 font-mono">
            {minimal.map((c) => (
              <li key={c.ids.join('-')}>
                {`{${c.labels.join(', ')}}`} w={c.weight}
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
