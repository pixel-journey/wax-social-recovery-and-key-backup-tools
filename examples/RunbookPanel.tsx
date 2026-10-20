"use client";

import { useId, useMemo, useState } from "react";
import { generateRunbookMarkdown } from "./runbook";
import type { BackupPosture, SocialRecoveryPolicy } from "./types";

export interface RunbookPanelProps {
  posture: BackupPosture;
  policy: SocialRecoveryPolicy;
  className?: string;
}

export function RunbookPanel({
  posture,
  policy,
  className = "",
}: RunbookPanelProps) {
  const headingId = useId();
  const [accountName, setAccountName] = useState("");
  const [copied, setCopied] = useState(false);

  const markdown = useMemo(
    () =>
      generateRunbookMarkdown({
        accountName: accountName.trim() || undefined,
        posture,
        policy,
        reviewedAt: new Date().toISOString().slice(0, 10),
      }),
    [accountName, posture, policy]
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const download = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `recovery-runbook-${accountName.trim() || "account"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      className={`rounded-2xl border border-sky-500/30 bg-sky-500/10 p-6 space-y-3 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg text-sky-100">
        Recovery runbook template
      </h3>
      <p className="text-sm text-sky-100/80 leading-relaxed">
        Generated from your checklist answers. Store offline and in git — not only
        inside one web app.
      </p>

      <label className="block text-xs opacity-70" htmlFor="runbook-account">
        Account name (optional)
      </label>
      <input
        id="runbook-account"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        placeholder="alice.wam"
        autoComplete="off"
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copy}
          className="px-3 py-2 rounded-lg text-sm bg-sky-600 hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        >
          {copied ? "Copied" : "Copy markdown"}
        </button>
        <button
          type="button"
          onClick={download}
          className="px-3 py-2 rounded-lg text-sm bg-white/10 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        >
          Download .md
        </button>
      </div>

      <pre
        className="max-h-64 overflow-auto rounded-xl border border-white/10 bg-black/50 p-3 text-[11px] font-mono text-sky-100/90 whitespace-pre-wrap"
        tabIndex={0}
        aria-label="Generated runbook markdown"
      >
        {markdown}
      </pre>
    </section>
  );
}
