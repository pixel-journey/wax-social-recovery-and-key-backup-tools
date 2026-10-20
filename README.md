# wax-social-recovery-and-key-backup-tools

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** 🔄 Pass 2 — runbook + owner/active primer + related blueprints  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

Educational **key backup posture** and **social recovery** risk analysis for Antelope/WAX — plus an **offline-first runbook** draft. Not a custody product.

## Quick start

```bash
npm install && npm test && npm run dev
```

```ts
import { scoreBackupPosture, analyzeSocialRecovery } from "./examples/engines";
import { generateRunbookMarkdown } from "./examples/runbook";

const posture = {
  offlineCopies: 2,
  restoreDrilled: true,
  ownerSeparatedFromDaily: true,
  writtenRunbook: true,
};
const policy = {
  helperCount: 3,
  threshold: 2,
  helpersHoldFullSeeds: false,
  usesMultisigWeights: true,
};

scoreBackupPosture(posture);
analyzeSocialRecovery(policy);
generateRunbookMarkdown({ accountName: "alice.wam", posture, policy });
```

## Pass 2 surface

| Piece | Role |
|-------|------|
| Owner vs active primer | Antelope permission model in plain language |
| Interactive checklists | Backup score + social risk flags |
| Runbook panel | Copy / download markdown from current answers |
| Related blueprints | Multi-sig, hardware, resilience links |

**Do:** real M-of-N, hardware for owner, restore drills, offline docs.  
**Don’t:** share full seeds, 1-of-N “helpers,” single-website runbooks.

## License

MIT — **Pixel Journey**
