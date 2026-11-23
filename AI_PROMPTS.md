# AI handoff — social recovery and key backup

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [WAX permissions](https://docs.wax.io/build/core-concepts/permissions) | Weighted owner |
| [Security and recovery](https://docs.wax.io/learn/getting-started/security-and-recovery) | Habits |
| [key rotation](https://github.com/pixel-journey/wax-safe-key-rotation-assistant) | Safe add-before-remove |
| [msig builder](https://github.com/pixel-journey/wax-multi-sig-proposal-builder-and-simulator) | Named proposals vs permission weights |
| [session keys](https://github.com/pixel-journey/wax-wharfkit-session-keys-and-linked-permissions) | Limited keys ≠ owner backup |

## Non-negotiables

1. Social recovery = **weighted accounts on owner**, not shared seeds.
2. Threshold **1** → risk `threshold-1` at **high** (one helper can move owner alone).
3. Helpers holding full seeds → `seed-sharing` risk.
4. Threshold 5 with only 2 weight total → `impossible`.
5. Strong offline backup habits → backup score **100**; weak → **0**.
6. No `updateauth` broadcast; no seed collection in the lab.
7. Weighted owner helpers are Antelope-wide; chain id and SessionKit preset are local.

## Prompt seeds

- "Using scoreBackupPosture on this BackupPosture JSON, list failed items first and suggest the minimum fixes."
- "Using analyzeSocialRecovery, critique this SocialRecoveryPolicy. Flag seed-sharing and threshold < 2 as high severity."
- "Draft a one-page recovery runbook outline that still works if every product website for this account is offline."
- "Contrast social recovery helpers with session linkauth limited keys."

## Do not

- Collect or store seed phrases in the product.
- Recommend threshold 1 as safe.
- Broadcast updateauth from pure tests.
- Treat session keys as owner social recovery.
