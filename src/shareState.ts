import type { BackupPosture, SocialRecoveryPolicy } from "./types";

export type RecoveryShareState = {
  posture: BackupPosture;
  policy: SocialRecoveryPolicy;
};

function b64urlEncode(s: string): string {
  if (typeof btoa === "function") {
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return Buffer.from(s, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function b64urlDecode(s: string): string {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  if (typeof atob === "function") return atob(b64);
  return Buffer.from(b64, "base64").toString("utf8");
}

export function encodeShareState(state: RecoveryShareState): string {
  return b64urlEncode(JSON.stringify(state));
}

export function decodeShareState(payload: string): RecoveryShareState | null {
  try {
    const o = JSON.parse(b64urlDecode(payload)) as RecoveryShareState;
    if (!o?.posture || !o?.policy) return null;
    if (typeof o.posture.offlineCopies !== "number") return null;
    return o;
  } catch {
    return null;
  }
}

export function buildShareSearchParam(state: RecoveryShareState): string {
  return `sr=${encodeShareState(state)}`;
}
