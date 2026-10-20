import { appConfig } from "../config";
export class ApiError extends Error {
  constructor(message, status = 0, details = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}
export async function apiRequest(
  endpoint,
  { body, headers, signal, timeout = 15000, ...options } = {},
) {
  if (!appConfig.apiBaseUrl)
    throw new ApiError(
      "The backend URL is not configured. Set VITE_API_BASE_URL before using API authentication.",
    );
  const controller = new AbortController();
  const abort = () => controller.abort(signal?.reason);
  if (signal?.aborted) abort();
  else signal?.addEventListener("abort", abort, { once: true });
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(
      appConfig.apiBaseUrl + "/" + endpoint.replace(/^\/+/, ""),
      {
        ...options,
        credentials: "include",
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
          ...headers,
        },
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      },
    );
    const text = await response.text();
    let data = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        if (response.ok)
          throw new ApiError(
            "The server returned an invalid response.",
            response.status,
          );
      }
    }
    if (!response.ok)
      throw new ApiError(
        data?.message ||
          (response.status === 401
            ? "Your session has expired. Please sign in again."
            : "The request could not be completed."),
        response.status,
        data?.errors,
      );
    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error.name === "AbortError")
      throw new ApiError(
        signal?.aborted
          ? "The request was cancelled."
          : "The request timed out. Please try again.",
      );
    throw new ApiError(
      "Unable to connect to the server. Check your connection and try again.",
    );
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
  }
}
