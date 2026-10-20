"use client";

import { useId, useMemo } from "react";
import { analyzeSocialRecovery } from "./engines";
import type { RiskLevel, SocialRecoveryPolicy } from "./types";

export interface SecurityWarningsProps {
  policy: SocialRecoveryPolicy;
  className?: string;
}

const levelClass: Record<RiskLevel, string> = {
  low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-100",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-100",
  high: "border-red-500/30 bg-red-500/10 text-red-100",
};

export function SecurityWarnings({
  policy,
  className = "",
}: SecurityWarningsProps) {
  const headingId = useId();
  const risks = useMemo(() => analyzeSocialRecovery(policy), [policy]);

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-1">
        Social recovery risks
      </h3>
      <p className="text-sm text-white/60 mb-5">
        Structural flags only — not a security audit.
      </p>
      <ul className="space-y-3" aria-live="polite">
        {risks.map((r) => (
          <li
            key={r.id}
            className={`rounded-xl border p-3 text-sm ${levelClass[r.level]}`}
            role={r.level === "high" ? "alert" : undefined}
          >
            <div className="flex justify-between gap-2">
              <span className="font-medium">{r.title}</span>
              <span className="text-xs uppercase opacity-80">{r.level}</span>
            </div>
            <p className="mt-1 leading-relaxed opacity-90">{r.detail}</p>
            <p className="mt-1 text-xs opacity-70">Trigger: {r.trigger}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
