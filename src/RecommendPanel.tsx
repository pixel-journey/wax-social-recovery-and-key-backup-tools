'use client';

import React, { useMemo, useState } from 'react';
import {
  policyGaps,
  postureGaps,
  recommendScenarios,
} from './recommend';
import type { BackupPosture, SocialRecoveryPolicy } from './types';

export type RecommendPanelProps = {
  posture: BackupPosture;
  policy: SocialRecoveryPolicy;
  onApplyScenario: (posture: BackupPosture, policy: SocialRecoveryPolicy) => void;
};

export function RecommendPanel({
  posture,
  policy,
  onApplyScenario,
}: RecommendPanelProps) {
  const [wantsSocial, setWantsSocial] = useState(true);
  const [hasHardware, setHasHardware] = useState(false);
  const [isTeamOrDao, setIsTeamOrDao] = useState(false);
  const [prioritizesInheritance, setPrioritizesInheritance] = useState(false);

  const suggested = useMemo(
    () =>
      recommendScenarios({
        wantsSocial,
        hasHardware,
        isTeamOrDao,
        prioritizesInheritance,
      }),
    [wantsSocial, hasHardware, isTeamOrDao, prioritizesInheritance]
  );

  const gaps = useMemo(
    () => [...postureGaps(posture), ...policyGaps(policy)],
    [posture, policy]
  );

  return (
    <section className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5 space-y-3">
      <h3 className="font-semibold text-yellow-100">Recommender</h3>
      <p className="text-xs opacity-70">
        Answer a few intent questions — get scenario suggestions and gaps on your
        current checklists.
      </p>
      <div className="grid sm:grid-cols-2 gap-2 text-sm">
        {(
          [
            [wantsSocial, setWantsSocial, 'I want multi-party social recovery'],
            [hasHardware, setHasHardware, 'I use (or will use) a hardware wallet'],
            [isTeamOrDao, setIsTeamOrDao, 'This is a team / DAO / treasury'],
            [
              prioritizesInheritance,
              setPrioritizesInheritance,
              'Inheritance-style planning matters',
            ],
          ] as const
        ).map(([val, set, label], i) => (
          <label key={i} className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={val}
              onChange={(e) => set(e.target.checked)}
            />
            {label}
          </label>
        ))}
      </div>
      <div>
        <p className="text-xs font-medium text-yellow-50/90 mb-1">Suggested scenarios</p>
        <ul className="space-y-2">
          {suggested.map((s) => (
            <li
              key={s.id}
              className="flex flex-wrap items-center justify-between gap-2 text-xs bg-black/30 rounded-lg px-3 py-2"
            >
              <span>
                <span className="font-medium">{s.title}</span>
                <span className="opacity-60"> — {s.summary.slice(0, 80)}…</span>
              </span>
              <button
                type="button"
                className="px-2 py-1 rounded bg-yellow-800 text-[10px]"
                onClick={() => onApplyScenario(s.posture, s.policy)}
              >
                Apply
              </button>
            </li>
          ))}
          {suggested.length === 0 && (
            <li className="text-xs opacity-60">No strong match — browse examples.</li>
          )}
        </ul>
      </div>
      <div>
        <p className="text-xs font-medium text-yellow-50/90 mb-1">Gaps on current inputs</p>
        <ul className="text-[11px] list-disc pl-4 space-y-1 opacity-90">
          {gaps.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
