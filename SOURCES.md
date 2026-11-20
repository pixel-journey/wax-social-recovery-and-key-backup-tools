# Sources

| Source | Use |
| --- | --- |
| [WAX permissions](https://docs.wax.io/build/core-concepts/permissions) | Weighted owner |
| [Security and recovery](https://docs.wax.io/learn/getting-started/security-and-recovery) | Habits |
| [rotation](https://github.com/pixel-journey/wax-safe-key-rotation-assistant) | Safe add-before-remove |
| [msig builder](https://github.com/pixel-journey/wax-multi-sig-proposal-builder-and-simulator) | Named proposals vs permission weights |

## Product facts locked by tests

- Strong offline backup habits → backup score **100**; weak → **0**.
- Threshold **1** → risk `threshold-1` at **high** (one helper can move owner alone).
- Helpers holding full seeds → `seed-sharing` risk.
- Threshold 5 with only 2 weight total → `impossible`.
- Social recovery = **weighted accounts on owner**, not shared seeds.
- No `updateauth` broadcast; no seed collection in the lab.
