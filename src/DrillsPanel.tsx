'use client';

import React, { useState } from 'react';
import { RECOVERY_DRILLS, drillChecklistMarkdown } from './drills';

export function DrillsPanel() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [msg, setMsg] = useState<string | null>(null);

  const toggle = (id: string) =>
    setDone((d) => ({ ...d, [id]: !d[id] }));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(drillChecklistMarkdown());
      setMsg('Drill checklist copied');
    } catch {
      setMsg('Clipboard unavailable');
    }
  };

  return (
    <section className="rounded-2xl border border-lime-500/30 bg-lime-500/10 p-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold text-lime-100">Recovery drills</h3>
        <button
          type="button"
          className="px-2 py-1 rounded text-xs bg-lime-800"
          onClick={() => void copy()}
        >
          Copy checklist
        </button>
      </div>
      <p className="text-xs opacity-70">
        Untested recovery fails under stress. Use a throwaway account for any live step.
      </p>
      <ul className="space-y-2">
        {RECOVERY_DRILLS.map((d) => (
          <li key={d.id} className="text-sm flex gap-2 items-start">
            <input
              type="checkbox"
              className="mt-1"
              checked={!!done[d.id]}
              onChange={() => toggle(d.id)}
            />
            <div>
              <p className="font-medium text-lime-50/90">
                {d.title}
                {d.requiresLiveChain && (
                  <span className="ml-2 text-[10px] opacity-50">chain</span>
                )}
              </p>
              <p className="text-[11px] opacity-70">{d.detail}</p>
            </div>
          </li>
        ))}
      </ul>
      {msg && (
        <p className="text-[11px] text-lime-100/80" role="status">
          {msg}
        </p>
      )}
    </section>
  );
}
