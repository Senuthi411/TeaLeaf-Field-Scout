import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { readJSON as read } from "../../../utils/storage";
const links = {
  Dashboard: "/dashboard",
  Users: "/users",
  "Roles & Permissions": "/roles",
  Estates: "/estates",
  "Divisions & Blocks": "/divisions",
  "Boundary Mapping": "/mapping",
  "Feature Configuration": "/features",
  "Business Rules": "/rules",
  "Workflow Builder": "/workflows",
  "Audit Log": "/audit",
  "System Settings": "/settings",
};
export function useAdminController() {
  const path = useLocation().pathname.replace(/^\/admin/, "");
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mobile, setMobile] = useState(false),
    [toast, setToast] = useState(""),
    [dialog, setDialog] = useState(null),
    [version, setVersion] = useState(0);
  const host = useRef(null),
    dialogRef = useRef(null),
    [role, setRole] = useState("All"),
    [status, setStatus] = useState(""),
    [query, setQuery] = useState("");
  const auth = false;
  const route = (url) => {
    if (url === "/login") {
      logout()
        .then(() => navigate("/login", { replace: true }))
        .catch((error) => notify(error.message));
      return;
    }
    navigate(url.startsWith("/admin/") ? url : "/admin" + url);
    setMobile(false);
    setQuery("");
    setRole("All");
    setStatus("");
    window.scrollTo(0, 0);
  };
  const notify = (s) => setToast(s);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4500);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    if (dialog) {
      dialogRef.current?.showModal();
    } else dialogRef.current?.close();
  }, [dialog]);
  useEffect(() => {
    document.title =
      (Object.keys(links).find((k) => links[k] === path) || "TeaLeaf Admin") +
      " | TeaLeaf Field Scout";
    const initialize = () => {
      const root = host.current;
      if (!root) return;
      root
        .querySelectorAll('[data-name="Aside"] [data-name="Link"]')
        .forEach((el) => {
          const text = el.textContent?.trim() || "";
          const url = links[text];
          if (url) {
            el.setAttribute("role", "link");
            el.setAttribute("tabindex", "0");
            el.setAttribute("href", url);
            el.classList.toggle("nav-active", url === path);
            el.classList.add("nav-item");
            if (url === path) el.setAttribute("aria-current", "page");
            else el.removeAttribute("aria-current");
          }
        });
      root.querySelectorAll("button").forEach((b, i) => {
        if (!b.textContent?.trim() && !b.getAttribute("aria-label")) {
          const row = b.closest('[data-name^="Row "]');
          const idx = row
            ? Array.from(row.querySelectorAll("button")).indexOf(b)
            : i;
          b.setAttribute(
            "aria-label",
            row
              ? ["Edit user", "Reset user credentials", "Suspend user"][idx] ||
                  "User action"
              : "Open action",
          );
        }
      });
      root.querySelectorAll("a:not([href])").forEach((el) => {
        el.setAttribute("role", "button");
        el.tabIndex = 0;
      });
      root.querySelectorAll('[data-name^="Row "]').forEach((row) => {
        row.setAttribute("role", "row");
        const key = row.dataset.nodeId || "";
        const hidden = read("tealeaf:deleted", []);
        if (hidden.includes(key)) row.hidden = true;
        const edits = read("tealeaf:users", {});
        if (edits[key]) {
          const name = Array.from(row.querySelectorAll("p")).find(
            (p) => p.textContent?.trim() && p.textContent.trim().length > 3,
          );
          if (name && name.textContent !== edits[key])
            name.textContent = edits[key];
        }
      });
      root.querySelectorAll('input:not([type="checkbox"])').forEach((input) => {
        if (input.closest("dialog")) return;
        input.classList.add("native-input");
        const saved = read("tealeaf:saved:" + path, []);
        const item = saved.find((x) => x.id === input.dataset.nodeId);
        if (item && !input.dataset.restored) {
          input.value = item.value;
          input.dataset.restored = "true";
        }
        if (input.type === "email") {
          input.required = true;
          input.autocomplete = "username";
        }
        if (input.type === "password") {
          input.required = true;
          input.minLength = 8;
          input.autocomplete = "current-password";
        }
        if (!input.getAttribute("aria-label"))
          input.setAttribute("aria-label", input.placeholder || "Filter");
      });
    };
    initialize();
    const observer = new MutationObserver(initialize);
    if (host.current)
      observer.observe(host.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [path, version]);
  useEffect(() => {
    if (path !== "/users") return;
    const root = host.current;
    if (!root) return;
    root.querySelectorAll('[data-name^="Row "]').forEach((row) => {
      const text = row.textContent?.toLowerCase() || "";
      row.hidden =
        read("tealeaf:deleted", []).includes(row.dataset.nodeId || "") ||
        !text.includes(query.toLowerCase()) ||
        (role !== "All" && !text.includes(role.toLowerCase())) ||
        (!!status && !text.includes(status.toLowerCase()));
    });
  }, [query, role, status, path, version]);
  const exportData = () => {
    const text = host.current?.querySelector(".design-view")?.textContent || "";
    const blob = new Blob(
      [
        JSON.stringify(
          {
            screen: path,
            exportedAt: new Date().toISOString(),
            demo: true,
            content: text,
          },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = "tealeaf-" + path.slice(1) + ".json";
    a.click();
    URL.revokeObjectURL(url);
    notify("Demo data exported");
  };
  const click = (e) => {
    const target = e.target;
    const nav = target.closest('[data-name="Aside"] [data-name="Link"]');
    if (nav) {
      const dest = links[nav.textContent?.trim() || ""];
      if (dest) {
        e.preventDefault();
        route(dest);
        return;
      }
    }
    const control = target.closest('button,a,[role="button"]');
    if (!control) return;
    if (control.dataset.switch === "true") return;
    if (control.dataset.nodeId === "106:62") {
      const input = host.current?.querySelector('[data-node-id="106:58"]');
      if (input) input.type = input.type === "password" ? "text" : "password";
      return;
    }
    const label =
      control.textContent?.trim() || control.getAttribute("aria-label") || "";
    if (/Add (New )?User/i.test(label)) {
      route("/users?action=add");
      return;
    }
    if (/Edit user/.test(label)) {
      const row = control.closest('[data-name^="Row "]');
      setDialog({
        title: "Edit user",
        kind: "user",
        target: row?.dataset.nodeId,
      });
      return;
    }
    if (/Suspend user|Delete user/.test(label)) {
      const row = control.closest('[data-name^="Row "]');
      setDialog({
        title: "Suspend this user?",
        kind: "confirm",
        description: "This changes the user in this browser’s demo data.",
        action: () => {
          const ids = read("tealeaf:deleted", []);
          localStorage.setItem(
            "tealeaf:deleted",
            JSON.stringify([...ids, row?.dataset.nodeId]),
          );
          setVersion((v) => v + 1);
          notify("User suspended locally");
        },
      });
      return;
    }
    if (/Reset user credentials/.test(label)) {
      setDialog({
        title: "Reset credentials",
        description:
          "Demo preview: connect an authentication service to issue a secure credential reset.",
      });
      return;
    }
    if (/export|download/i.test(label)) {
      exportData();
      return;
    }
    if (/save|publish|commit|activate|deploy/i.test(label)) {
      setDialog({
        title: "Save these changes?",
        kind: "confirm",
        description:
          "Changes will be saved locally in this browser for the frontend demo.",
        action: () => {
          const values = Array.from(
            host.current?.querySelectorAll(".design-view input") || [],
          ).map((i) => ({ id: i.dataset.nodeId, value: i.value }));
          localStorage.setItem("tealeaf:saved:" + path, JSON.stringify(values));
          notify("Changes saved locally");
        },
      });
      return;
    }
    if (/discard|reset draft|reset to defaults/i.test(label)) {
      setDialog({
        title: "Discard local changes?",
        kind: "confirm",
        action: () => {
          localStorage.removeItem("tealeaf:saved:" + path);
          Object.keys(localStorage)
            .filter((k) => k.startsWith("tealeaf:toggle:"))
            .forEach((k) => localStorage.removeItem(k));
          setVersion((v) => v + 1);
          notify("Changes discarded");
        },
      });
      return;
    }
    if (
      path === "/users" &&
      [
        "All",
        "Field Worker",
        "Field Officer",
        "Estate Manager",
        "Agronomist",
        "Admin",
      ].includes(label)
    ) {
      setRole(label);
      return;
    }
    if (
      path === "/users" &&
      ["Active", "Inactive", "Suspended"].includes(label)
    ) {
      setStatus((s) => (s === label ? "" : label));
      return;
    }
    if (/ESC to clear/.test(label)) {
      setQuery("");
      const input = host.current?.querySelector(".design-view input");
      if (input) input.value = "";
      return;
    }
    if (/Run Diagnostics|Dry Run|Test Sandbox/i.test(label)) {
      setDialog({
        title: "Demo diagnostics",
        description:
          "The interface loaded successfully. Live device, network, rule execution and API diagnostics require backend services.",
      });
      return;
    }
    if (/Manage Polygon|Create Boundary|Precision Limits/i.test(label)) {
      route("/mapping");
      return;
    }
    if (/execution history|audit|history/i.test(label)) {
      route("/audit");
      return;
    }
    if (/emergency|freeze/i.test(label)) {
      setDialog({
        title: "Toggle emergency freeze?",
        kind: "confirm",
        description: "This only changes the local demo configuration.",
        action: () => {
          const next = !read("tealeaf:freeze", false);
          localStorage.setItem("tealeaf:freeze", JSON.stringify(next));
          document.body.classList.toggle("freeze", next);
          notify(
            next
              ? "Demo emergency freeze enabled"
              : "Demo emergency freeze disabled",
          );
        },
      });
      return;
    }
    if (/add|create|new|edit/i.test(label)) {
      setDialog({ title: label.replace(/^\+\s*/, ""), kind: "edit" });
      return;
    }
    if (/import/i.test(label)) {
      setDialog({
        title: "Batch import CSV",
        description:
          "CSV import requires a user-management API. You can add local demo users with Add New User.",
      });
      return;
    }
    if (control.closest('[data-name="Header"]')) {
      setDialog({
        title: "Administrator account",
        description:
          "Kavinda Rajapaksha · Lead System Administrator. You are viewing local demo data.",
      });
      return;
    }
    if (
      /next|previous|^\d+$|All Rules|Severity|Spatial GPS|SLA & Sync|Security|Synchronisation|Data retention|Notifications|Integrations|Standard|Overrides|Policy/.test(
        label,
      )
    ) {
      control.parentElement
        ?.querySelectorAll("[aria-selected]")
        .forEach((el) => el.setAttribute("aria-selected", "false"));
      control.setAttribute("aria-selected", "true");
      notify("Selected " + label + " · demo data");
      return;
    }
    setDialog({
      title: label || "Details",
      description:
        "This is a frontend preview. Live operational data and server actions require the corresponding backend service.",
    });
  };
  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget),
      name = String(data.get("name") || "");
    if (dialog?.kind === "user") {
      const users = read("tealeaf:users", {});
      users[dialog.target || "local-" + Date.now()] = name;
      localStorage.setItem("tealeaf:users", JSON.stringify(users));
      setVersion((v) => v + 1);
      notify(
        dialog.target ? "User updated locally" : "User added to local demo",
      );
    } else {
      localStorage.setItem(
        "tealeaf:draft:" + path,
        JSON.stringify(Object.fromEntries(data)),
      );
      notify("Draft saved locally");
    }
    setDialog(null);
  };

  return {
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
  };
}
