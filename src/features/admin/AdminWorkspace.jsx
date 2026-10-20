import { lazy, Suspense } from "react";
import { Menu } from "lucide-react";
import AdminChrome from "../../components/layout/AdminChrome";
import AdminDialog from "../../components/common/AdminDialog";
import LoadingState from "../../components/common/LoadingState";
import { useAdminController } from "./hooks/useAdminController";
const screens = {
  dashboard: lazy(() => import("./screens/Dashboard")),
  users: lazy(() => import("./screens/Users")),
  roles: lazy(() => import("./screens/Roles")),
  estates: lazy(() => import("./screens/Estates")),
  divisions: lazy(() => import("./screens/Estates")),
  mapping: lazy(() => import("./screens/Mapping")),
  features: lazy(() => import("./screens/Features")),
  rules: lazy(() => import("./screens/Rules")),
  workflows: lazy(() => import("./screens/Workflows")),
  audit: lazy(() => import("./screens/Audit")),
  settings: lazy(() => import("./screens/Settings")),
};
export default function AdminWorkspace() {
  const controller = useAdminController();
  const {
    host,
    dialogRef,
    path,
    mobile,
    setMobile,
    toast,
    dialog,
    setDialog,
    version,
    setQuery,
    route,
    click,
    submit,
  } = controller;
  const Screen = screens[path.slice(1)] || screens.dashboard;
  return (
    <div
      ref={host}
      className={"portal " + (mobile ? "menu-open" : "")}
      onClick={click}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setMobile(false);
          setQuery("");
        }
        if (
          (event.key === "Enter" || event.key === " ") &&
          event.target.matches('a[role="button"]')
        ) {
          event.preventDefault();
          event.target.click();
        }
      }}
    >
      <a href="#admin-content" className="skip-link">
        Skip to content
      </a>
      <AdminChrome
        mobileOpen={mobile}
        onClose={() => {
          setMobile(false);
          requestAnimationFrame(() =>
            document.querySelector(".mobile-menu")?.focus(),
          );
        }}
      />
      <button
        className="mobile-menu"
        aria-label="Toggle navigation"
        aria-expanded={mobile}
        onClick={(event) => {
          event.stopPropagation();
          setMobile((value) => !value);
        }}
      >
        <Menu size={20} />
      </button>
      {mobile && (
        <button
          className="menu-scrim"
          aria-label="Close navigation"
          onClick={(event) => {
            event.stopPropagation();
            setMobile(false);
          }}
        />
      )}
      <main id="admin-content" className="portal-content">
        <Suspense fallback={<LoadingState />}>
          <div
            key={path + version}
            className={"design-view page-" + path.slice(1)}
            onInput={(event) => {
              if (path === "/users" && event.target.type === "text")
                setQuery(event.target.value);
            }}
          >
            <Screen />
          </div>
        </Suspense>
      </main>
      {toast && (
        <div role="status" className="toast">
          {toast}
        </div>
      )}
      <AdminDialog
        dialogRef={dialogRef}
        dialog={dialog}
        setDialog={setDialog}
        submit={submit}
        route={route}
      />
    </div>
  );
}
