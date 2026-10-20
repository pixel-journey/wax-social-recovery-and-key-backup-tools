/**
 * Read-only WAX get_account → permission summary.
 * No private keys — public auth structure only.
 */

export const DEFAULT_RPC = "https://wax.greymass.com";

/** Soft-fail chain: try next on network / HTTP errors. */
export const RPC_FALLBACKS = [
  "https://wax.greymass.com",
  "https://wax.eosusa.news",
  "https://api.waxsweden.org",
] as const;

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
  hasKeys: boolean;
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
  /** Shared public keys between owner and active */
  ownerActiveShareKeys: boolean;
  /** Owner looks single-key threshold-1 with no account auths */
  ownerSingleKey: boolean;
}

/** Educational checklist hints derived from live view (not advice). */
export interface PostureHints {
  ownerSeparatedFromDaily: boolean;
  usesMultisigWeights: boolean;
  suggestedHelperCount?: number;
  suggestedThreshold?: number;
  reason: string;
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
  let ownerActiveShareKeys = false;
  let ownerSingleKey = false;

  if (owner && active) {
    const ownerKeySet = new Set(owner.keys.map((k) => k.key));
    const shared = active.keys.filter((k) => ownerKeySet.has(k.key));
    ownerActiveShareKeys = shared.length > 0;
    if (ownerActiveShareKeys) {
      notes.push(
        "Owner and active share at least one public key — daily compromise may equal owner compromise."
      );
    }
    ownerSingleKey =
      owner.threshold === 1 &&
      owner.keys.length === 1 &&
      !owner.hasAccountAuths;
    if (ownerSingleKey) {
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
    ownerActiveShareKeys,
    ownerSingleKey,
  };
}

export function derivePostureHints(view: AccountPermissionView): PostureHints {
  const owner = view.owner;
  const usesMultisigWeights = Boolean(
    owner && (owner.hasAccountAuths || owner.threshold > 1)
  );
  const ownerSeparatedFromDaily = !view.ownerActiveShareKeys;

  let reason = "Derived from public owner/active structure only.";
  if (view.ownerActiveShareKeys) {
    reason =
      "Shared owner/active key detected — mark owner as not separated from daily use.";
  } else if (usesMultisigWeights) {
    reason =
      "Owner shows account auths or threshold > 1 — multi-sig style design may already exist.";
  }

  const suggestedHelperCount = owner?.accounts.length
    ? owner.accounts.length
    : undefined;
  const suggestedThreshold =
    owner && owner.threshold > 0 ? owner.threshold : undefined;

  return {
    ownerSeparatedFromDaily,
    usesMultisigWeights,
    suggestedHelperCount,
    suggestedThreshold,
    reason,
  };
}

async function fetchOnce(
  name: string,
  rpc: string,
  signal?: AbortSignal
): Promise<AccountPermissionView> {
  const base = rpc.replace(/\/$/, "");
  const url = `${base}/v1/chain/get_account`;
  const res = await fetch(url, {
    method: "POST",
    signal,
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

export async function fetchAccountPermissions(
  accountName: string,
  options: { rpc?: string; signal?: AbortSignal } = {}
): Promise<AccountPermissionView> {
  const name = accountName.trim().toLowerCase();
  if (!name) throw new Error("account name required");

  const chain = options.rpc
    ? [options.rpc, ...RPC_FALLBACKS.filter((r) => r !== options.rpc)]
    : [...RPC_FALLBACKS];

  let lastError: unknown;
  for (const rpc of chain) {
    try {
      return await fetchOnce(name, rpc, options.signal);
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("get_account failed on all RPCs");
}
