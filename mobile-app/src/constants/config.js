// Application configuration. Nothing here is a secret.
export const AUTH_MODE = 'development-local';

export const config = {
  appName: 'TeaLeaf Field Scout',
  // PRESENTATION MODE: only the Dashboard and the Observation flow (location, camera, quality, gallery,
  // symptoms, review, saved) are shown. The demo worker is signed in automatically and every other page
  // (Login, Register, Forgot password, History, Sync, Parcels, Observation detail) is a blank placeholder.
  // Set to false to restore the full app. No code was removed.
  presentationMode: true,
  // DEVELOPMENT MODE: there is no login server. Accounts live only in this phone's SQLite database,
  // passwords are salted PBKDF2 hashes (never stored in plain text), and new registrations are
  // activated immediately so the app can be tested. Production must authenticate against the
  // Member 1 API and require supervisor approval.
  auth: {
    mode: AUTH_MODE,
    autoActivateRegistrations: true,
    maxFailedAttempts: 5,
    lockMinutes: 15,
    pbkdf2Iterations: 10000,
    minPasswordLength: 8,
  },
  // Demo account created on first launch (DEV ONLY, sample data).
  demoAccount: { workerCode: 'PED-8492', password: 'Scout@2026' },
};
