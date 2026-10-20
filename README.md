# wax-social-recovery-and-key-backup-tools

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** 🔄 Pass 1 — pure engines + interactive app shell  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

Educational **key backup posture** and **social / multi-party recovery** risk analysis for Antelope/WAX. Not a custody product and not a promise that recovery is risk-free.

## Quick start

```bash
npm install
npm test
npm run dev
```

```ts
import { scoreBackupPosture, analyzeSocialRecovery } from "./examples/engines";

const { score } = scoreBackupPosture({
  offlineCopies: 2,
  restoreDrilled: true,
  ownerSeparatedFromDaily: true,
  writtenRunbook: true,
});

const risks = analyzeSocialRecovery({
  helperCount: 3,
  threshold: 2,
  helpersHoldFullSeeds: false,
  usesMultisigWeights: true,
});
```

## Core ideas

| Concept | Meaning |
|---------|--------|
| Seed / key backup | Offline, tested copies that restore signing ability |
| Social recovery | Trusted parties help restore control (often msig) |
| Threshold | M-of-N so no single helper acts alone |
| Owner vs active | Recover at the right Antelope permission level |

**Do:** test restores, separate owner from daily keys, written runbooks, real thresholds.  
**Don’t:** share full seeds in chats, 1-of-N “social” recovery, rely on a single website for instructions (PX §11).

## Related

- `wax-multi-sig-proposal-builder-and-simulator`
- `wax-hardware-wallet-integration-patterns`
- `wax-secure-key-management-and-privacy-tools`

## License

MIT — **Pixel Journey**
