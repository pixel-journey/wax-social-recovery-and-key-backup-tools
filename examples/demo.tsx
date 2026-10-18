"use client";

import { BackupChecklist } from "./BackupChecklist";
import { SecurityWarnings } from "./SecurityWarnings";
import { RecoveryWorkflow } from "./RecoveryWorkflow";
import type { BackupPosture, SocialRecoveryPolicy } from "./types";

const DEMO_BACKUP: BackupPosture = {
  offlineCopies: 1,
  restoreDrilled: false,
  ownerSeparatedFromDaily: true,
  writtenRunbook: false,
};

const DEMO_POLICY: SocialRecoveryPolicy = {
  helperCount: 2,
  threshold: 1,
  helpersHoldFullSeeds: true,
  usesMultisigWeights: false,
};

export default function SocialRecoveryDemo() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wider text-emerald-400/80">
          Pixel Journey · Security
        </p>
        <h1 className="text-2xl font-bold text-white">
          Social Recovery & Backup Demo
        </h1>
        <p className="text-sm text-white/60 max-w-2xl">
          Fixture posture deliberately weak to surface checklist and risk flags.
          Educational only — not personalized security advice.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <BackupChecklist posture={DEMO_BACKUP} />
        <SecurityWarnings policy={DEMO_POLICY} />
      </div>
      <RecoveryWorkflow />
    </div>
  );
}
