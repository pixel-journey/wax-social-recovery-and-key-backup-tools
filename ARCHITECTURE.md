# ARCHITECTURE.md — Social Recovery & Key Backup

## Intent

Guide responsible recovery design: backups first, multi-party second, SaaS never as the only path.

## Invariants

| # | Invariant |
|---|-----------|
| 1 | Risks are cited with triggers |
| 2 | Checklists are pure / testable |
| 3 | Single-helper full control is flagged high risk |
| 4 | Docs do not encourage sharing full seeds with “helpers” |
| 5 | Recovery steps should survive frontend disappearance (PX §11) |

## Layers

```
User answers / policy inputs
  → engines (backup score, recovery risk flags)
  → SecurityWarnings / BackupChecklist / RecoveryWorkflow
```

## Extensions

Live permission graphs, hardware co-signer onboarding, msig templates for recovery accounts.

---

*Pixel Journey*
