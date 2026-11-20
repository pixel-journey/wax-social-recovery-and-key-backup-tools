# Security — social recovery and backup scores

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Threshold 1 | high risk (`threshold-1`) |
| Helpers hold full seeds | risk `seed-sharing` |
| Threshold > total weight | `impossible` |
| Balanced 2-of-3 | low risk (`balanced`) |
| Weight-2 alone at threshold 2 | note contains `Self alone` |
| Backup score extremes | 3 drilled offline copies → 100; zero hygiene → 0 |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Live `updateauth` | WharfKit + explicit confirmation only |
| Seed collection | never in educational UI |
| Cloud Wallet alone | one path, never the only path |
| Helper collusion | model weights so no small coalition reaches threshold alone unless intended |

## Attack angles

1. Sharing full seeds and calling it social recovery.  
2. Threshold 1 so one helper moves `owner` alone.  
3. Impossible threshold that locks the account forever.  
4. Putting the same person on multiple weighted accounts that sum past threshold.  
5. Treating Cloud Wallet password reset as complete owner recovery without offline keys.

## Honesty limits

Scores are **teaching signals**, not chain enforcement. [WAX permissions](https://docs.wax.io/build/core-concepts/permissions) · [Security and recovery](https://docs.wax.io/learn/getting-started/security-and-recovery) · [WharfKit](https://wharfkit.com/). Cluster: [auditor](https://github.com/pixel-journey/wax-account-permission-auditor) · [rotation](https://github.com/pixel-journey/wax-safe-key-rotation-assistant) · [msig](https://github.com/pixel-journey/wax-multi-sig-proposal-builder-and-simulator).
