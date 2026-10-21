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
import { fetchAccountPermissions, derivePostureHints } from "./src/live/getAccount";

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

## Queries and unsigned transactions

`src/api.ts` builds the HTTP requests. `src/usecases.ts` is the worked case: those requests, and an unsigned transaction when this repo already has an action or the chain action is the standard Antelope one for the topic. `executed` is false. Nothing is sent.

The code used to sit in `examples/`. GitHub treats that directory as documentation, so the language bar hid the TypeScript.
