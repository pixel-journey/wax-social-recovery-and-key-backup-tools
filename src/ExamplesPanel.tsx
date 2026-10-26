'use client';

import React, { useState } from 'react';
import {
  CLOUD_WALLET_NOTE,
  SCENARIO_CATALOG,
  sketchUpdateOwnerFor2of3,
  type ScenarioExample,
} from './examples';
import type { BackupPosture, SocialRecoveryPolicy } from './types';

export type ExamplesPanelProps = {
  onApply: (posture: BackupPosture, policy: SocialRecoveryPolicy) => void;
};

export function ExamplesPanel({ onApply }: ExamplesPanelProps) {
  const [selected, setSelected] = useState<ScenarioExample>(
    SCENARIO_CATALOG.find((s) => s.id === '2-of-3-friends') ?? SCENARIO_CATALOG[0]
  );
  const [account, setAccount] = useState('alice.wam');
  const [h1, setH1] = useState('bob.wam');
  const [h2, setH2] = useState('carol.wam');
  const [h3, setH3] = useState('dave.wam');

  const sketch = sketchUpdateOwnerFor2of3(account.trim() || 'alice.wam', [
    h1.trim() || 'bob.wam',
    h2.trim() || 'carol.wam',
    h3.trim() || 'dave.wam',
  ]);

  return (
    <section className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5 space-y-4">
      <h3 className="font-semibold text-cyan-100">Worked examples</h3>
      <p className="text-xs opacity-70">
        {SCENARIO_CATALOG.length} scenarios — apply to checklists or inspect a 2-of-3{' '}
        <code>updateauth</code> sketch.
      </p>

      <div className="flex flex-wrap gap-2">
        {SCENARIO_CATALOG.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`px-2 py-1 rounded-lg text-xs ${
              selected.id === s.id ? 'bg-cyan-700' : 'bg-white/10'
            }`}
            onClick={() => setSelected(s)}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="text-sm space-y-2">
        <p className="text-cyan-50/90">{selected.summary}</p>
        <p className="text-[11px] font-mono opacity-80">{selected.onChainShape}</p>
        <ul className="text-[11px] text-amber-100/80 list-disc pl-4">
          {selected.warnings.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
        <button
          type="button"
          className="px-3 py-2 rounded-lg text-sm bg-cyan-800"
          onClick={() => onApply(selected.posture, selected.policy)}
        >
          Apply to checklists
        </button>
      </div>

      <details className="text-xs">
        <summary className="cursor-pointer opacity-80">
          2-of-3 updateauth sketch (educational)
        </summary>
        <div className="mt-2 space-y-2">
          <input
            className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 font-mono"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="account"
          />
          <div className="grid sm:grid-cols-3 gap-2">
            <input
              className="bg-black/50 border border-white/10 rounded px-2 py-1 font-mono"
              value={h1}
              onChange={(e) => setH1(e.target.value)}
            />
            <input
              className="bg-black/50 border border-white/10 rounded px-2 py-1 font-mono"
              value={h2}
              onChange={(e) => setH2(e.target.value)}
            />
            <input
              className="bg-black/50 border border-white/10 rounded px-2 py-1 font-mono"
              value={h3}
              onChange={(e) => setH3(e.target.value)}
            />
          </div>
          <pre className="overflow-x-auto text-[10px] opacity-80 whitespace-pre-wrap">
            {JSON.stringify(sketch, null, 2)}
          </pre>
          <p className="opacity-60">{sketch.note}</p>
        </div>
      </details>

      <p className="text-[10px] opacity-60 border-t border-white/10 pt-2">
        {CLOUD_WALLET_NOTE}
      </p>
    </section>
  );
}
