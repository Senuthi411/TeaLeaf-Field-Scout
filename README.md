# TeaLeaf Field Scout — Member 01 Admin Portal

Updated from the existing TeaLeaf frontend and its Figma design. The existing admin screens and TeaLeaf colors, typography, maps and visual assets are retained.

## Start

Use Node.js 20.19 or newer.

```sh
npm install
npm run dev
```

Open the URL Vite prints, then sign in at **/login**.

Development demo account:

- Email: **admin@tealeaf.com**
- Password: **Admin@12345**

These credentials work only in the development mock service. They are excluded from production JavaScript bundles.

No environment file is required to run the development demo. To customize configuration, copy `.env.example` to `.env`.

## Stack

React, JavaScript/JSX, Vite, plain CSS, Lucide React, React Router DOM and the native Fetch API. There is no TypeScript, CSS framework or component framework dependency.

## Implemented behavior

- Login validates email and all five password requirements, supports password visibility and Remember Me, and displays loading and error states.
- All /admin routes require a mock session. Valid credentials redirect to /admin/dashboard.
- A normal mock session lasts up to 8 hours in the current browser tab and survives refresh. Remember Me stores a session for up to 30 days. Logout removes both forms of mock session.
- Forgot Password validates the email and simulates a recovery request. It does not send email in mock mode.
- FIDO2 is visibly unavailable until backend integration.
- Sidebar navigation, global page search, estate selection, notification popover, logout and responsive mobile navigation work.
- Users support validated create/edit, search, role/estate/status filters, sorting, pagination, suspension/reactivation, deletion and CSV import/export. The current administrator is protected from deletion and role/status changes.
- Settings support category tabs, validated values, switches, save, reload persistence and discard.
- Existing permission switches, configuration drafts, confirmation dialogs, local emergency-freeze state and view exports remain available.

Other estate, boundary-map, feature, rule, workflow and audit screens preserve the existing design and sample data. Their existing local preview/draft actions remain; they do not perform live GIS editing, execute rules, synchronize devices or operate a production backend. Those operational capabilities require their corresponding backend and further API wiring.

## Routes

Public: /login, /forgot-password, /recovery (redirect), and the Not Found page.

Protected:

```text
/admin/dashboard
/admin/users
/admin/roles
/admin/estates
/admin/divisions
/admin/mapping
/admin/features
/admin/rules
/admin/workflows
/admin/audit
/admin/settings
```

Previous short URLs such as /dashboard and /users redirect to their protected /admin equivalents.

## Structure

```text
src/
  assets/                  Login emblem
  components/
    common/                Dialogs, loading/error states and switches
    layout/                Sidebar, topbar and admin chrome
  features/
    auth/                  Login and account recovery
    admin/
      hooks/               Admin interaction controller and users state
      screens/             Retained and updated admin screens
  pages/                   Not Found
  routes/                  Route protection and navigation metadata
  services/
    api/                   Native Fetch client and real service adapters
    mock/                  Development authentication and user records
    authService.js         Authentication service selection
    settingsService.js     Settings mock/API adapter
    userService.js         User mock/API adapter
  context/                 Authentication state and session initialization
  hooks/                   Shared authentication and media-query hooks
  utils/                   Validation, CSV and storage helpers
  styles/                  Plain CSS design, layout and responsive styling
  App.jsx
  main.jsx
public/assets/             Existing Figma images/SVGs and local font files
tests/unit/                Password and CSV tests
scripts/verify.cjs         Browser verification
```

The retained design surfaces use ordinary CSS classes in styles/design.css. Shared components, new feature styles and responsive adaptations are in styles/app.css. Figma data-node-id attributes are retained for design comparisons.

## Backend integration

In a production environment configure:

```dotenv
VITE_AUTH_MODE=api
VITE_API_BASE_URL=https://your-backend.example/api
```

The mock authentication module cannot be selected in a production build. Production preview requires a real backend; use npm run dev for the mock demo.

The native Fetch client in src/services/api/client.js handles JSON, credentials, aborts/timeouts, non-JSON responses and HTTP/network errors. Real service adapters are separate from mock services.

Expected REST contract:

| Method | Endpoint                  | Response         |
| ------ | ------------------------- | ---------------- |
| POST   | /auth/login               | { user }         |
| GET    | /auth/session             | { user }, or 401 |
| POST   | /auth/logout              | 204 or JSON      |
| POST   | /auth/forgot-password     | Success response |
| GET    | /users                    | { users: [] }    |
| POST   | /users                    | { user }         |
| PATCH  | /users/:id                | { user }         |
| DELETE | /users/:id                | 204 or JSON      |
| POST   | /users/import             | Success response |
| POST   | /users/:id/reset-password | Success response |
| GET    | /settings                 | { settings }     |
| PATCH  | /settings                 | { settings }     |

Login sends { email, password, rememberMe }. The administrator user must include id, email, name and role (Admin, admin or System Admin); title is optional. Errors may return { message, errors } with an appropriate HTTP status.

Use server-managed sessions through secure HttpOnly cookies and enforce authorization in the backend. Configure CORS and any CSRF requirements on your server/client adapter. VITE\_ variables are public configuration, so never place secrets in them.

## CSV users

Required headers: name,email,role. Optional: estate,division,status,employeeId.

Allowed roles: Field Worker, Field Officer, Estate Manager, Agronomist, Admin. Status may be Active, Inactive or Suspended. If estate is omitted, the development default is used. Imports validate all rows and duplicate emails before writing.

## Build and verify

```sh
npm run build
npm run preview
npm test
```

With the development server running:

```sh
npm run verify
# If Vite is on another port:
npm run verify -- http://127.0.0.1:5174
```

The browser checks use Playwright Chromium, falling back to installed Microsoft Edge. If neither is available, install the test browser with `npx playwright install chromium`.

Verification covers authentication, invalid credentials, route guards, refresh and Remember Me, logout, all existing routes, visible local assets, users CRUD/import/export, settings, permissions, and desktop/tablet/mobile layouts. Screenshots and the report are generated in artifacts/verification.

For static hosting, configure an SPA fallback to index.html so direct visits and refreshes on /admin routes work.

## Local data

Development data is stored under tealeaf: keys in browser storage. Clearing site data resets the demo. Existing local user edits and saved settings from the previous frontend are migrated where available.

The release ZIP contains source, all required design assets, dependency manifests/lockfile, environment example, README and tests. node_modules, local environment files, build output and temporary conversion files are excluded. Install dependencies with npm install after extracting.
