import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, ChevronDown, Leaf } from "lucide-react";
import { navigationItems } from "../../routes/adminNavigation";
import { useAuth } from "../../hooks/useAuth";
import { readJSON, writeJSON } from "../../utils/storage";
export default function Topbar({ error }) {
  const { user } = useAuth();
  const [search, setSearch] = useState(""),
    [notifications, setNotifications] = useState(false);
  const [estate, setEstate] = useState(() =>
    readJSON("tealeaf:selected-estate", "Nuwara Eliya Highlands"),
  );
  const results = search.trim()
    ? navigationItems.filter(([title]) =>
        title.toLowerCase().includes(search.toLowerCase()),
      )
    : [];
  return (
    <header className="admin-topbar">
      <div className="global-search">
        <Search size={17} aria-hidden="true" />
        <input
          aria-label="Search admin pages"
          placeholder="Search estates, users, blocks, audit events…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setSearch("");
          }}
        />
        {search && (
          <div className="search-results">
            {results.length ? (
              results.map(([title, page, Icon]) => (
                <Link
                  key={page}
                  to={"/admin/" + page}
                  onClick={() => setSearch("")}
                >
                  <Icon size={16} />
                  {title}
                </Link>
              ))
            ) : (
              <p>No matching pages.</p>
            )}
          </div>
        )}
      </div>
      <label className="estate-select">
        <Leaf size={15} />
        <span className="visually-hidden">Current estate</span>
        <select
          value={estate}
          onChange={(event) => {
            setEstate(event.target.value);
            writeJSON("tealeaf:selected-estate", event.target.value);
          }}
        >
          <option>Nuwara Eliya Highlands</option>
          <option>Dimbula Basin Estate</option>
          <option>Uva Highlands East</option>
          <option>Kandy Central</option>
        </select>
        <ChevronDown size={13} />
      </label>
      <div className="topbar-account">
        <div className="notification-container">
          <button
            className="icon-button"
            aria-label="Notifications"
            aria-expanded={notifications}
            onClick={() => setNotifications((value) => !value)}
          >
            <Bell size={19} />
          </button>
          {notifications && (
            <div className="notification-panel">
              <strong>Notifications</strong>
              <p>No unread notifications in this local workspace.</p>
            </div>
          )}
        </div>
        <div className="user-identity">
          <strong>{user?.name}</strong>
          <span>{user?.title || "Administrator"}</span>
        </div>
        <span className="user-avatar" aria-label={user?.name}>
          {user?.name
            ?.split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </span>
      </div>
      {error && (
        <p className="logout-error" role="alert">
          {error}
        </p>
      )}
    </header>
  );
}
