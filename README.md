# wax-social-recovery-and-key-backup-tools

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** ✅ Pass 4 complete  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

Educational **backup posture**, **social recovery risk** analysis, **offline runbooks**, and **live public** `get_account` inspection for WAX/Antelope.

## Quick start

```bash
npm install && npm test && npm run dev
```

```ts
import { fetchAccountPermissions, derivePostureHints } from "./examples/live/getAccount";

const view = await fetchAccountPermissions("eosio");
const hints = derivePostureHints(view);
```

## What you get

| Layer | Features |
|-------|----------|
| Pure engines | `scoreBackupPosture`, `analyzeSocialRecovery`, `generateRunbookMarkdown` |
| Live (read-only) | Multi-RPC `get_account`, owner/active cards, posture hints |
| UI | Interactive checklists, runbook copy/download, branched recovery scenarios |
| Docs | Owner vs active primer, related multi-sig / hardware blueprints |

**Never** paste private keys here. Prefer multi-sig weights over sharing seeds.

## License

MIT — **Pixel Journey**
