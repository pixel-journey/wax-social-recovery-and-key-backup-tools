# Social recovery and key backup on WAX / Antelope

> **Rung:** `npm test` passes (33). Scores and risks are arguments. Nothing here broadcasts `updateauth` or collects a seed.  
> **The test is the rule.** Official model: [WAX permissions](https://docs.wax.io/build/core-concepts/permissions). Recovery habits: [Security and recovery](https://docs.wax.io/learn/getting-started/security-and-recovery).

Social recovery here means **weighted accounts on `owner`**. It does not mean handing helpers a copy of the seed.

## Predict, then run

| Call | Locked result |
| --- | --- |
| 3 offline copies, drilled, owner separated, written runbook | backup score `100` |
| 1 copy, not drilled, owner not separated, no runbook | backup score `0` |
| 3 helpers, threshold `1` | risk id `threshold-1` at `high` |
| helpers hold full seeds | risk id `seed-sharing` |
| 3 helpers, threshold `2`, no seed sharing, weights on | risk id `balanced` at `low` |
| 2 helpers, threshold `5` | risk id `impossible` |
| weights 1, 1, 1 and threshold 2 | `canReachThreshold` is false for you alone, true for you+bob; 3 minimal pairs |
| you alone with weight 2 and threshold 2 | a note containing `Self alone` |

A threshold of 1 is not recovery. One helper can move `owner` without you. Two helpers and a threshold of 5 can never move it.

## Where this sits

| Question | Repo |
| --- | --- |
| Does `alice@active` sit on `alice@owner`? | [auditor](https://github.com/pixel-journey/wax-account-permission-auditor) |
| What does the tree look like? | [visualizer](https://github.com/pixel-journey/wax-permission-visualizer-and-editor) |
| How do I add a key without locking the account? | [rotation](https://github.com/pixel-journey/wax-safe-key-rotation-assistant) |
| How does a named proposal differ from a permission threshold? | [eosio.msig builder](https://github.com/pixel-journey/wax-multi-sig-proposal-builder-and-simulator) |
| Where should the owner key live? | [hardware patterns](https://github.com/pixel-journey/wax-hardware-wallet-integration-patterns) |
| Daily actions without the owner key | [session keys](https://github.com/pixel-journey/wax-wharfkit-session-keys-and-linked-permissions) |

## Core distinction


| Phrase | Meaning here |
|--------|----------------|
| Key backup | Offline copies + restore drills + owner ≠ daily active |
| Social recovery | **Weighted** keys/accounts on `owner` (M-of-N) — not sharing full seeds |
| Cloud Wallet “forgot password” | **Product** recovery — one path, never the only path |

## App modules (Passes 1–14)

1. Myths vs reality  
2. Recommender + gap list  
3. Approach comparison matrix  
4. Worked scenarios (8) + 2-of-3 `updateauth` sketch  
5. Authority models (single-key → hybrid + WharfKit notes)  
6. **Weight design lab** (shared threshold + collusion)  
7. Hybrid owner sketch  
8. Live read-only `get_account`  
9. Backup / policy checklists + risk flags  
10. Runbook + JSON/share exports + print  
11. Drills + incident playbooks  
12. Glossary + related blueprints  

## Signing guidance

**WharfKit** + **Anchor** for live authority changes. Avoid eosjs/UAL greenfield. Throwaway accounts first.

## Non-goals

Custody service · auto-broadcast of `updateauth` · private key collection  
