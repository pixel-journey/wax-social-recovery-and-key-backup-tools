"use client";

import { useId } from "react";
import { OWNER_ACTIVE_BULLETS } from "./runbook";

export interface OwnerActivePrimerProps {
  className?: string;
}

export function OwnerActivePrimer({ className = "" }: OwnerActivePrimerProps) {
  const headingId = useId();

  return (
    <section
      className={`rounded-2xl border border-violet-500/30 bg-violet-500/10 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg text-violet-100 mb-1">
        Owner vs active (Antelope)
      </h3>
      <p className="text-sm text-violet-100/75 mb-4 leading-relaxed">
        Recovery design fails if these two roles are confused. Confirm both on an
        explorer for any account you care about.
      </p>
      <ul className="space-y-3">
        {OWNER_ACTIVE_BULLETS.map((b) => (
          <li key={b.title} className="text-sm">
            <p className="font-mono text-violet-200 font-medium">{b.title}</p>
            <p className="text-violet-100/80 mt-0.5 leading-relaxed">{b.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
