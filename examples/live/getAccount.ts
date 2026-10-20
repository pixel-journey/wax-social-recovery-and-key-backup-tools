/**
 * Read-only WAX get_account → permission summary.
 * No keys leave the chain response beyond public auth structure.
 */

export const DEFAULT_RPC = "https://wax.greymass.com";

export interface AuthKey {
  key: string;
  weight: number;
}

export interface AuthAccount {
  actor: string;
  permission: string;
  weight: number;
}

export interface PermissionSummary {
  name: string;
  parent: string;
  threshold: number;
  keys: AuthKey[];
  accounts: AuthAccount[];
  /** True if any key is present (hot material possible) */
  hasKeys: boolean;
  /** True if other accounts are in the authority */
  hasAccountAuths: boolean;
}

export interface AccountPermissionView {
  accountName: string;
  created?: string;
  permissions: PermissionSummary[];
  owner?: PermissionSummary;
  active?: PermissionSummary;
  notes: string[];
  source: string;
}

interface RawPerm {
  perm_name?: string;
  parent?: string;
  required_auth?: {
    threshold?: number;
    keys?: { key?: string; weight?: number }[];
    accounts?: {
      permission?: { actor?: string; permission?: string };
      weight?: number;
    }[];
  };
}

function mapPerm(p: RawPerm): PermissionSummary {
  const auth = p.required_auth ?? {};
  const keys = (auth.keys ?? []).map((k) => ({
    key: String(k.key ?? ""),
    weight: Number(k.weight ?? 0),
  }));
  const accounts = (auth.accounts ?? []).map((a) => ({
    actor: String(a.permission?.actor ?? ""),
    permission: String(a.permission?.permission ?? ""),
    weight: Number(a.weight ?? 0),
  }));
  return {
    name: String(p.perm_name ?? ""),
    parent: String(p.parent ?? ""),
    threshold: Number(auth.threshold ?? 0),
    keys,
    accounts,
    hasKeys: keys.length > 0,
    hasAccountAuths: accounts.length > 0,
  };
}

export function summarizeAccount(
  raw: {
    account_name?: string;
    created?: string;
    permissions?: RawPerm[];
  },
  source: string
): AccountPermissionView {
  const permissions = (raw.permissions ?? []).map(mapPerm);
  const owner = permissions.find((p) => p.name === "owner");
  const active = permissions.find((p) => p.name === "active");
  const notes: string[] = [];

  if (owner && active) {
    const ownerKeySet = new Set(owner.keys.map((k) => k.key));
    const shared = active.keys.filter((k) => ownerKeySet.has(k.key));
    if (shared.length > 0) {
      notes.push(
        "Owner and active share at least one public key — daily compromise may equal owner compromise."
      );
    }
    if (owner.threshold === 1 && owner.keys.length === 1 && !owner.hasAccountAuths) {
      notes.push(
        "Owner is single-key threshold 1 with no account auths — no multi-party owner recovery path visible."
      );
    }
    if (owner.hasAccountAuths || owner.threshold > 1) {
      notes.push(
        "Owner uses threshold and/or account authorities — inspect weights for real M-of-N."
      );
    }
  } else {
    notes.push("owner or active permission missing from response — verify account name.");
  }

  return {
    accountName: String(raw.account_name ?? ""),
    created: raw.created,
    permissions,
    owner,
    active,
    notes,
    source,
  };
}

export async function fetchAccountPermissions(
  accountName: string,
  options: { rpc?: string; signal?: AbortSignal } = {}
): Promise<AccountPermissionView> {
  const name = accountName.trim().toLowerCase();
  if (!name) throw new Error("account name required");

  const rpc = (options.rpc || DEFAULT_RPC).replace(/\/$/, "");
  const url = `${rpc}/v1/chain/get_account`;
  const res = await fetch(url, {
    method: "POST",
    signal: options.signal,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ account_name: name }),
  });
  if (!res.ok) {
    throw new Error(`get_account ${res.status}: ${res.statusText}`);
  }
  const json = await res.json();
  return summarizeAccount(json, url);
}
