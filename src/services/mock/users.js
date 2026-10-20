import { readJSON, writeJSON } from "../../utils/storage";
const KEY = "tealeaf:admin:users:v1";
const seed = [
  {
    id: "106:1056",
    name: "Kasun Bandara",
    email: "k.bandara@field.tealeaf.lk",
    employeeId: "EMP-7704",
    role: "Field Worker",
    estate: "Nuwara Eliya Highlands",
    division: "DIV-02 / Block B2",
    status: "Active",
    lastLogin: "Today, 08:42 AM",
    sync: "14 min ago (Handheld 09)",
  },
  {
    id: "106:1096",
    name: "Dr. Nilmini Perera",
    email: "n.perera@agri-research.gov.lk",
    employeeId: "EMP-0142",
    role: "Agronomist",
    estate: "Central Pathology Lab",
    division: "All Divisions / Multi-site",
    status: "Active",
    lastLogin: "Yesterday, 17:15 PM",
    sync: "18h ago (Web Terminal)",
  },
  {
    id: "106:1136",
    name: "Rohan Jayasuriya",
    email: "rohan.j@tealeaf.lk",
    employeeId: "EMP-3921",
    role: "Field Officer",
    estate: "Dimbula Valley Estate",
    division: "DIV-01 / Upper Slopes",
    status: "Active",
    lastLogin: "Today, 06:10 AM",
    sync: "Live (Dual-Link)",
  },
  {
    id: "106:1176",
    name: "Pradeep Mendis",
    email: "p.mendis@plantationcorp.lk",
    employeeId: "EMP-0881",
    role: "Estate Manager",
    estate: "Uva High Range",
    division: "Full Jurisdiction",
    status: "Active",
    lastLogin: "04 Mar 2025",
    sync: "2d ago (Web HQ)",
  },
  {
    id: "106:1216",
    name: "Kavinda Rajapaksha",
    email: "admin@tealeaf.com",
    employeeId: "EMP-0002",
    role: "Admin",
    estate: "Enterprise Root",
    division: "Global Access",
    status: "Active",
    lastLogin: "Online Now",
    sync: "Active Session",
    protected: true,
  },
  {
    id: "106:1256",
    name: "Suresh Muthuraman",
    email: "suresh.m@field.tealeaf.lk",
    employeeId: "EMP-8109",
    role: "Field Worker",
    estate: "Kandy Central Terraces",
    division: "DIV-04 / Valley 1",
    status: "Suspended",
    lastLogin: "19 Feb 2025",
    sync: "Auth lockout triggered",
  },
];
function records() {
  const existing = readJSON(KEY, null);
  if (Array.isArray(existing)) return existing;
  const edits = readJSON("tealeaf:users", {}),
    hidden = readJSON("tealeaf:deleted", []);
  const users = seed.map((user) => ({
    ...user,
    name: edits[user.id] || user.name,
    status: hidden.includes(user.id) ? "Suspended" : user.status,
  }));
  for (const [id, name] of Object.entries(edits))
    if (id.startsWith("local-"))
      users.push({
        id,
        name,
        email: "",
        role: "Field Worker",
        estate: "Unassigned",
        status: "Active",
        lastLogin: "Not signed in",
        sync: "Not connected",
      });
  writeJSON(KEY, users);
  return users;
}
export async function listUsers() {
  return records();
}
export async function saveUser(user) {
  const users = records();
  if (
    users.some(
      (item) =>
        item.email?.toLowerCase() === user.email.toLowerCase() &&
        item.id !== user.id,
    )
  )
    throw new Error("A user with this email address already exists.");
  const previous = users.find((item) => item.id === user.id);
  const value = {
    ...previous,
    ...user,
    id: user.id || crypto.randomUUID(),
    lastLogin: previous?.lastLogin || "Not signed in",
    sync: previous?.sync || "Not connected",
  };
  if (
    previous?.protected &&
    (value.email !== previous.email ||
      value.role !== previous.role ||
      value.status !== "Active")
  )
    throw new Error(
      "The current administrator’s role, email and status cannot be changed here.",
    );
  writeJSON(
    KEY,
    previous
      ? users.map((item) => (item.id === value.id ? value : item))
      : [...users, value],
  );
  return value;
}
export async function deleteUser(id) {
  const users = records();
  if (users.find((item) => item.id === id)?.protected)
    throw new Error("The current administrator cannot be deleted.");
  writeJSON(
    KEY,
    users.filter((item) => item.id !== id),
  );
}
export async function importUsers(incoming) {
  const users = records(),
    emails = new Set(users.map((user) => user.email.toLowerCase()));
  for (const user of incoming) {
    if (emails.has(user.email.toLowerCase()))
      throw new Error("Duplicate email in import: " + user.email);
    emails.add(user.email.toLowerCase());
  }
  writeJSON(KEY, [
    ...users,
    ...incoming.map((user) => ({
      ...user,
      id: crypto.randomUUID(),
      lastLogin: "Not signed in",
      sync: "Not connected",
    })),
  ]);
}
export async function requestReset(id) {
  const users = records();
  writeJSON(
    KEY,
    users.map((user) =>
      user.id === id
        ? { ...user, resetRequestedAt: new Date().toISOString() }
        : user,
    ),
  );
}
