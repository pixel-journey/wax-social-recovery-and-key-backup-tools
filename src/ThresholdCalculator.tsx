'use client';

import React, { useMemo, useState } from 'react';
import {
  analyzeWeightDesign,
  type WeightParty,
} from './thresholdMath';

const DEFAULT: WeightParty[] = [
  { id: 'self', label: 'you (key)', weight: 1, isSelf: true },
  { id: 'h1', label: 'helper1', weight: 1 },
  { id: 'h2', label: 'helper2', weight: 1 },
  { id: 'h3', label: 'helper3', weight: 1 },
];

export function ThresholdCalculator() {
  const [parties, setParties] = useState<WeightParty[]>(DEFAULT);
  const [threshold, setThreshold] = useState(2);

  const notes = useMemo(
    () => analyzeWeightDesign(parties, threshold),
    [parties, threshold]
  );

  const setWeight = (id: string, weight: number) => {
    setParties((ps) =>
      ps.map((p) => (p.id === id ? { ...p, weight } : p))
    );
  };

  return (
    <section className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-5 space-y-3">
      <h3 className="font-semibold text-indigo-100">Threshold calculator</h3>
      <p className="text-xs opacity-70">
        Explore who can authorize owner changes. Pure math — not a live chain tool.
      </p>
      <label className="text-[10px] opacity-70 block">
        Threshold: {threshold}
        <input
          type="range"
          min={1}
          max={10}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-full mt-1"
        />
      </label>
      <ul className="space-y-2">
        {parties.map((p) => (
          <li key={p.id} className="flex items-center gap-3 text-sm">
            <span className="w-28 font-mono text-xs opacity-80">{p.label}</span>
            <input
              type="range"
              min={0}
              max={5}
              value={p.weight}
              onChange={(e) => setWeight(p.id, Number(e.target.value))}
              className="flex-1"
            />
            <span className="font-mono text-xs w-6">{p.weight}</span>
          </li>
        ))}
      </ul>
      <ul className="text-[11px] list-disc pl-4 text-indigo-50/90 space-y-1">
        {notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </section>
  );
}
