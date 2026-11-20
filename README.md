# Social recovery is a threshold, not a shared seed

> **Trust:** `educational-reference`  
> **Course:** [EDUCATION.md](EDUCATION.md)

**One-sentence goal:** Score a backup posture, and show that threshold 1 is not recovery, seed sharing is high risk, and a 2-of-3 weight design has three minimal pairs — including one that excludes you.

**Code under test:** `npm test` (33). Does not broadcast `updateauth`. Does not ask for a seed.

Official: [WAX permissions](https://docs.wax.io/build/core-concepts/permissions) · [Security and recovery](https://docs.wax.io/learn/getting-started/security-and-recovery).

## What is true (executed)

| Rule | Result |
| --- | --- |
| Perfect backup posture | score 100 |
| One undrilled copy, owner mixed with daily | score 0 |
| Threshold 1 with 3 helpers | `threshold-1` high |
| Helpers hold full seeds | `seed-sharing` |
| 2-of-3, no seed sharing | `balanced` low |
| Threshold 5 with 2 helpers | `impossible` |
| You alone at the threshold | note `Self alone` |

## Related

- [auditor](https://github.com/pixel-journey/wax-account-permission-auditor) — foreign helpers on owner are not the critical self-active bug
- [rotation](https://github.com/pixel-journey/wax-safe-key-rotation-assistant)
- [eosio.msig builder](https://github.com/pixel-journey/wax-multi-sig-proposal-builder-and-simulator) — a named proposal, not this permission weight
- [hardware](https://github.com/pixel-journey/wax-hardware-wallet-integration-patterns)
- [session keys](https://github.com/pixel-journey/wax-wharfkit-session-keys-and-linked-permissions)

```bash
npm test
```

MIT — Pixel Journey
