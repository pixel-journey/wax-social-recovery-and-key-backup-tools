# wax-social-recovery-and-key-backup-tools

> **Trust label:** `educational-reference`  
> **Status:** Passes **1–4** + **Pass 5** education primer (2026-10-26)

On **WAX/Antelope**, “social recovery” means **multi-party authority design** (weighted keys/accounts on `owner` / recovery permissions) — **not** emailing seeds, and **not** the same as Cloud Wallet’s product “forgot password.”

This repo teaches **backup posture**, **social-recovery risk flags**, **offline runbooks**, and **read-only** `get_account` inspection.

```bash
npm install && npm test && npm run dev
```

**Start here:** [EDUCATION.md](./EDUCATION.md) · [POLICY.md](./POLICY.md)

| Layer | Features |
|-------|----------|
| Pure | Backup score, social recovery risk, runbook markdown |
| Live (read-only) | Multi-RPC `get_account`, permission cards, posture hints |
| UI | Checklists, runbook export, recovery scenarios |

**Never** paste private keys here.

MIT — Pixel Journey
