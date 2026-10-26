'use client';

import React, { useState } from 'react';
import { RECOVERY_MYTHS } from './myths';

export function MythsPanel() {
  const [open, setOpen] = useState<string | null>(RECOVERY_MYTHS[0]?.id ?? null);

  return (
    <section className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5 space-y-3">
      <h3 className="font-semibold text-orange-100">Myths vs reality</h3>
      <p className="text-xs opacity-70">
        Quick corrections for common WAX recovery misunderstandings.
      </p>
      <ul className="space-y-2">
        {RECOVERY_MYTHS.map((m) => (
          <li key={m.id} className="border border-white/10 rounded-xl overflow-hidden">
            <button
              type="button"
              className="w-full text-left px-3 py-2 text-sm bg-black/30 hover:bg-black/50"
              onClick={() => setOpen(open === m.id ? null : m.id)}
              aria-expanded={open === m.id}
            >
              <span className="opacity-50">Myth: </span>
              {m.claim}
            </button>
            {open === m.id && (
              <p className="px-3 py-2 text-[11px] leading-relaxed text-orange-50/90 bg-black/40">
                <span className="text-emerald-300/90">Reality: </span>
                {m.reality}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
