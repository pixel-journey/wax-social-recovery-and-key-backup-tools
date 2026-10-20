# VERIFICATION-LOG — wax-social-recovery-and-key-backup-tools

**Trust label:** `educational-reference`  
**Updated:** 2026-10-20 (Pass 2)

| Claim | Status | Evidence |
|-------|--------|----------|
| scoreBackupPosture / analyzeSocialRecovery | **verified** (unit) | `engines.test.ts` |
| generateRunbookMarkdown account + threshold | **verified** (unit) | `runbook.test.ts` |
| Owner vs active primer | **partial** | `OwnerActivePrimer.tsx` educational |
| Runbook copy/download UI | **partial** | `RunbookPanel.tsx` |
| Related multi-sig / hardware links | **partial** | `RelatedBlueprints.tsx` |
| a11y labels / live regions | **partial** | page + high-risk `role="alert"` |
| On-chain msig propose | **out of scope** | use multi-sig blueprint |

```bash
npm install && npm test && npm run typecheck
```
