"use client";

import { useId, useState } from "react";

const PREP = [
  {
    title: "Inventory what can sign",
    body: "List owner keys, active keys, and multi-sig participants. Confirm on explorer.",
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
] as const;

const ACTIVE_LOST = [
  "Confirm owner is still under your control (explorer + offline material).",
  "From owner, update active keys / linked permissions.",
  "Revoke compromised active keys.",
  "Rotate any app sessions that used the old active key.",
  "Log the incident and update the runbook.",
] as const;

const OWNER_LOST = [
  "Active alone cannot replace owner — do not waste time on active-only fixes.",
  "Execute the pre-arranged M-of-N / account-auth recovery path.",
  "If no multi-party owner path exists, the account may be unrecoverable.",
  "After recovery, separate owner from daily keys and re-drill backups.",
  "Review helper set for collusion / coercion risk.",
] as const;

export interface RecoveryWorkflowProps {
  className?: string;
}

type Branch = "prep" | "active" | "owner";

export function RecoveryWorkflow({ className = "" }: RecoveryWorkflowProps) {
  const headingId = useId();
  const [branch, setBranch] = useState<Branch>("prep");

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-3">
        Recovery workflow (educational)
      </h3>

      <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Scenario">
        {(
          [
            ["prep", "Preparation"],
            ["active", "Active key lost"],
            ["owner", "Owner access lost"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={branch === id}
            onClick={() => setBranch(id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              branch === id ? "bg-emerald-600" : "bg-white/10"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {branch === "prep" && (
        <ol className="space-y-4">
          {PREP.map((s, i) => (
            <li key={s.title} className="text-sm">
              <p className="font-medium text-white/90">
                <span className="text-emerald-400/90 mr-2">{i + 1}.</span>
                {s.title}
              </p>
              <p className="text-white/60 mt-1 leading-relaxed pl-6">{s.body}</p>
            </li>
          ))}
        </ol>
      )}

      {branch === "active" && (
        <ol className="space-y-3 text-sm list-decimal pl-5 text-white/85">
          {ACTIVE_LOST.map((s) => (
            <li key={s} className="leading-relaxed">
              {s}
            </li>
          ))}
        </ol>
      )}

      {branch === "owner" && (
        <ol className="space-y-3 text-sm list-decimal pl-5 text-amber-100/90">
          {OWNER_LOST.map((s) => (
            <li key={s} className="leading-relaxed">
              {s}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
