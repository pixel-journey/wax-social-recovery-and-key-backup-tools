# VERIFICATION-LOG — wax-social-recovery-and-key-backup-tools

**Trust label:** `educational-reference`  
**Updated:** 2026-10-20 (Pass 3)

| Claim | Status | Evidence |
|-------|--------|----------|
| Backup / social engines | **verified** (unit) | `engines.test.ts` |
| Runbook markdown | **verified** (unit) | `runbook.test.ts` |
| summarizeAccount shared-key note | **verified** (unit) | `live/getAccount.test.ts` |
| summarizeAccount multi-party owner note | **verified** (unit) | same |
| Live get_account UI | **partial** | `PermissionSummaryPanel` — network dependent |
| Soft-fail on bad account | **partial** | panel error state |

Smoke (manual):

```bash
curl -sS https://wax.greymass.com/v1/chain/get_account \
  -d '{"account_name":"eosio"}'
```

```bash
npm test && npm run typecheck
```
