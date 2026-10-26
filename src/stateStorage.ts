import type { BackupPosture, SocialRecoveryPolicy } from "./types";
import type { RecoveryShareState } from "./shareState";

const KEY = "pxj-social-recovery-v1";

export function saveState(state: RecoveryShareState): {
  ok: boolean;
  reason?: string;
} {
  try {
    if (typeof localStorage === "undefined")
      return { ok: false, reason: "no localStorage" };
    localStorage.setItem(KEY, JSON.stringify(state));
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "save failed",
    };
  }
}

export function loadState(): {
  ok: boolean;
  value?: RecoveryShareState;
  reason?: string;
} {
  try {
    if (typeof localStorage === "undefined")
      return { ok: false, reason: "no localStorage" };
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ok: true };
    return { ok: true, value: JSON.parse(raw) as RecoveryShareState };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "load failed",
    };
  }
}

export function clearState(): void {
  try {
    localStorage?.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export type { BackupPosture, SocialRecoveryPolicy };
