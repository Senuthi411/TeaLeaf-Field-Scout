import { useEffect, useRef } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { NavLink } from "react-router-dom";
import { Leaf, Cloud, X, LogOut, LoaderCircle } from "lucide-react";
import { navigationGroups } from "../../routes/adminNavigation";
import { appConfig } from "../../services/config";
export default function Sidebar({ onClose, onLogout, loggingOut, mobileOpen }) {
  const isSmall = useMediaQuery("(max-width:1049px)"),
    ref = useRef(null);
  useEffect(() => {
    if (isSmall && mobileOpen) ref.current?.querySelector("button")?.focus();
  }, [isSmall, mobileOpen]);
  return (
    <aside
      ref={ref}
      inert={isSmall && !mobileOpen ? true : undefined}
      aria-hidden={isSmall && !mobileOpen ? true : undefined}
      onKeyDown={(event) => {
        if (!isSmall || !mobileOpen) return;
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
        if (event.key === "Tab") {
          const items = [
            ...ref.current.querySelectorAll("a,button:not(:disabled)"),
          ];
          const first = items[0],
            last = items.at(-1);
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
      }}
      className="admin-sidebar"
      aria-label="Main navigation"
    >
      <div className="sidebar-body">
        <header className="sidebar-brand">
          <span className="brand-symbol">
            <Leaf size={23} />
          </span>
          <div>
            <strong>TeaLeaf Field Scout</strong>
            <small>ADMIN & SYSTEM MGMT</small>
          </div>
          <button
            className="icon-button sidebar-close"
            aria-label="Close navigation"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </header>
        <nav>
          {navigationGroups.map((group) => (
            <section key={group.label} className="nav-group">
              <h2>{group.label}</h2>
              {group.items.map(([label, page, Icon]) => (
                <NavLink
                  key={page}
                  to={"/admin/" + page}
                  onClick={onClose}
                  className={({ isActive }) =>
                    "sidebar-link" + (isActive ? " active" : "")
                  }
                >
                  <Icon size={17} aria-hidden="true" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </section>
          ))}
        </nav>
      </div>
      <footer className="sidebar-footer">
        <button
          className="sidebar-logout"
          onClick={onLogout}
          disabled={loggingOut}
        >
          {loggingOut ? (
            <LoaderCircle size={17} className="spin" />
          ) : (
            <LogOut size={17} />
          )}{" "}
          {loggingOut ? "Signing out…" : "Logout"}
        </button>
        <div className="workspace-status">
          <span />
          {appConfig.isDevelopment
            ? "DEVELOPMENT WORKSPACE"
            : "ADMIN WORKSPACE"}
          <Cloud size={14} />
        </div>
      </footer>
    </aside>
  );
}
