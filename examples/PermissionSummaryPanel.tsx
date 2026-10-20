"use client";

import { useCallback, useId, useState } from "react";
import {
  fetchAccountPermissions,
  type AccountPermissionView,
  type PermissionSummary,
} from "./live/getAccount";

function PermCard({ perm }: { perm: PermissionSummary }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-xs font-mono space-y-1">
      <p className="text-sm font-semibold text-white/90">
        {perm.name}{" "}
        <span className="opacity-50 font-normal">
          parent={perm.parent || "—"} · threshold={perm.threshold}
        </span>
      </p>
      {perm.keys.length > 0 && (
        <ul className="opacity-80 space-y-0.5">
          {perm.keys.map((k) => (
            <li key={k.key} className="break-all">
              key w{k.weight}: {k.key}
            </li>
          ))}
        </ul>
      )}
      {perm.accounts.length > 0 && (
        <ul className="opacity-80 space-y-0.5">
          {perm.accounts.map((a) => (
            <li key={`${a.actor}@${a.permission}`}>
              @{a.actor} / {a.permission} · w{a.weight}
            </li>
          ))}
        </ul>
      )}
      {!perm.keys.length && !perm.accounts.length && (
        <p className="opacity-50">No keys or account auths in response</p>
      )}
    </div>
  );
}

export interface PermissionSummaryPanelProps {
  className?: string;
  defaultAccount?: string;
}

/** Read-only chain lookup — never asks for private keys. */
export function PermissionSummaryPanel({
  className = "",
  defaultAccount = "",
}: PermissionSummaryPanelProps) {
  const headingId = useId();
  const [account, setAccount] = useState(defaultAccount);
  const [view, setView] = useState<AccountPermissionView | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const v = await fetchAccountPermissions(account);
      setView(v);
    } catch (e) {
      setView(null);
      setError(e instanceof Error ? e.message : "get_account failed");
    } finally {
      setLoading(false);
    }
  }, [account]);

  return (
    <section
      className={`rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-6 space-y-3 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg text-cyan-100">
        Live permissions (read-only)
      </h3>
      <p className="text-sm text-cyan-100/80 leading-relaxed">
        Fetches public <code className="text-cyan-200">get_account</code> data.
        Educational structural notes only — not a security audit. Never paste private keys.
      </p>

      <div className="flex flex-col sm:flex-row gap-2">
        <label className="sr-only" htmlFor="live-account">
          Account name
        </label>
        <input
          id="live-account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          className="flex-1 rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          placeholder="account.wam"
          autoComplete="off"
        />
        <button
          type="button"
          onClick={load}
          disabled={loading || !account.trim()}
          className="px-4 py-2 rounded-xl bg-cyan-600 text-sm font-medium disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          {loading ? "Loading…" : "Load permissions"}
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-300" role="alert">
          {error}
        </p>
      )}

      {view && (
        <div className="space-y-3" aria-live="polite">
          <p className="text-xs opacity-60 font-mono break-all">
            {view.accountName}
            {view.created ? ` · created ${view.created}` : ""}
          </p>
          {view.owner && (
            <div>
              <p className="text-xs uppercase tracking-wide opacity-50 mb-1">owner</p>
              <PermCard perm={view.owner} />
            </div>
          )}
          {view.active && (
            <div>
              <p className="text-xs uppercase tracking-wide opacity-50 mb-1">active</p>
              <PermCard perm={view.active} />
            </div>
          )}
          {view.notes.length > 0 && (
            <ul className="text-xs text-cyan-100/90 space-y-1 list-disc pl-4">
              {view.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}
          <p className="text-[10px] opacity-40 break-all">source: {view.source}</p>
        </div>
      )}
    </section>
  );
}
