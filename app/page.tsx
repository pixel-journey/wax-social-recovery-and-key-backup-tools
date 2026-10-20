'use client';

import React, { useMemo, useState } from 'react';
import { BackupChecklist } from '../examples/BackupChecklist';
import { RecoveryWorkflow } from '../examples/RecoveryWorkflow';
import { SecurityWarnings } from '../examples/SecurityWarnings';
import { analyzeSocialRecovery, scoreBackupPosture } from '../examples/engines';
import type { BackupPosture, SocialRecoveryPolicy } from '../examples/types';

export default function SocialRecoveryPage() {
  const [posture, setPosture] = useState<BackupPosture>({
    offlineCopies: 1,
    restoreDrilled: false,
    ownerSeparatedFromDaily: true,
    writtenRunbook: false,
  });

  const [policy, setPolicy] = useState<SocialRecoveryPolicy>({
    helperCount: 2,
    threshold: 1,
    helpersHoldFullSeeds: true,
    usesMultisigWeights: false,
  });

  const backupScore = useMemo(() => scoreBackupPosture(posture), [posture]);
  const risks = useMemo(() => analyzeSocialRecovery(policy), [policy]);

  const highCount = risks.filter((r) => r.level === 'high').length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <header>
          <p className="text-xs uppercase tracking-widest text-emerald-400/80">
            Pixel Journey · Security
          </p>
          <h1 className="text-2xl font-bold tracking-wide text-emerald-400 mt-1">
            SOCIAL RECOVERY & KEY BACKUP
          </h1>
          <p className="text-sm opacity-60 mt-2 max-w-xl">
            Educational posture scoring and multi-party recovery risk analysis.
            Not custody advice. Prefer multi-sig weights over sharing seeds.
          </p>
        </header>

        <section className="border border-white/10 rounded-2xl bg-black/40 p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-emerald-400/90">
              Backup posture
            </h2>
            <p className="font-mono text-sm">
              score:{' '}
              <span
                className={
                  backupScore.score >= 75
                    ? 'text-emerald-400'
                    : backupScore.score >= 50
                      ? 'text-amber-300'
                      : 'text-red-400'
                }
              >
                {backupScore.score}/100
              </span>
            </p>
          </div>

          <label className="block text-xs opacity-70">
            Offline copies: {posture.offlineCopies}
            <input
              type="range"
              min={0}
              max={5}
              value={posture.offlineCopies}
              onChange={(e) =>
                setPosture((p) => ({
                  ...p,
                  offlineCopies: Number(e.target.value),
                }))
              }
              className="w-full mt-1"
            />
          </label>

          {(
            [
              ['restoreDrilled', 'Restore drill completed'],
              ['ownerSeparatedFromDaily', 'Owner separated from daily key'],
              ['writtenRunbook', 'Written runbook (not only a website)'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={posture[key]}
                onChange={(e) =>
                  setPosture((p) => ({ ...p, [key]: e.target.checked }))
                }
              />
              {label}
            </label>
          ))}

          <BackupChecklist posture={posture} />
        </section>

        <section className="border border-white/10 rounded-2xl bg-black/40 p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-amber-200/90">
              Social recovery policy
            </h2>
            <p className="text-xs font-mono opacity-70">
              high flags: {highCount}
            </p>
          </div>

          <label className="block text-xs opacity-70">
            Helpers: {policy.helperCount}
            <input
              type="range"
              min={0}
              max={7}
              value={policy.helperCount}
              onChange={(e) =>
                setPolicy((p) => ({
                  ...p,
                  helperCount: Number(e.target.value),
                }))
              }
              className="w-full mt-1"
            />
          </label>

          <label className="block text-xs opacity-70">
            Threshold (M of N): {policy.threshold}
            <input
              type="range"
              min={1}
              max={7}
              value={policy.threshold}
              onChange={(e) =>
                setPolicy((p) => ({
                  ...p,
                  threshold: Number(e.target.value),
                }))
              }
              className="w-full mt-1"
            />
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={policy.helpersHoldFullSeeds}
              onChange={(e) =>
                setPolicy((p) => ({
                  ...p,
                  helpersHoldFullSeeds: e.target.checked,
                }))
              }
            />
            Helpers hold full seeds (anti-pattern)
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={policy.usesMultisigWeights}
              onChange={(e) =>
                setPolicy((p) => ({
                  ...p,
                  usesMultisigWeights: e.target.checked,
                }))
              }
            />
            Uses multi-sig / weighted permissions
          </label>

          <SecurityWarnings policy={policy} />
        </section>

        <RecoveryWorkflow />

        <p className="text-xs opacity-50">
          Pure engines: <code className="text-emerald-400/80">scoreBackupPosture</code>,{' '}
          <code className="text-emerald-400/80">analyzeSocialRecovery</code>. Pair with
          multi-sig and hardware-wallet blueprints for production designs.
        </p>
      </div>
    </div>
  );
}
