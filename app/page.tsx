'use client';

import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { BackupChecklist } from '../src/BackupChecklist';
import { OwnerActivePrimer } from '../src/OwnerActivePrimer';
import { PermissionSummaryPanel } from '../src/PermissionSummaryPanel';
import { RecoveryWorkflow } from '../src/RecoveryWorkflow';
import { RelatedBlueprints } from '../src/RelatedBlueprints';
import { RunbookPanel } from '../src/RunbookPanel';
import { SecurityWarnings } from '../src/SecurityWarnings';
import { analyzeSocialRecovery, scoreBackupPosture } from '../src/engines';
import type { PostureHints } from '../src/live/getAccount';
import {
  buildShareSearchParam,
  decodeShareState,
} from '../src/shareState';
import { clearState, loadState, saveState } from '../src/stateStorage';
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
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const q = new URLSearchParams(window.location.search).get('sr');
      if (q) {
        const shared = decodeShareState(q);
        if (shared) {
          setPosture(shared.posture);
          setPolicy(shared.policy);
          setMessage('Loaded plan from share URL');
          window.history.replaceState({}, '', window.location.pathname);
          return;
        }
      }
    }
    const loaded = loadState();
    if (loaded.ok && loaded.value) {
      setPosture(loaded.value.posture);
      setPolicy(loaded.value.policy);
      setMessage('Restored draft from localStorage');
    }
  }, []);

  const onLiveView = useCallback((_view: unknown, hints: PostureHints) => {
    setLiveHint(hints.reason);
    setPosture((p) => ({
      ...p,
      ownerSeparatedFromDaily: hints.ownerSeparatedFromDaily,
    }));
    setPolicy((pol) => ({
      ...pol,
      usesMultisigWeights: hints.usesMultisigWeights,
      helperCount: hints.suggestedHelperCount ?? pol.helperCount,
      threshold: hints.suggestedThreshold ?? pol.threshold,
      helpersHoldFullSeeds: false,
    }));
  }, []);

  const backupScore = useMemo(() => scoreBackupPosture(posture), [posture]);
  const risks = useMemo(() => analyzeSocialRecovery(policy), [policy]);
  const highCount = risks.filter((r) => r.level === 'high').length;

  const copyShare = async () => {
    const param = buildShareSearchParam({ posture, policy });
    const url =
      typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}?${param}`
        : `?${param}`;
    try {
      await navigator.clipboard.writeText(url);
      setMessage('Share URL copied');
    } catch {
      setMessage('Clipboard unavailable');
    }
  };

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
            On Antelope, social recovery means <strong>weighted authorities</strong>{' '}
            on your account — not Cloud Wallet password reset, and not sharing full
            seeds. See EDUCATION.md.
          </p>
        </header>

        <section
          className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-100/90 space-y-2"
          role="note"
        >
          <p className="font-medium text-sm">Product recovery ≠ on-chain recovery</p>
          <p>
            Cloud Wallet “forgot password” is a <em>wallet product</em> path. This
            tool is about <em>account permissions</em>: offline key backups,{' '}
            <code className="text-amber-50">owner</code>/<code className="text-amber-50">active</code>{' '}
            separation, and M-of-N helpers who do <strong>not</strong> each hold your
            whole seed.
          </p>
        </section>

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

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="px-3 py-2 rounded-lg text-sm bg-emerald-800"
              onClick={() => void copyShare()}
            >
              Copy share URL
            </button>
            <button
              type="button"
              className="px-3 py-2 rounded-lg text-sm bg-violet-700"
              onClick={() => {
                const r = saveState({ posture, policy });
                setMessage(r.ok ? 'Draft saved' : r.reason ?? 'save failed');
              }}
            >
              Save draft
            </button>
            <button
              type="button"
              className="px-3 py-2 rounded-lg text-sm bg-white/10"
              onClick={() => {
                clearState();
                setMessage('Draft cleared');
              }}
            >
              Clear draft
            </button>
          </div>

          <div>
            <label className="block text-xs opacity-70" htmlFor="offline-copies">
              Offline key copies (paper / hardware / air-gapped): {posture.offlineCopies}
            </label>
            <input
              id="offline-copies"
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
          </div>

          {(
            [
              ['restoreDrilled', 'Restore drill on a throwaway account'],
              ['ownerSeparatedFromDaily', 'Owner key ≠ daily active/hot key'],
              ['writtenRunbook', 'Written runbook outside a single website'],
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

        <section
          className="border border-white/10 rounded-2xl bg-black/40 p-5 space-y-4"
          aria-labelledby="policy-heading"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="policy-heading" className="text-sm font-semibold text-amber-200/90">
              Social recovery policy (on-chain weights)
            </h2>
            <p className="text-xs font-mono opacity-70" id={highId} aria-live="polite">
              high flags: {highCount}
            </p>
          </div>

          <p className="text-[11px] opacity-60">
            Helpers = other keys or accounts on your <code>owner</code> (or recovery)
            permission. Threshold = minimum weight to change authority. Prefer
            multi-sig weights over full-seed sharing.
          </p>

          <div>
            <label className="block text-xs opacity-70" htmlFor="helpers">
              Helpers (N): {policy.helperCount}
            </label>
            <input
              id="helpers"
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
          </div>

          <div>
            <label className="block text-xs opacity-70" htmlFor="threshold">
              Threshold M of N: {policy.threshold}
            </label>
            <input
              id="threshold"
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
            Uses multi-sig / weighted permissions (preferred)
          </label>

          <SecurityWarnings policy={policy} />
        </section>

        <RunbookPanel posture={posture} policy={policy} />

        <RecoveryWorkflow />

        <RelatedBlueprints />

        {message && (
          <p className="text-xs text-emerald-200/80" role="status">
            {message}
          </p>
        )}

        <p className="text-xs opacity-50">
          Passes 5–8 · educational-reference · never paste keys
        </p>
      </div>
    </div>
  );
}
