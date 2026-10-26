/** Incident playbooks — educational step lists. */

export type IncidentId =
  | "active-lost"
  | "owner-lost"
  | "helper-compromised"
  | "phishing-signed"
  | "vendor-gone";

export interface IncidentPlaybook {
  id: IncidentId;
  title: string;
  severity: "high" | "critical" | "medium";
  steps: string[];
  avoid: string[];
}

export const INCIDENT_PLAYBOOKS: IncidentPlaybook[] = [
  {
    id: "active-lost",
    title: "Active / hot key lost or phone stolen",
    severity: "high",
    steps: [
      "Confirm owner is still under your control (explorer + offline material).",
      "From owner, updateauth active to a new key (WharfKit + preview).",
      "Revoke or overwrite the compromised active authority.",
      "Rotate limited session permissions (linkauth) that used the old key.",
      "Update runbook and notify any automation that used the old active.",
    ],
    avoid: [
      "Do not reuse the stolen key even if the device is found later.",
      "Do not attempt to ‘fix owner with active’ — impossible by design.",
    ],
  },
  {
    id: "owner-lost",
    title: "Owner material lost",
    severity: "critical",
    steps: [
      "Stop hoping active can heal owner — it cannot.",
      "Execute pre-arranged M-of-N (account-auth weights and/or eosio.msig).",
      "If no multi-party path exists, treat the account as potentially unrecoverable.",
      "After recovery, redesign owner (hardware + weights) and re-drill.",
    ],
    avoid: [
      "Do not share emergency full seeds in chat groups.",
      "Do not invent ad-hoc helpers without on-chain weight.",
    ],
  },
  {
    id: "helper-compromised",
    title: "A social-recovery helper is compromised",
    severity: "high",
    steps: [
      "Check whether remaining honest weights still meet threshold without them.",
      "If the compromised helper alone met threshold, treat as owner emergency.",
      "From a valid owner coalition, updateauth to remove their account-auth/key.",
      "Replace with a new helper or adjust weights; update the offline runbook.",
    ],
    avoid: [
      "Do not leave a known-bad weight on owner ‘for later’.",
    ],
  },
  {
    id: "phishing-signed",
    title: "User signed a malicious updateauth / transfer",
    severity: "critical",
    steps: [
      "Immediately inventory permissions on explorer.",
      "If owner still yours, rotate active and any limited permissions now.",
      "If owner was changed to attacker keys, only pre-arranged multi-party can help.",
      "Document the phishing vector; tighten preview/UX for next time.",
    ],
    avoid: [
      "Do not keep approving more prompts while investigating.",
    ],
  },
  {
    id: "vendor-gone",
    title: "Wallet or recovery website shut down",
    severity: "medium",
    steps: [
      "Use offline runbook and explorer — not the dead product UI.",
      "Import keys into Anchor / WharfKit-compatible wallet if you hold them.",
      "If you only had product recovery and no offline owner path, options may be gone — this is why PX §11 exists.",
    ],
    avoid: [
      "Do not enter seeds into random ‘recovery’ clones of the dead site.",
    ],
  },
];
