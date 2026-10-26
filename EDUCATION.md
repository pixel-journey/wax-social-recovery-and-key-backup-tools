# What this repo is about (WAX / Antelope)

You are **not** mostly wrong — the everyday meanings (Cloud Wallet “forgot password”, paper wallets, key backups) are *related* — but on Antelope the durable story is **account permissions**, not a single seed inside a product UI.

## How recovery actually works here

On WAX/Antelope an **account** is controlled by **permissions** (`owner`, `active`, custom). Each permission has a **threshold** and **keys and/or other accounts** with weights.

| Idea people say | What it maps to on-chain |
|-----------------|--------------------------|
| “I backed up my key” | You control a private key that still meets `owner` (or `active`) weight |
| “Social recovery” | **Other people/accounts** hold **weighted keys or account authorities** on *your* `owner` (or a recovery permission) so **M-of-N** can `updateauth` if you lose a device |
| “Forgot password” (Cloud Wallet) | **Custodial / product recovery** for that wallet’s key material — **not** the same as on-chain multi-party authority |
| Paper / hardware wallet | Offline storage of a key that is registered on-chain under a permission |
| Multi-sig recovery | Same family: `eosio.msig` *or* multi-key `owner` — see multi-sig + hardware blueprints |

### Social recovery (this repo’s sense)

**Social recovery** ≈ designing **who can help restore control** without handing them a full seed:

- Prefer **weighted authorities** (friends’ accounts or keys with weights below full threshold alone).
- **Flag as high risk:** one “helper” who alone can change `owner`.
- **Never** teach “email your seed to three friends.”
- Offline **runbooks** so recovery still works if a website disappears (PX §11).

### Key backup (this repo’s sense)

**Backup posture** = checklists and scores for:

- Separate `owner` vs `active` usage
- Second path if one device dies (another key, hardware, multi-sig, trusted parties with *partial* weight)
- No single SaaS as the only recovery path

### What this repo is **not**

- Not Cloud Wallet’s internal password-reset product
- Not a custody service
- Not a place to paste private keys or seeds
- Not a full msig proposer (see `wax-multi-sig-proposal-builder-and-simulator`)
- Not hardware firmware (see `wax-hardware-wallet-integration-patterns`)

## Stack for builders

1. **Backups first** — keys you control, offline, tested restore on a throwaway account.  
2. **Authority design** — `owner` rare; limited session keys for dApps.  
3. **Social / multi-party** — only with thresholds so no single helper has full control.  
4. **WharfKit** for signing when you *do* change authority — never eosjs greenfield.

## Related blueprints

| Repo | Role |
|------|------|
| This one | Backup posture, social-recovery *risk*, runbooks, read-only permission view |
| multi-sig builder | Propose/approve/exec recovery txs |
| hardware patterns | Device isolation, rotation drill |
| session keys | Limited dApp permissions so `owner` stays cold |
