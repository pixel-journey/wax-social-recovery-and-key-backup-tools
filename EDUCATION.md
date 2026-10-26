# What this repo is about (WAX / Antelope)

## Short answer

**Social recovery** here means designing **who can restore control of an Antelope account** using **weighted keys/accounts on `owner` (or a recovery permission)** — M-of-N — **without** giving any one helper your full seed.

**Key backup** means offline copies, restore drills, and separating `owner` from daily `active`.

Cloud Wallet “forgot password” is a **product** recovery path. Useful as *one* path; **not** a substitute for on-chain authority design.

## Worked scenarios (in the app)

| Id | Intent |
|----|--------|
| solo-paper | Two offline copies, no helpers |
| hw-plus-paper | Hardware owner + paper |
| 2-of-3-friends | Weighted friends (preferred social pattern) |
| family-anti-pattern | One relative holds full seed (flagged) |
| dao-treasury-style | 3-of-5 ops council |

Each applies checklist values and explains the **on-chain shape**. A 2-of-3 `updateauth` **sketch** is included for learning; broadcast via WharfKit on a throwaway account only after you understand it (see multi-sig blueprint).

## Related blueprints

- multi-sig proposal builder — propose/approve/exec  
- hardware wallet patterns — device isolation  
- session keys — limited dApp permissions  
