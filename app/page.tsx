'use client';

import React, { useCallback, useId, useMemo, useState } from 'react';
import { BackupChecklist } from '../src/BackupChecklist';
import { OwnerActivePrimer } from '../src/OwnerActivePrimer';
import { PermissionSummaryPanel } from '../src/PermissionSummaryPanel';
import { RecoveryWorkflow } from '../src/RecoveryWorkflow';
import { RelatedBlueprints } from '../src/RelatedBlueprints';
import { RunbookPanel } from '../src/RunbookPanel';
import { SecurityWarnings } from '../src/SecurityWarnings';
import { analyzeSocialRecovery, scoreBackupPosture } from '../src/engines';
import type { PostureHints } from '../src/live/getAccount';
import type { BackupPosture, SocialRecoveryPolicy } from '../src/types';

export default function SocialRecoveryPage() {
  const scoreId = useId();
  const highId = useId();

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

  const [liveHint, setLiveHint] = useState<string | null>(null);

  const onLiveView = useCallback((_view: unknown, hints: PostureHints) => {
    setLiveHint(hints.reason);
    setPosture((p) => ({
      ...p,
      ownerSeparatedFromDaily: hints.ownerSeparatedFromDaily,
    }));
    setPolicy((pol) => ({
      ...pol,
      usesMultisigWeights: hints.usesMultisigWeights,
      helperCount:
        hints.suggestedHelperCount ?? pol.helperCount,
      threshold: hints.suggestedThreshold ?? pol.threshold,
      // Live structure never implies seed-sharing
      helpersHoldFullSeeds: false,
    }));
  }, []);

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
            Live public permissions, posture scoring, offline runbooks. Educational
            only — not custody advice.
          </p>
        </header>

        <OwnerActivePrimer />

        <PermissionSummaryPanel onView={onLiveView} />

        {liveHint && (
          <p className="text-xs text-cyan-200/80" role="status">
            Applied from chain: {liveHint}
          </p>
        )}

        <section
          className="border border-white/10 rounded-2xl bg-black/40 p-5 space-y-4"
          aria-labelledby="backup-heading"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="backup-heading" className="text-sm font-semibold text-emerald-400/90">
              Backup posture
            </h2>
            <p className="font-mono text-sm" id={scoreId} aria-live="polite">
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

          <div>
            <label className="block text-xs opacity-70" htmlFor="offline-copies">
              Offline copies: {posture.offlineCopies}
            </label>
            <input
              id="offline-copies"
              type="range"
              min={0}
              max={5}
              value={posture.offlineCopies}
              aria-valuemin={0}
              aria-valuemax={5}
              aria-valuenow={posture.offlineCopies}
              aria-describedby={scoreId}
              onChange={(e) =>
                setPosture((p) => ({
                  ...p,
                  offlineCopies: Number(e.target.value),
                }))
              }
              className="w-full mt-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            />
          </div>

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
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              />
              {label}
            </label>
          ))}

          <BackupChecklist posture={posture} />
        </section>

        <section
          className="border border-white/10 rounded-2xl bg-black/40 p-5 space-y-4"
          aria-labelledby="policy-heading"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="policy-heading" className="text-sm font-semibold text-amber-200/90">
              Social recovery policy
            </h2>
            <p className="text-xs font-mono opacity-70" id={highId} aria-live="polite">
              high flags: {highCount}
            </p>
          </div>

          <div>
            <label className="block text-xs opacity-70" htmlFor="helpers">
              Helpers: {policy.helperCount}
            </label>
            <input
              id="helpers"
              type="range"
              min={0}
              max={7}
              value={policy.helperCount}
              aria-valuemin={0}
              aria-valuemax={7}
              aria-valuenow={policy.helperCount}
              onChange={(e) =>
                setPolicy((p) => ({
                  ...p,
                  helperCount: Number(e.target.value),
                }))
              }
              className="w-full mt-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs opacity-70" htmlFor="threshold">
              Threshold (M of N): {policy.threshold}
            </label>
            <input
              id="threshold"
              type="range"
              min={1}
              max={7}
              value={policy.threshold}
              aria-valuemin={1}
              aria-valuemax={7}
              aria-valuenow={policy.threshold}
              aria-describedby={highId}
              onChange={(e) =>
                setPolicy((p) => ({
                  ...p,
                  threshold: Number(e.target.value),
                }))
              }
              className="w-full mt-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            />
          </div>

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
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
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
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            />
            Uses multi-sig / weighted permissions
          </label>

          <SecurityWarnings policy={policy} />
        </section>

        <RunbookPanel posture={posture} policy={policy} />

        <RecoveryWorkflow />

        <RelatedBlueprints />

        <p className="text-xs opacity-50">
          <code className="text-emerald-400/80">fetchAccountPermissions</code> ·{' '}
          <code className="text-emerald-400/80">derivePostureHints</code> ·{' '}
          <code className="text-emerald-400/80">generateRunbookMarkdown</code>
        </p>
      </div>
    </div>
  );
}
