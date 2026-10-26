'use client';

import React, { useMemo, useState } from 'react';
import { collusionSummary, minimalCoalitions } from './collusion';
import {
  analyzeWeightDesign,
  type WeightParty,
} from './thresholdMath';

const DEFAULT: WeightParty[] = [
  { id: 'self', label: 'you', weight: 1, isSelf: true },
  { id: 'h1', label: 'bob', weight: 1 },
  { id: 'h2', label: 'carol', weight: 1 },
  { id: 'h3', label: 'dave', weight: 1 },
];

/**
 * Unified weight design lab: one set of parties drives both
 * threshold analysis and collusion/minimal coalitions.
 */
export function WeightLab() {
  const [parties, setParties] = useState<WeightParty[]>(DEFAULT);
  const [threshold, setThreshold] = useState(2);
  const [tab, setTab] = useState<'design' | 'collusion'>('design');

  const designNotes = useMemo(
    () => analyzeWeightDesign(parties, threshold),
    [parties, threshold]
  );
  const collusionNotes = useMemo(
    () => collusionSummary(parties, threshold),
    [parties, threshold]
  );
  const minimal = useMemo(
    () => minimalCoalitions(parties, threshold),
    [parties, threshold]
  );

  const setWeight = (id: string, weight: number) => {
    setParties((ps) =>
      ps.map((p) => (p.id === id ? { ...p, weight } : p))
    );
  };

  const setLabel = (id: string, label: string) => {
    setParties((ps) =>
      ps.map((p) => (p.id === id ? { ...p, label } : p))
    );
  };

  return (
    <section className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-5 space-y-4 print:break-inside-avoid">
      <h3 className="font-semibold text-indigo-100">Weight design lab</h3>
      <p className="text-xs opacity-70">
        One party table feeds threshold analysis and collusion coalitions — change
        weights once, read both views.
      </p>

      <label className="text-[10px] opacity-70 block">
        Threshold: {threshold}
        <input
          type="range"
          min={1}
          max={10}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-full mt-1 print:hidden"
        />
      </label>

      <ul className="space-y-2">
        {parties.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center gap-2 text-sm">
            <input
              className="w-24 bg-black/40 border border-white/10 rounded px-1 py-0.5 font-mono text-xs print:border-0"
              value={p.label}
              onChange={(e) => setLabel(p.id, e.target.value)}
              aria-label={`Label for ${p.id}`}
            />
            <input
              type="range"
              min={0}
              max={5}
              value={p.weight}
              onChange={(e) => setWeight(p.id, Number(e.target.value))}
              className="flex-1 min-w-[6rem] print:hidden"
            />
            <span className="font-mono text-xs w-6">{p.weight}</span>
            {p.isSelf && (
              <span className="text-[9px] uppercase opacity-50">self</span>
            )}
          </li>
        ))}
      </ul>

      <div className="flex gap-2 print:hidden" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'design'}
          className={`px-3 py-1 rounded-lg text-xs ${
            tab === 'design' ? 'bg-indigo-700' : 'bg-white/10'
          }`}
          onClick={() => setTab('design')}
        >
          Design notes
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'collusion'}
          className={`px-3 py-1 rounded-lg text-xs ${
            tab === 'collusion' ? 'bg-rose-800' : 'bg-white/10'
          }`}
          onClick={() => setTab('collusion')}
        >
          Collusion
        </button>
      </div>

      {tab === 'design' && (
        <ul className="text-[11px] list-disc pl-4 text-indigo-50/90 space-y-1">
          {designNotes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}

      {tab === 'collusion' && (
        <div className="space-y-2">
          <ul className="text-[11px] list-disc pl-4 text-rose-50/90 space-y-1">
            {collusionNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          {minimal.length > 0 && (
            <details className="text-[10px] opacity-80">
              <summary>
                Minimal coalitions ({minimal.length})
              </summary>
              <ul className="mt-2 space-y-1 font-mono">
                {minimal.map((c) => (
                  <li key={c.ids.join('-')}>
                    {`{${c.labels.join(', ')}}`} w={c.weight}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}

      {/* Print always shows both */}
      <div className="hidden print:block space-y-3 text-[10px]">
        <p className="font-medium">Design</p>
        <ul className="list-disc pl-4">
          {designNotes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <p className="font-medium">Collusion</p>
        <ul className="list-disc pl-4">
          {collusionNotes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
