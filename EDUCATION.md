# Social recovery & key backup on WAX / Antelope

## Core distinction

| Phrase | Meaning here |
|--------|----------------|
| Key backup | Offline copies + restore drills + owner ≠ daily active |
| Social recovery | **Weighted** keys/accounts on `owner` (M-of-N) — not sharing full seeds |
| Cloud Wallet “forgot password” | **Product** recovery for that wallet — one path, never the only path |

## Authority models (in the app)

1. **Single key** — simple, fragile if undrilled  
2. **Multi-key** — several of *your* keys with weights  
3. **Account-auth** — friends’ accounts on your owner (preferred social pattern)  
4. **eosio.msig** — propose/approve/exec trail  
5. **Hybrid** — your key + helpers  

## Worked scenarios

Solo paper · Hardware + paper · 2-of-3 friends · Family anti-pattern · DAO 3-of-5  
Plus a conceptual 2-of-3 `updateauth` sketch (not auto-broadcast).

## Signing guidance

Use **WharfKit** + **Anchor** for live authority changes. Avoid eosjs/UAL greenfield. Practice on throwaway accounts. Preview auth JSON on device.

## Related

multi-sig builder · hardware patterns · session keys · safe key rotation · PX §11 resilience  
