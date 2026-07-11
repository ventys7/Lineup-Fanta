export class HttpError extends Error {
  readonly status: number;
  readonly url: string;

  constructor(status: number, url: string) {
    super(`HTTP ${status}: ${url}`);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
  }
}

export function withCacheBuster(url: string, key = "_lf"): string {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${encodeURIComponent(key)}=${Date.now()}`;
}

export async function fetchNoStoreText(url: string, signal: AbortSignal): Promise<string> {
  const requestUrl = withCacheBuster(url);
  const response = await fetch(requestUrl, {
    cache: "no-store",
    signal,
    headers: {
      "Cache-Control": "no-cache, no-store, max-age=0",
      "Pragma": "no-cache"
    }
  });

  if (!response.ok) throw new HttpError(response.status, url);
  return response.text();
}

export async function fetchNoStoreJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(withCacheBuster(url), {
    cache: "no-store",
    signal,
    headers: {
      "Cache-Control": "no-cache, no-store, max-age=0",
      "Pragma": "no-cache"
    }
  });

  if (!response.ok) throw new HttpError(response.status, url);
  return response.json() as Promise<T>;
}
