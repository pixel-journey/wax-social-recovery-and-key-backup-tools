export interface GlossaryEntry {
  term: string;
  definition: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: "owner",
    definition:
      "Top permission on an Antelope account. Can change all other permissions including itself (with its own authority).",
  },
  {
    term: "active",
    definition:
      "Default day-to-day permission. Cannot replace owner. Often used for transfers and contract calls.",
  },
  {
    term: "threshold",
    definition:
      "Minimum total weight of keys/accounts required to authorize a permission.",
  },
  {
    term: "weight",
    definition:
      "How much a single key or account-authority contributes toward the threshold.",
  },
  {
    term: "account-auth",
    definition:
      "An entry in required_auth that points at another account’s permission (e.g. bob@active) instead of a raw key.",
  },
  {
    term: "eosio.msig",
    definition:
      "System contract for multi-sig proposals: propose, approve, exec packed transactions.",
  },
  {
    term: "updateauth",
    definition:
      "eosio action that creates or changes a permission’s authority structure.",
  },
  {
    term: "linkauth",
    definition:
      "Binds a specific contract::action to a named permission (used for limited session keys).",
  },
  {
    term: "session key (dApp)",
    definition:
      "Limited custom permission + linkauth so apps can sign routine actions without owner/active prompts.",
  },
  {
    term: "PX §11",
    definition:
      "Pixel Journey resilience idea: critical recovery steps must survive if a single website or vendor disappears.",
  },
];
