# Social recovery & key backup on WAX / Antelope

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
