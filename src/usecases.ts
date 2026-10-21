import { CHAIN_ORIGIN, active, getAccount } from "./api";
import { scoreBackupPosture } from "./engines";
import type { ChainAction, HttpRequest } from "./api";

export type UseCase = {
  title: string;
  detail: string;
  request: HttpRequest;
  transaction: { note: string; actions: ChainAction[] } | null;
};

const posture = scoreBackupPosture({
  offlineCopies: 2,
  restoreDrilled: true,
  ownerSeparatedFromDaily: true,
  writtenRunbook: true,
});

const NULL_KEY = "EOS1111111111111111111111111111111114T1Anm";

export const USE_CASES: UseCase[] = [
  {
    title: "Read the permission tree before any change",
    detail: "get_account is what fetchAccountPermissions posts. The score above is a local checklist, not this response.",
    request: getAccount(CHAIN_ORIGIN, "alice"),
    transaction: null,
  },
  {
    title: "The updateauth a webpage should not fire",
    detail: "Owner stays the parent. The key is the public null key, which cannot sign. Replace it only in a tool that is not this demo, and only from the owner key on a hardware device.",
    request: getAccount(CHAIN_ORIGIN, "bob"),
    transaction: {
      note: "Not broadcast. This blueprint does not submit updateauth.",
      actions: [
        active("alice", {
          account: "eosio",
          name: "updateauth",
          data: {
            account: "alice",
            permission: "active",
            parent: "owner",
            auth: {
              threshold: 1,
              keys: [{ key: NULL_KEY, weight: 1 }],
              accounts: [],
              waits: [],
            },
          },
        }),
      ],
    },
  },
];

export function assertUseCases(): void {
  if (posture.score !== 100) throw new Error(`backup score ${posture.score}`);
}
