# Architecture — Social Recovery & Key Backup

## Intent

Guide **on-chain** recovery design for Antelope/WAX:

1. Backups of keys the user controls  
2. Multi-party **weighted** authorities (true “social recovery”)  
3. Never SaaS-only recovery; never “share full seed with helpers”

See [EDUCATION.md](./EDUCATION.md) for product vs chain distinctions.

## Invariants

| # | Invariant |
|---|-----------|
| 1 | Risks are cited with triggers |
| 2 | Checklists are pure / testable |
| 3 | Single-helper full control is flagged high risk |
| 4 | Docs do not encourage sharing full seeds |
| 5 | Recovery steps should survive frontend disappearance (PX §11) |

## Layers

```
User answers / policy inputs
  → engines (backup score, recovery risk flags)
  → UI (checklists, warnings, runbook, live permission summary)
```

## Non-goals

Custody service · msig signing UI · private key handling · Cloud Wallet password reset

*Pixel Journey*
