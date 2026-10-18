"use client";

import { useId } from "react";

const STEPS = [
  {
    title: "Inventory what can sign",
    body: "List owner keys, active keys, and any multi-sig participants. Confirm on explorer.",
  },
  {
    title: "Verify personal backups",
    body: "Offline copies exist, are readable, and a restore drill has been done on a low-value path.",
  },
  {
    title: "Define helper policy",
    body: "M-of-N threshold, no full-seed sharing, written contacts and escalation path.",
  },
  {
    title: "Encode on-chain",
    body: "Implement via account permissions and/or eosio.msig — simulate before relying on it.",
  },
  {
    title: "Publish a runbook offline",
    body: "Steps live in git or paper, not only on one product domain (PX §11).",
  },
];

export interface RecoveryWorkflowProps {
  className?: string;
}

export function RecoveryWorkflow({ className = "" }: RecoveryWorkflowProps) {
  const headingId = useId();

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-4">
        Recovery workflow (educational)
      </h3>
      <ol className="space-y-4">
        {STEPS.map((s, i) => (
          <li key={s.title} className="text-sm">
            <p className="font-medium text-white/90">
              <span className="text-emerald-400/90 mr-2">{i + 1}.</span>
              {s.title}
            </p>
            <p className="text-white/60 mt-1 leading-relaxed pl-6">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
