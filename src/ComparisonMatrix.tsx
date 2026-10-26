'use client';

import React from 'react';
import { APPROACH_MATRIX } from './comparison';

export function ComparisonMatrix() {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/30 p-5 overflow-x-auto">
      <h3 className="font-semibold text-lg mb-2">Approach comparison</h3>
      <p className="text-xs opacity-60 mb-3">
        How common recovery approaches trade off continuity vs complexity.
      </p>
      <table className="w-full text-[11px] text-left border-collapse min-w-[32rem]">
        <thead>
          <tr className="border-b border-white/15 text-white/50">
            <th className="py-2 pr-2">Approach</th>
            <th className="py-2 pr-2">Vendor exit</th>
            <th className="py-2 pr-2">Multi-party</th>
            <th className="py-2 pr-2">Seed share</th>
            <th className="py-2 pr-2">Complexity</th>
          </tr>
        </thead>
        <tbody>
          {APPROACH_MATRIX.map((r) => (
            <tr key={r.id} className="border-b border-white/5 align-top">
              <td className="py-2 pr-2">
                <div className="font-medium text-emerald-200/90">{r.name}</div>
                <div className="opacity-50 mt-0.5">{r.note}</div>
              </td>
              <td className="py-2 pr-2 font-mono">{r.survivesVendorExit}</td>
              <td className="py-2 pr-2 font-mono">{r.multiParty}</td>
              <td className="py-2 pr-2 font-mono">{r.seedSharingRequired}</td>
              <td className="py-2 pr-2 font-mono">{r.complexity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
