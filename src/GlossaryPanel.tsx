'use client';

import React from 'react';
import { GLOSSARY } from './glossary';

export function GlossaryPanel() {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <h3 className="font-semibold text-lg mb-3">Glossary</h3>
      <dl className="space-y-3 text-sm">
        {GLOSSARY.map((g) => (
          <div key={g.term}>
            <dt className="font-mono text-emerald-300/90">{g.term}</dt>
            <dd className="text-white/65 text-xs mt-0.5 leading-relaxed">
              {g.definition}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
