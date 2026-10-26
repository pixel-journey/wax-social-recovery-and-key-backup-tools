'use client';

import React, { useState } from 'react';
import {
  AUTHORITY_MODELS,
  WHARFKIT_RECOVERY_NOTES,
  type AuthorityModel,
} from './authorityModels';

export function AuthorityModelsPanel() {
  const [active, setActive] = useState<AuthorityModel>(AUTHORITY_MODELS[2]);

  return (
    <section className="rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/10 p-5 space-y-4">
      <h3 className="font-semibold text-fuchsia-100">How recovery is encoded on-chain</h3>
      <p className="text-xs opacity-70">
        Five patterns. Social recovery in this repo usually means{' '}
        <strong>account-auth</strong> or <strong>hybrid</strong>, not seed sharing.
      </p>
      <div className="flex flex-wrap gap-2">
        {AUTHORITY_MODELS.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`px-2 py-1 rounded-lg text-xs ${
              active.id === m.id ? 'bg-fuchsia-700' : 'bg-white/10'
            }`}
            onClick={() => setActive(m)}
          >
            {m.title}
          </button>
        ))}
      </div>
      <div className="text-sm space-y-2">
        <p>{active.summary}</p>
        <p className="text-[11px] opacity-80">
          <span className="text-fuchsia-200/90">When: </span>
          {active.whenToUse}
        </p>
        <pre className="text-[10px] font-mono opacity-80 whitespace-pre-wrap bg-black/40 p-2 rounded-lg">
          {active.exampleShape}
        </pre>
        <ul className="text-[11px] list-disc pl-4 text-amber-100/85">
          {active.risks.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
      <div className="border-t border-white/10 pt-3">
        <p className="text-xs font-medium text-fuchsia-100 mb-1">WharfKit notes</p>
        <ul className="text-[10px] space-y-1 opacity-75 list-disc pl-4">
          {WHARFKIT_RECOVERY_NOTES.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
