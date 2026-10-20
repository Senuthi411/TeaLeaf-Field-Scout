import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  UserPlus,
  Upload,
  Download,
  Search,
  Pencil,
  KeyRound,
  UserRoundX,
  LockKeyhole,
  Trash2,
  Radio,
  Cog,
  Timer,
  Lock,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  LoaderCircle,
} from "lucide-react";
import { useUsers } from "../hooks/useUsers";
import { userService } from "../../../services/userService";
import { isValidEmail } from "../../../utils/validation";
import { parseCSV, toCSV, downloadFile } from "../../../utils/csv";
import Modal from "../../../components/common/Modal";
import LoadingState from "../../../components/common/LoadingState";
export const roles = [
  "Field Worker",
  "Field Officer",
  "Estate Manager",
  "Agronomist",
  "Admin",
];
const empty = {
  name: "",
  email: "",
  role: "Field Worker",
  estate: "Nuwara Eliya Highlands",
  division: "",
  employeeId: "",
  status: "Active",
};
function validateUser(user) {
  if (user.name.trim().length < 2)
    return "Enter a full name with at least two characters.";
  if (!isValidEmail(user.email)) return "Enter a valid work email.";
  if (!roles.includes(user.role)) return "Select a valid role.";
  if (!user.estate.trim()) return "Enter an estate or assignment.";
  if (!["Active", "Inactive", "Suspended"].includes(user.status))
    return "Select a valid status.";
  return "";
}
export default function Users() {
  const { users, loading, error, working, refresh, run } = useUsers();
  const [params, setParams] = useSearchParams();
  const fileRef = useRef(null);
  const [search, setSearch] = useState(""),
    [role, setRole] = useState("All"),
    [estate, setEstate] = useState("All"),
    [status, setStatus] = useState("All"),
    [page, setPage] = useState(1),
    [sort, setSort] = useState({ key: "", direction: 1 });
  const [editing, setEditing] = useState(
      params.get("action") === "add" ? { ...empty } : null,
    ),
    [formError, setFormError] = useState(""),
    [notice, setNotice] = useState(""),
    [confirmation, setConfirmation] = useState(null);
  const filtered = useMemo(
    () =>
      users
        .filter(
          (user) =>
            [user.name, user.email, user.employeeId, user.estate].some(
              (value) =>
                (value || "").toLowerCase().includes(search.toLowerCase()),
            ) &&
            (role === "All" || user.role === role) &&
            (estate === "All" || user.estate === estate) &&
            (status === "All" || user.status === status),
        )
        .sort((a, b) =>
          sort.key
            ? String(a[sort.key]).localeCompare(String(b[sort.key])) *
              sort.direction
            : 0,
        ),
    [users, search, role, estate, status, sort],
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / 6)),
    currentPage = Math.min(page, pageCount),
    visible = filtered.slice((currentPage - 1) * 6, currentPage * 6);
  function closeEditor() {
    setEditing(null);
    setFormError("");
    if (params.has("action")) {
      params.delete("action");
      setParams(params, { replace: true });
    }
  }
  async function save(event) {
    event.preventDefault();
    const value = {
      ...editing,
      name: editing.name.trim(),
      email: editing.email.trim().toLowerCase(),
      estate: editing.estate.trim(),
    };
    const failure = validateUser(value);
    if (failure) {
      setFormError(failure);
      return;
    }
    try {
      await run(() => userService.saveUser(value));
      closeEditor();
      setNotice("User saved successfully.");
    } catch (failure) {
      setFormError(failure.message);
    }
  }
  async function importFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      setNotice("Import failed: the CSV must be smaller than 1 MB.");
      event.target.value = "";
      return;
    }
    try {
      const incoming = parseCSV(await file.text()).map((row) => ({
        ...empty,
        ...row,
        employeeId: row.employeeid || row.employeeId || "",
      }));
      for (const [index, value] of incoming.entries()) {
        const failure = validateUser(value);
        if (failure) throw new Error("Row " + (index + 2) + ": " + failure);
      }
      await run(() => userService.importUsers(incoming));
      setNotice(incoming.length + " users imported successfully.");
    } catch (failure) {
      setNotice("Import failed: " + failure.message);
    } finally {
      event.target.value = "";
    }
  }
  async function confirm() {
    try {
      await run(confirmation.action);
      setNotice(confirmation.success);
      setConfirmation(null);
    } catch {
      /* The service error is displayed above the table. */
    }
  }
  const filter = (setter, value) => {
    setter(value);
    setPage(1);
  };
  return (
    <section
      className="users-page"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="breadcrumb">
        Admin › System › <strong>Users</strong>
      </div>
      <div className="page-title-row">
        <div className="title-with-count">
          <h1>User Management & Access Control</h1>
          <span>{users.length.toLocaleString()} Accounts Available</span>
        </div>
        <div className="page-actions">
          <button
            className="btn"
            onClick={() => fileRef.current.click()}
            disabled={working}
          >
            <Upload size={16} />
            Batch Import CSV
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditing({ ...empty });
              setFormError("");
            }}
          >
            <UserPlus size={17} />
            Add New User
          </button>
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept=".csv,text/csv"
        className="visually-hidden"
        aria-label="Import users CSV"
        onChange={importFile}
      />
      <div className="user-metrics">
        {[
          [
            "ACTIVE IN FIELD",
            users.filter(
              (user) =>
                user.role === "Field Worker" && user.status === "Active",
            ).length,
            "Available field worker accounts",
            Radio,
            "green",
          ],
          [
            "AGRONOMY STAFF",
            users.filter((user) => user.role === "Agronomist").length,
            "Pathology and agronomy access",
            Cog,
            "blue",
          ],
          [
            "ESTATE PERSONNEL",
            users.filter((user) => user.role === "Estate Manager").length,
            "Estate management accounts",
            Timer,
            "amber",
          ],
          [
            "SUSPENDED / LOCKED",
            users.filter((user) => user.status === "Suspended").length,
            "Accounts needing review",
            Lock,
            "red",
          ],
        ].map(([title, value, caption, Icon, color]) => (
          <div className={"metric-card " + color} key={title}>
            <div>
              <h2>{title}</h2>
              <strong>{value}</strong>
              <p>{caption}</p>
            </div>
            <span>
              <Icon size={23} />
            </span>
          </div>
        ))}
      </div>
      <div className="users-filters">
        <div className="user-search">
          <Search size={19} />
          <input
            aria-label="Search users"
            placeholder="Search by name, email, employee ID, or estate…"
            value={search}
            onChange={(event) => filter(setSearch, event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") filter(setSearch, "");
            }}
          />
          <button onClick={() => filter(setSearch, "")}>Clear</button>
        </div>
        <div className="filter-line">
          <span>ROLE:</span>
          <div className="role-filters">
            {["All", ...roles].map((value) => (
              <button
                key={value}
                className={role === value ? "selected" : ""}
                aria-pressed={role === value}
                onClick={() => filter(setRole, value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-line lower-filters">
          <label>
            ESTATE:
            <select
              aria-label="Filter by estate"
              value={estate}
              onChange={(event) => filter(setEstate, event.target.value)}
            >
              <option value="All">All estates</option>
              {[...new Set(users.map((user) => user.estate))].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label>
            STATUS:
            <select
              aria-label="Filter by status"
              value={status}
              onChange={(event) => filter(setStatus, event.target.value)}
            >
              {["All", "Active", "Inactive", "Suspended"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <button
            className="text-button"
            onClick={() =>
              downloadFile(
                toCSV(filtered, [
                  "name",
                  "email",
                  "role",
                  "estate",
                  "division",
                  "status",
                  "employeeId",
                ]),
                "tealeaf-users.csv",
              )
            }
          >
            <Download size={14} />
            Export results
          </button>
        </div>
      </div>
      {notice && (
        <p className="alert alert-success" role="status">
          {notice}
          <button className="text-button" onClick={() => setNotice("")}>
            Dismiss
          </button>
        </p>
      )}
      {error && (
        <div className="alert alert-error" role="alert">
          {error}
          <button className="text-button" onClick={refresh}>
            Retry
          </button>
        </div>
      )}
      <div className="users-table-card">
        {loading ? (
          <LoadingState message="Loading users…" />
        ) : (
          <>
            <div
              className="table-scroll"
              tabIndex={0}
              aria-label="User accounts table"
            >
              <table className="users-table">
                <thead>
                  <tr>
                    {[
                      ["name", "USER IDENTITY"],
                      ["role", "ROLE AUTHORIZATION"],
                      ["estate", "ASSIGNED ESTATE & DIVISION"],
                      ["status", "LIFECYCLE STATE"],
                      ["", "LAST LOGIN & SYNC"],
                      ["", "ROW ACTIONS"],
                    ].map(([key, title]) => (
                      <th key={title}>
                        {key ? (
                          <button
                            onClick={() =>
                              setSort((current) => ({
                                key,
                                direction:
                                  current.key === key ? -current.direction : 1,
                              }))
                            }
                          >
                            {title}
                            <ArrowUpDown size={11} />
                          </button>
                        ) : (
                          title
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visible.map((user) => (
                    <tr
                      key={user.id}
                      className={
                        user.status === "Suspended" ? "suspended-row" : ""
                      }
                    >
                      <td>
                        <div className="user-cell">
                          <span
                            className={
                              "initials role-" +
                              user.role.toLowerCase().replaceAll(" ", "-")
                            }
                          >
                            {user.name
                              .split(" ")
                              .filter(Boolean)
                              .map((name) => name[0])
                              .slice(0, 2)
                              .join("")}
                          </span>
                          <div>
                            <strong>{user.name}</strong>{" "}
                            <small>{user.employeeId}</small>
                            <p>{user.email || "Email not provided"}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={
                            "role-badge role-" +
                            user.role.toLowerCase().replaceAll(" ", "-")
                          }
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>
                        {user.estate}
                        <p>{user.division || "Unassigned division"}</p>
                      </td>
                      <td>
                        <span
                          className={
                            "status-badge " + user.status.toLowerCase()
                          }
                        >
                          ● {user.status}
                        </span>
                      </td>
                      <td>
                        {user.lastLogin}
                        <p>Sync: {user.sync}</p>
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            className="icon-button"
                            aria-label={"Edit " + user.name}
                            onClick={() => {
                              setEditing({ ...user });
                              setFormError("");
                            }}
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            className="icon-button"
                            aria-label={"Reset credentials for " + user.name}
                            onClick={() =>
                              setConfirmation({
                                title: "Request a credential reset?",
                                description:
                                  "In development this records a local reset request; no email is sent.",
                                action: () => userService.requestReset(user.id),
                                success: "Credential reset request recorded.",
                              })
                            }
                          >
                            <KeyRound size={16} />
                          </button>
                          {user.protected ? (
                            <span
                              className="icon-button"
                              title="Current administrator is protected"
                            >
                              <LockKeyhole size={15} />
                            </span>
                          ) : (
                            <button
                              className="icon-button"
                              aria-label={
                                (user.status === "Suspended"
                                  ? "Reactivate "
                                  : "Suspend ") + user.name
                              }
                              onClick={() =>
                                setConfirmation({
                                  title:
                                    user.status === "Suspended"
                                      ? "Reactivate this user?"
                                      : "Suspend this user?",
                                  action: () =>
                                    userService.saveUser({
                                      ...user,
                                      status:
                                        user.status === "Suspended"
                                          ? "Active"
                                          : "Suspended",
                                    }),
                                  success: "User status updated.",
                                })
                              }
                            >
                              <UserRoundX size={16} />
                            </button>
                          )}
                          {!user.protected && user.status === "Suspended" && (
                            <button
                              className="icon-button danger"
                              aria-label={"Delete " + user.name}
                              onClick={() =>
                                setConfirmation({
                                  title: "Delete this user?",
                                  description:
                                    "This removes the user from the local development records.",
                                  action: () => userService.deleteUser(user.id),
                                  success: "User deleted.",
                                })
                              }
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!visible.length && (
                    <tr>
                      <td colSpan={6} className="empty-state">
                        No users match your search and filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <footer className="table-footer">
              <span>
                Showing {filtered.length ? (currentPage - 1) * 6 + 1 : 0} to{" "}
                {Math.min(currentPage * 6, filtered.length)} of{" "}
                {filtered.length} available accounts
              </span>
              <div>
                <button
                  className="icon-button"
                  aria-label="Previous page"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((value) => value - 1)}
                >
                  <ChevronLeft size={17} />
                </button>
                <span>
                  {currentPage} / {pageCount}
                </span>
                <button
                  className="icon-button"
                  aria-label="Next page"
                  disabled={currentPage >= pageCount}
                  onClick={() => setPage((value) => value + 1)}
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </footer>
          </>
        )}
      </div>
      {editing && (
        <Modal
          title={editing.id ? "Edit user" : "Add new user"}
          onClose={closeEditor}
        >
          <form className="user-editor" onSubmit={save}>
            {formError && (
              <p className="alert alert-error" role="alert">
                {formError}
              </p>
            )}
            <label>
              Full name
              <input
                required
                minLength={2}
                maxLength={100}
                value={editing.name}
                onChange={(event) =>
                  setEditing((value) => ({
                    ...value,
                    name: event.target.value,
                  }))
                }
              />
            </label>
            <label>
              Work email
              <input
                required
                type="email"
                value={editing.email}
                disabled={editing.protected}
                onChange={(event) =>
                  setEditing((value) => ({
                    ...value,
                    email: event.target.value,
                  }))
                }
              />
            </label>
            <div className="form-grid">
              <label>
                Role
                <select
                  disabled={editing.protected}
                  value={editing.role}
                  onChange={(event) =>
                    setEditing((value) => ({
                      ...value,
                      role: event.target.value,
                    }))
                  }
                >
                  {roles.map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label>
                Status
                <select
                  disabled={editing.protected}
                  value={editing.status}
                  onChange={(event) =>
                    setEditing((value) => ({
                      ...value,
                      status: event.target.value,
                    }))
                  }
                >
                  {["Active", "Inactive", "Suspended"].map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              Assigned estate
              <input
                required
                value={editing.estate}
                onChange={(event) =>
                  setEditing((value) => ({
                    ...value,
                    estate: event.target.value,
                  }))
                }
              />
            </label>
            <label>
              Division / block
              <input
                value={editing.division || ""}
                onChange={(event) =>
                  setEditing((value) => ({
                    ...value,
                    division: event.target.value,
                  }))
                }
              />
            </label>
            <label>
              Employee ID
              <input
                value={editing.employeeId || ""}
                onChange={(event) =>
                  setEditing((value) => ({
                    ...value,
                    employeeId: event.target.value,
                  }))
                }
              />
            </label>
            <div className="dialog-actions">
              <button type="button" onClick={closeEditor} disabled={working}>
                Cancel
              </button>
              <button className="primary" type="submit" disabled={working}>
                {working ? "Saving…" : "Save user"}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {confirmation && (
        <Modal title={confirmation.title} onClose={() => setConfirmation(null)}>
          {confirmation.description && <p>{confirmation.description}</p>}
          <div className="dialog-actions">
            <button onClick={() => setConfirmation(null)} disabled={working}>
              Cancel
            </button>
            <button className="primary" onClick={confirm} disabled={working}>
              {working ? (
                <LoaderCircle size={16} className="spin" />
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
