'use client';

import React, { useState } from 'react';
import { INCIDENT_PLAYBOOKS, type IncidentPlaybook } from './incidents';

export function IncidentsPanel() {
  const [active, setActive] = useState<IncidentPlaybook>(INCIDENT_PLAYBOOKS[0]);

  return (
    <section className="rounded-2xl border border-red-500/25 bg-red-500/5 p-5 space-y-3">
      <h3 className="font-semibold text-red-100">Incident playbooks</h3>
      <p className="text-xs opacity-70">
        What to do when something already went wrong — educational, not emergency response.
      </p>
      <div className="flex flex-wrap gap-2">
        {INCIDENT_PLAYBOOKS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`px-2 py-1 rounded-lg text-xs ${
              active.id === p.id ? 'bg-red-800' : 'bg-white/10'
            }`}
            onClick={() => setActive(p)}
          >
            {p.title}
          </button>
        ))}
      </div>
      <p className="text-[10px] uppercase tracking-wide opacity-60">
        severity: {active.severity}
      </p>
      <ol className="list-decimal pl-5 text-sm space-y-2 text-red-50/90">
        {active.steps.map((s) => (
          <li key={s} className="leading-relaxed">
            {s}
          </li>
        ))}
      </ol>
      <div>
        <p className="text-xs font-medium text-amber-200/90 mb-1">Avoid</p>
        <ul className="text-[11px] list-disc pl-4 space-y-1 opacity-80">
          {active.avoid.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
