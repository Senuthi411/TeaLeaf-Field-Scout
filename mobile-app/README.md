# TeaLeaf Field Scout — Mobile (React Native + Expo, JavaScript)

Android-first Field Worker app: login → home → new observation (location → camera → quality check →
gallery → symptoms → review) → saved on the phone, with offline queue, history and detail screens.
The web project (`tealeaf-field-scout`) is untouched; this is a separate project.

> **Status: not installed, run or built.** Written without network access: `npm install`, Metro, the app on a
> phone and the EAS build have **not** been executed. Only the domain + SQLite logic was tested (72 checks,
> see "Verification"). No APK exists yet. Follow "First run" and report any error.

## Presentation mode (default: ON)

`src/constants/config.js` has `presentationMode: true`. In this mode the app opens straight on the **Dashboard**
(the demo worker is signed in automatically) and only the Dashboard and the **Observation flow** (location,
camera, quality check, gallery, symptoms, review, saved) are active. **Login, Register, Forgot password, History,
Sync, Parcels and Observation detail** show a blank "Coming soon" page. Nothing was deleted: set
`presentationMode: false` to get the full app (login, history, sync queue, details) back.

## First run (Windows `cmd` shown; macOS/Linux are the same minus `rmdir`/`del`)

1. **Use Node 22 LTS (or 24).** Expo SDK 56 requires `^22.13 || ^24.3 || ^26`; odd-numbered releases such as
   Node 25 are not supported (`EBADENGINE` warning). Install from nodejs.org, reopen the terminal, check `node -v`.
2. **Put the project in a short path without spaces or parentheses**, e.g. `C:\dev\tealeaf-field-scout-mobile`
   (not `...\Downloads\tealeaf-field-scout-mobile (1)\tealeaf-field-scout-mobile`). Android/Gradle and Metro
   tooling can fail on such paths.
3. Install (the `.npmrc` in this folder sets `legacy-peer-deps=true`; keep it, EAS cloud builds read it too):

```bat
cd C:\dev\tealeaf-field-scout-mobile
rmdir /s /q node_modules
del package-lock.json
npm install
npx expo install @expo/vector-icons @react-native-community/netinfo @expo/metro-runtime react-native-gesture-handler
npx expo install --check
npx expo-doctor
npm run test:logic
```

`package.json` pins the SDK 56 versions reported by `expo install --fix`. The `expo install ...` line adds the
few packages whose SDK-matched versions must be chosen by Expo (it writes them into `package.json`).
Ignore `npm audit` warnings; do **not** run `npm audit fix --force` (it breaks Expo's pinned versions).

### If `npm install` fails with ERESOLVE

That means an unpinned package pulled in a newer major than SDK 56 expects. Don't use `--force`. Run
`npx expo install --fix -- --legacy-peer-deps` and send the new error.

## Testing and building the APK

Expo Go for SDK 56 may not be on the app stores, and this app needs native modules (camera, SQLite), so test
with a build instead:

```bash
npx eas-cli login
npx eas-cli build:configure                              # one-time: writes your EAS projectId into app.json
npx eas-cli build --platform android --profile preview   # installable APK (download link / QR in the terminal)
```

Other profiles in `eas.json`: `development` (APK with dev client: `npx eas-cli build --profile development`, then
`npx expo start --dev-client` for hot reload) and `production` (AAB for Play Store). Signing keys are managed by
EAS; none are in this repo. Package id: `com.tealeaf.fieldscout` (availability on Google Play not checked;
it cannot change after publishing).

**Install on a phone:** open the build's download link on the Android phone (or scan the QR code), download the
`.apk`, allow "Install unknown apps" for your browser when prompted, then open it. Or `adb install app.apk`.
Do not treat the APK as generated until `eas build` reports success.

Newer Expo SDKs exist (the SDK 58 packages npm picked up earlier). This project targets **SDK 56** and has not been adapted to 58.

**Quick test script:** login with the demo account → Home shows sample data → New Leaf Observation → pick a
block, tap *Get GPS location* (outdoors) or *Use manual location* → take the 3 photos (answer the quality
questions) → symptoms → Review → Submit → "Saved on this phone". Close and reopen the app: the record is still
there. Toggle *Simulate offline* on the Sync screen to see the offline layout.

## Development-mode authentication (read this)

There is **no login server**. Accounts exist only in this phone's SQLite database:

- Passwords are never stored in plain text: salted PBKDF2-HMAC-SHA256 (10,000 iterations, per-account salt from
  the OS random source, pure-JS implementation verified against Node's `crypto`). Iterations are stored per
  account so they can be raised later. Measure login time on a real phone; raise or lower
  `config.auth.pbkdf2Iterations` if needed.
- Demo account (sample data, listed in `src/constants/config.js`): **PED-8492 / Scout@2026**. It owns the sample
  observations. Registered accounts see none of them.
- Registration is activated immediately (`config.auth.autoActivateRegistrations`); set it to `false` to model
  "waiting for supervisor approval" (the account then cannot sign in).
- 5 wrong passwords lock the account for 15 minutes (the design says "contact your supervisor"; there is no one
  to contact yet).
- "Forgot password" is a **dev-only local reset** that checks the registered mobile number. It is not secure.
- Offline vs online login behave the same, because both check the local account. The screens say so.
- The session (worker id only) persists across restarts until Sign out.

Production must replace this with the Member 1 authentication API (JWT in secure storage) and supervisor
approval. The seam: `LoginWorker` / `RegisterWorker` use cases in `src/domain/usecases`.

## Screens (the 11 planned + helpers)

| # | Screen | Route |
|---|---|---|
| 1 | Worker Login (+ Register, Forgot password) | `/login`, `/register`, `/forgot-password` |
| 2 | Home / New observation entry | `/home` |
| 3 | Estate / Division / Block + GPS or manual location | `/observation/location` |
| 4 | Guided camera capture (live preview, outline, torch) | `/observation/camera` |
| 5 | Photo quality check / retake | `/observation/quality` |
| 6 | Multi-angle capture gallery | `/observation/gallery` |
| 7 | Symptom checklist | `/observation/symptoms` |
| 8 | Readiness & review (+ saved confirmation) | `/observation/review`, `/observation/saved` |
| 9 | Offline queue & sync status | `/sync` |
| 10 | Submission history (search, filters, month groups) | `/history` |
| 11 | Observation detail (photos open full-screen) | `/observation/[id]` |
| – | Parcels (placeholder), draft resume router | `/parcels`, `/observation/resume` |

A draft is **autosaved** at each step (so a crash or kill loses nothing). Continuing a draft jumps to the first
incomplete step.

## Photo quality check: what is and is not real

The app measures only what it can measure honestly from file metadata: **resolution** and **file size**
(thresholds in `domain/validation/imageQualityRules.js`; SRS lists final values as TBD-1). It does **not**
analyse blur, glare or framing and does not use AI. Instead the worker answers three questions from the preview.

- Below the minimum resolution/size: retake is mandatory.
- Warnings or "No" answers: retake recommended, or "Proceed anyway": the photo is tagged **UNCERTAIN** (saved in
  SQLite, shown on the gallery/review) so an expert can verify it.
- The design's "Example 42/100" focus/glare scores are intentionally not reproduced.

## Architecture

```
src/
  app/            Expo Router routes (thin; protected ones wrapped in RequireAuth)
  domain/         entities, validation, ports (PasswordHasher, SyncGateway), repository contracts, use cases
  data/           database (schema.js migrations, database.js), repositories (SQLite), mock data
  services/       device + infrastructure adapters: PhotoFileStore, CameraGalleryService, LocationService,
                  ConnectivityService, PasswordHasher (pbkdf2 + expo-crypto), SyncService (UnavailableSyncGateway)
  presentation/   components, screens, state (contexts + hooks), i18n, utils
  constants/      theme.js, spacing.js, config.js
  container.js    composition root
```

Domain never imports React Native or Expo. SQL lives only in `data/`. Database version is 2 (migration 1 =
observations/photos/settings; migration 2 = accounts + photo quality columns); upgrading a v1 database keeps data.

## Sync (future backend)

`SyncGateway` (domain port) + `SyncPendingObservations` use case exist. The only implementation is
`UnavailableSyncGateway`, which reports "not implemented" and changes nothing. To integrate a backend: implement
`checkAvailability()` and `upload(observations)` (return per-record `SYNCED`/`FAILED`), swap it in
`src/container.js`. Only records the gateway confirms become Synced. Still needed server-side: auth API,
observation + image upload endpoints, conflict policy (SRS TBD-5), Wi-Fi-only option (REQ-44), retry.

## Mock vs real

| Mock / sample (marked "Sample") | Real |
|---|---|
| Demo account, estate/division/block list + block-centre coordinates | Photos taken/picked on the phone (files in app storage; SQLite keeps URI + metadata) |
| 9 sample observations (some say "Synced") | GPS fix when you tap *Get GPS location* |
| | Accounts you register, drafts and submissions you create |

"Remove sample data" deletes only sample rows. Manual location = approximate centre of the chosen block (sample
coordinates), clearly labelled as manual.

## Not implemented

Server auth/sync, Wi-Fi-only upload, image analysis (blur/brightness/glare/framing), duplicate detection, version
history, supervisor outcomes, notifications, parcel map, estimated affected area / lesion size / spread pattern
fields, full translation of every label (only navigation, home, login and main form buttons; Sinhala/Tamil are
**unreviewed drafts**), PDF export, "link to nearby record".

## Requirement discrepancies to resolve

1. **Technology:** the interim report (SRS 5.2.5, Ch. 2, Ch. 9) mandates a **Flutter** app for Member 2; this is
   React Native/Expo as requested. Confirm with your supervisor/client.
2. **Pathology:** SRS REQ-29 says "spider mite **or pest damage**"; class diagram enum `PEST_DAMAGE`. The form
   uses **Spider Mite** (`SPIDER_MITE`) from your task. Figma chips (Red rust, Brown blight) differ from both.
3. **Language:** multi-language is under *Further Development* (8.1), not current scope. Built as requested.
4. **Status label:** your prompt says "Pending Sync"; the Figma and earlier brief say **"Waiting to sync"**. The
   UI uses the Figma wording (same state, `SyncStatus.PENDING`).
5. **Optional 4th photo** (stem/petiole) comes from the Figma, not the class diagram's `ViewAngle` enum.
6. **Flush part** is required/multi-select (Figma); it is not in SRS REQ-28's field list. Missing SRS fields:
   estimated affected area (REQ-30), lesion size, leaf-surface location, spread pattern (REQ-28).
7. **Login:** Figma shows registration "not active until authorised" and "online sign-in once to enable offline
   login". Without a server this is approximated by the dev-mode rules above.
8. SRS says "bush"/"division"/"block" interchangeably; the form uses estate → division → block.

## Verification actually performed

- `npm run test:logic`: **72 checks passed** against real SQLite (Node's `node:sqlite` behind an
  `expo-sqlite`-shaped shim): migrations and a **v1→v2 upgrade keeping data**, PBKDF2/SHA-256 vs Node `crypto`
  (incl. Sinhala/Tamil/emoji passwords), registration/login/lockout/reset/session rules, password never stored in
  plain text, photo-quality rules, quality columns round-trip, search, dashboard lists, draft deletion,
  submitted-record immutability, and that sync with no backend changes **no** status.
- All JS parses with the TypeScript parser (0 syntax errors, no undefined names, no unresolved relative
  imports, no unused imports).
- **Not verified:** UI rendering, Expo/Metro bundling, `expo-camera`/`expo-image-picker`/`expo-location`/
  `expo-file-system` calls on a device, SDK 56 API compatibility (Expo Router v56 `Stack`/`router.navigate`/
  `replace`, `expo-camera` `CameraView`, new `File`/`Directory` API), PBKDF2 speed in Hermes, keyboard behaviour
  with edge-to-edge (`KeyboardAvoidingView behavior="padding"`; check Notes and login fields), Android hardware
  back behaviour per step, the EAS build.
