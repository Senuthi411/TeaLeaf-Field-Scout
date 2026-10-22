# TeaLeaf Administrator Portal — React + TypeScript

The Administrator frontend now runs as a React + TypeScript SPA, using the web stack specified in the supplied Implementation Baseline v3.8 and Module-wise Web UI specification. The login design and administrator screens come from the Tea Scout Figma file.

## Run

Requires Node.js 22.12+ (development verified with Node.js 24).

```sh
npm install
npm run dev
```

Open http://localhost:5174/login.

```sh
npm run check   # TypeScript
npm run build   # Production build in dist/
npm run preview # Preview production build
```

## Demo sign-in

- Email: `admin@tealeaf.test` (or username `admin`)
- Password: `TeaLeaf@2026`

The login page also has a **Use demo credentials** button. Empty or incorrect credentials display errors; the eye button shows/hides the password. Protected deep links redirect to login and restore the requested route after sign-in. Profile → Sign out clears the demo session and returns to login. Remember me saves only the username, never the password. The synthetic session expires after one hour.

This is a frontend demo, not real authentication. Production sign-in, JWT issuance and refresh, revocation, password changes, permissions, and persistent server data require the Node.js/Express Identity API. No Express or SQLite backend is included in this frontend scope. The PDFs specify REST/OpenAPI, JWT, Express, and SQLite for that backend; React Native is a separate mobile application.

## Structure

```text
apps/web/
  src/
    shell/                         React application and protected routing
    features/identity/
      domain/                      Auth types and adapter port
      application/                 Auth provider
      infrastructure/mock/         Synthetic sign-in adapter
      presentation/                Login, portal, and lazy-loaded screen components
      routes.manifest.ts           Identity routes and required permissions
  public/assets/                   Original local Figma artwork and icons
```

The app uses React Router as its single navigation library, Vite for development/builds, and plain CSS design tokens/styles. The fixed web framework requirement comes from the PDFs; Vite and React Router are supporting implementation choices. Routes include `/login`, `/admin`, `/admin/users`, `/admin/roles`, `/admin/scopes`, `/admin/estates`, `/admin/divisions`, `/admin/devices`, and `/profile`.

Local demo records and profile preferences are stored under `tealeaf.react-demo`; only a synthetic session marker is stored in sessionStorage. Existing root `app.js`, `screens.js`, `index.html`, and `server.cjs` are the earlier vanilla prototype/reference and are not used by the React app or production build. Root `design.css` and `styles.css` retain the existing Figma measurements and responsive rules.

## Verification

Type checking and production build pass. Browser checks in `verify-react.cjs` cover protected redirects, empty credentials, wrong credentials, password visibility, return navigation, sign-out, mobile overflow, and local asset loading. These browser checks require a headless Chromium/Edge session on debugging port 9222; they do not install a test dependency or start a browser themselves.

For deployment, configure the static host to serve `dist/index.html` for SPA paths such as `/login` and `/admin/users`.
