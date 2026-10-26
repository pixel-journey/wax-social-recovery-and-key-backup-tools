/**
 * Educational recovery runbook templates — offline-first (PX §11).
 */

import type { BackupPosture, SocialRecoveryPolicy } from "./types";

export interface RunbookInput {
  accountName?: string;
  posture: BackupPosture;
  policy: SocialRecoveryPolicy;
  reviewedAt?: string;
}

export function generateRunbookMarkdown(input: RunbookInput): string {
  const account = input.accountName?.trim() || "<ACCOUNT.WAM>";
  const reviewed = input.reviewedAt || new Date().toISOString().slice(0, 10);
  const { posture, policy } = input;

  const thresholdLine =
    policy.helperCount > 0
      ? `${policy.threshold}-of-${policy.helperCount}`
      : "(define helpers)";

  return `# Recovery runbook — ${account}

**Last reviewed:** ${reviewed}  
**Nature:** Operational notes — not legal advice.  
**Continuity:** Offline + git. Do not rely on a single website (PX §11).

---

## 1. Account facts

| Field | Value |
|-------|--------|
| Account | \`${account}\` |
| Explorer | https://waxblock.io/account/${account} |
| Owner vs active | Owner can change active; active cannot replace owner |

## 2. Backup posture (self-reported)

| Check | Status |
|-------|--------|
| Offline copies | ${posture.offlineCopies} |
| Restore drilled | ${posture.restoreDrilled ? "yes" : "NO — drill before crisis"} |
| Owner separated from daily | ${posture.ownerSeparatedFromDaily ? "yes" : "NO — high phishing impact"} |
| Written runbook | ${posture.writtenRunbook ? "yes" : "this file may be the first draft"} |

## 3. Social / multi-party recovery

| Field | Value |
|-------|--------|
| Threshold | ${thresholdLine} |
| Helpers hold full seeds | ${policy.helpersHoldFullSeeds ? "YES — reduce this risk" : "no (prefer msig / account-auth weights)"} |
| Uses multi-sig weights | ${policy.usesMultisigWeights ? "yes" : "document how helpers authorize"} |

**Preferred encoding:** account authorities on \`owner\` (friend@active with weights) **or** eosio.msig for propose/approve/exec — **not** full-seed sharing.

**Helper contacts (fill offline):**

1. Name / account: ________  Contact: ________
2. Name / account: ________  Contact: ________
3. Name / account: ________  Contact: ________

## 4. If daily (active) key is lost

1. Confirm on explorer that **owner** is still under your control.
2. From owner, \`updateauth\` on active (WharfKit + Anchor; preview first).
3. Revoke compromised keys.
4. Rotate dApp session permissions if any.
5. Incident log + update this runbook.

## 5. If owner access is lost

1. Active alone cannot replace owner.
2. Execute **${thresholdLine}** via pre-arranged account-auth and/or eosio.msig.
3. If no valid owner path exists, the account may be unrecoverable.

## 6. Tooling (sign, do not invent)

- **WharfKit Session** + Anchor (Ledger often via Anchor)
- Avoid greenfield **eosjs** / **UAL** for authority changes
- Multi-sig UI patterns: \`wax-multi-sig-proposal-builder-and-simulator\`
- Hardware isolation: \`wax-hardware-wallet-integration-patterns\`
- Limited dApp keys: \`wax-wharfkit-session-keys-and-linked-permissions\`

## 7. Drill checklist (throwaway first)

- [ ] Create test account
- [ ] Practice restore from offline backup
- [ ] Practice msig or weighted owner path on test
- [ ] Time the full path; fix unclear steps

## 8. Cloud Wallet note

Product “forgot password” only restores keys that product controls. Keep independent offline owner material.

---

*Pixel Journey educational tools — verify every on-chain step yourself.*
`;
}

export const OWNER_ACTIVE_BULLETS = [
  {
    title: "owner",
    body: "Ultimate control. Can change active and other owner authorities. Treat as cold / high-assurance.",
  },
  {
    title: "active",
    body: "Day-to-day signing. Cannot replace owner. Compromise hurts funds/activity; owner can still remediate if intact.",
  },
  {
    title: "Recovery design",
    body: "Losing only active is recoverable if owner is safe. Losing owner without a multi-party path is often permanent.",
  },
] as const;
