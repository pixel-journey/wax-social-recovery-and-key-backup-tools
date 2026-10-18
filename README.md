# wax-social-recovery-and-key-backup-tools

> **Status:** 🔄 Deep Refinement (PX Perfection Standard v1.1)  
> **Category:** Security & Account Recovery  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)  
> **Related:** [ECOSYSTEM-RESILIENCE.md](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog/blob/main/ECOSYSTEM-RESILIENCE.md) · multi-sig · key management blueprints

**Goal:** Educational, practical patterns for **key backup** and **social / multi-party recovery** on Antelope/WAX — with explicit trade-offs, attack surfaces, and checklists. Not a promise that recovery is risk-free.

Losing `owner` access is often permanent. Good backups and deliberate multi-party designs reduce that risk; poorly designed “friends can save me” flows create new ones.

---

## Vision

Long-term participants need a plan **before** a phone dies, a seed is lost, or a single operator disappears. This blueprint prioritizes:

- **Defense in depth** — more than one independent recovery path
- **Explicit trust** — who can collude, coerce, or socially engineer whom
- **Owner vs active clarity** — Antelope permission model is not optional knowledge
- **Calm documentation** — checklists over fear or hype

---

## Quick Starts

### Humans
1. Read §1 (backup tiers + social recovery risks).
2. Use `/examples` — pure checklist engines, warning panels, workflow steps, demo.
3. Pair with multi-sig and hardware-wallet blueprints for production designs.

### AI agents
1. Load `spec.yaml`.
2. Use pure helpers in `examples/engines.ts` for checklist scoring.
3. Never recommend schemes that give a single “helper” full owner control without labeling the risk.

---

## 1. Educational Core

### 1.1 Key concepts

| Concept | Meaning |
|---------|--------|
| **Seed / key backup** | Offline, tested copies of material that can restore signing ability |
| **Social recovery** | Trusted parties participate in restoring control (often via multi-sig / msig) |
| **Threshold** | M-of-N so no single helper acts alone |
| **Owner vs active** | On Antelope, owner can change active; active cannot replace owner — design recovery at the right level |
| **Collusion / coercion** | Helpers may cooperate or be pressured — model that honestly |

### 1.2 Common failure modes

| Failure | Why it hurts | Mitigation direction |
|---------|----------------|----------------------|
| Only one seed copy | Device loss = account loss | Multiple independent backups |
| Unverified backup | “Backup” is blank or wrong | Periodic restore drills |
| 1-of-N “social” recovery | One helper is full control | Real thresholds |
| Helpers hold full seeds | Massive social-engineering surface | Prefer multi-sig weights, not seed sharing |
| Recovery only in a SaaS app | App can vanish | Recipes in git + multi-sig on-chain |

### 1.3 Learning outcomes

- Choose backup tiers appropriate to account value
- Design M-of-N recovery without single-helper capture
- Run a recovery drill checklist
- Label residual risks clearly for users

---

## 2. Architecture

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 + TypeScript (strict) |
| Logic | Pure checklist / risk helpers |
| UI | Guide panels + workflow steps |
| On-chain | Patterns via `eosio.msig` / account permissions — verify live |

```
/examples/
  types.ts
  engines.ts
  SecurityWarnings.tsx
  BackupChecklist.tsx
  RecoveryWorkflow.tsx
  demo.tsx
```

---

## 3. Integration levels

| Level | Scope |
|-------|--------|
| **Minimal** | Backup checklist + warnings |
| **Recommended** | Workflow + threshold guidance + multi-sig link |
| **Advanced** | Guided msig propose for recovery policies, hardware co-signers |

---

## 4. Best practices

**Do**
- Test restores on a throwaway account first
- Keep owner keys offline / hardware where value is high
- Document recovery steps outside any single website

**Don’t**
- SMS or email “recovery codes” as the only path for high-value accounts
- Share full seeds in group chats
- Assume social recovery removes the need for personal backups

---

## 5. Ecosystem position

Companion to:
- `wax-secure-key-management-and-privacy-tools`
- `wax-multi-sig-proposal-builder-and-simulator`
- `wax-safe-key-rotation-assistant`
- `wax-hardware-wallet-integration-patterns`

---

## 6. License

MIT — **Pixel Journey**

*Exemplifies [PX Perfection Standard](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog/blob/main/PX-PERFECTION-STANDARD.md) v1.1.*

*Last major refinement pass: October 2026*
