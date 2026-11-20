# Security — social recovery and backup scores

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Threshold 1 | high risk (`threshold-1`) |
| Helpers hold full seeds | risk `seed-sharing` |
| Threshold > total weight | `impossible` |
| Balanced 2-of-3 | low risk |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Live `updateauth` | WharfKit + confirmation only |
| Seed collection | never in educational UI |
| Cloud Wallet alone | one path, never the only path |

## Attack angles

1. Sharing full seeds and calling it social recovery.  
2. Threshold 1 so one helper moves owner alone.  
3. Impossible threshold that locks the account forever.

## Honesty limits

[WAX permissions](https://docs.wax.io/build/core-concepts/permissions) · [Security and recovery](https://docs.wax.io/learn/getting-started/security-and-recovery) · [WharfKit](https://wharfkit.com/).
