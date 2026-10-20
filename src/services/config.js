export const appConfig = Object.freeze({
  authMode:
    import.meta.env.VITE_AUTH_MODE || (import.meta.env.DEV ? "mock" : "api"),
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, ""),
  isDevelopment: import.meta.env.DEV,
});
