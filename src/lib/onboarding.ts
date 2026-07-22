const STORAGE_PREFIX = "forcoach:coachmark:";
const listeners = new Set<() => void>();

function isSeen(id: string): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(STORAGE_PREFIX + id) === "1";
}

export function markCoachmarkSeen(id: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_PREFIX + id, "1");
  listeners.forEach((listener) => listener());
}

export function subscribeCoachmarks(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getCoachmarkSnapshot(id: string): boolean {
  return !isSeen(id);
}
