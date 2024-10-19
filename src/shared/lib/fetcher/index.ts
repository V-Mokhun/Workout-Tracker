export class FetcherError extends Error {
  constructor(public message: string, public status: number, public info: any) {
    super(message);
    this.name = "FetcherError";
    Object.setPrototypeOf(this, FetcherError.prototype);
  }
}

export async function fetcher<T = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);

  if (!res.ok) {
    let errorInfo: any;
    try {
      errorInfo = await res.json();
    } catch {
      errorInfo = await res.text();
    }

    throw new FetcherError(
      `API error: ${res.status} ${res.statusText}`,
      res.status,
      errorInfo
    );
  }

  return res.json();
}

export function isFetcherError(error: unknown): error is FetcherError {
  return error instanceof FetcherError;
}
