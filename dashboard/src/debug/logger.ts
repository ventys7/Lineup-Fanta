type LogMethod = "debug" | "info" | "warn" | "error";

const STORAGE_KEY = "lineup:debug";

function queryDebugEnabled(): boolean {
  try {
    return new URLSearchParams(window.location.search).get("debug") === "1";
  } catch {
    return false;
  }
}

export function isDebugEnabled(): boolean {
  try {
    return queryDebugEnabled() || window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return queryDebugEnabled();
  }
}

export function setDebugEnabled(enabled: boolean): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  } catch {
    // Il debug resta comunque attivabile con ?debug=1.
  }
}

function write(method: LogMethod, namespace: string, message: string, details?: unknown): void {
  if (method === "debug" && !isDebugEnabled()) return;

  const prefix = `[Lineup:${namespace}]`;
  if (details === undefined) {
    console[method](prefix, message);
  } else {
    console[method](prefix, message, details);
  }
}

export function createLogger(namespace: string) {
  return {
    debug: (message: string, details?: unknown) => write("debug", namespace, message, details),
    info: (message: string, details?: unknown) => write("info", namespace, message, details),
    warn: (message: string, details?: unknown) => write("warn", namespace, message, details),
    error: (message: string, details?: unknown) => write("error", namespace, message, details)
  };
}
