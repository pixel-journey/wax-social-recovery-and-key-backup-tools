'use client';

import React, { useMemo, useState } from 'react';
import { hybridFeasibility, sketchHybridOwner } from './hybridSketch';

export function HybridSketchPanel() {
  const [account, setAccount] = useState('alice.wam');
  const [pub, setPub] = useState('PUB_K1_YOUR_OWNER_KEY');
  const [helpers, setHelpers] = useState('bob.wam, carol.wam');
  const [threshold, setThreshold] = useState(2);

  const helperList = helpers
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const sketch = useMemo(
    () =>
      sketchHybridOwner({
        account: account.trim() || 'alice.wam',
        yourPublicKey: pub.trim(),
        helpers: helperList,
        threshold,
      }),
    [account, pub, helpers, threshold]
  );

  const notes = useMemo(
    () =>
      hybridFeasibility({
        threshold,
        yourWeight: 1,
        helperCount: helperList.length,
        helperWeight: 1,
      }),
    [threshold, helperList.length]
  );

  return (
    <section className="rounded-2xl border border-teal-500/30 bg-teal-500/10 p-5 space-y-3">
      <h3 className="font-semibold text-teal-100">Hybrid owner sketch</h3>
      <p className="text-xs opacity-70">
        Your key + helper accounts on <code>owner</code>. Adjust threshold and read
        feasibility notes — still not a broadcast tool.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-[10px] opacity-70">
          Account
          <input
            className="mt-1 w-full bg-black/50 border border-white/10 rounded px-2 py-1 font-mono text-xs"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </label>
        <label className="text-[10px] opacity-70">
          Your owner pubkey
          <input
            className="mt-1 w-full bg-black/50 border border-white/10 rounded px-2 py-1 font-mono text-xs"
            value={pub}
            onChange={(e) => setPub(e.target.value)}
          />
        </label>
      </div>
      <label className="text-[10px] opacity-70 block">
        Helpers (comma-separated accounts)
        <input
          className="mt-1 w-full bg-black/50 border border-white/10 rounded px-2 py-1 font-mono text-xs"
          value={helpers}
          onChange={(e) => setHelpers(e.target.value)}
        />
      </label>
      <label className="text-[10px] opacity-70 block">
        Threshold: {threshold}
        <input
          type="range"
          min={1}
          max={7}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-full mt-1"
        />
      </label>
      <ul className="text-[11px] text-amber-100/85 list-disc pl-4">
        {notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <pre className="text-[10px] font-mono opacity-80 overflow-x-auto whitespace-pre-wrap bg-black/40 p-2 rounded-lg max-h-48">
        {JSON.stringify(sketch, null, 2)}
      </pre>
    </section>
  );
}
