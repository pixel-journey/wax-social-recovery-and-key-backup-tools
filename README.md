# wax-social-recovery-and-key-backup-tools

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** 🔄 Pass 3 — live read-only permission summary  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

Educational backup posture, social recovery risks, offline runbooks, and **public** `get_account` permission inspection for WAX/Antelope.

## Quick start

```bash
npm install && npm test && npm run dev
```

```ts
import { fetchAccountPermissions } from "./examples/live/getAccount";

const view = await fetchAccountPermissions("eosio");
// view.owner / view.active thresholds, keys, account auths + structural notes
```

## Pass 3

| Piece | Role |
|-------|------|
| `fetchAccountPermissions` | RPC `get_account` → structured owner/active |
| Structural notes | Shared owner/active keys, single-key owner, multi-party owner |
| `PermissionSummaryPanel` | UI — never requests private keys |

Still educational only. Pair with multi-sig + hardware blueprints for production designs.

## License

MIT — **Pixel Journey**
