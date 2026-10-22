/**
 * ============================================================================
 * DUMMY DATA FOR TEALEAF FIELD SCOUT
 * ============================================================================
 * This file contains all simulated data matching the UI specifications
 * shown in the design mockups (Sign In & Administrator Dashboard).
 * All data items are annotated with descriptive comments explaining their purpose.
 */

// DUMMY DATA: Currently logged-in administrator information
export const CURRENT_USER = {
  name: "Anika Perera",
  role: "Administrator",
  initials: "AP",
  email: "anika.perera@estate.example",
  avatarColor: "bg-emerald-100 text-emerald-800",
};

// DUMMY DATA: Key metric cards shown at top of Administrator Dashboard
export const DASHBOARD_METRICS = [
  {
    id: "active-users",
    label: "Active users",
    value: "13",
    subtext: "All accounts active",
    iconType: "users",
    colorScheme: {
      bg: "bg-[#e8f5e9]",
      text: "text-[#2e7d32]",
    },
  },
  {
    id: "estates",
    label: "Estates",
    value: "3",
    subtext: "Highland · Riverbend · Mist Valley",
    iconType: "map-pin",
    colorScheme: {
      bg: "bg-[#e1f5fe]",
      text: "text-[#0288d1]",
    },
  },
  {
    id: "divisions",
    label: "Divisions",
    value: "9",
    subtext: "Division-level scopes only",
    iconType: "layers",
    colorScheme: {
      bg: "bg-[#ede7f6]",
      text: "text-[#673ab7]",
    },
  },
  {
    id: "active-sessions",
    label: "Active device sessions",
    value: "11",
    subtext: "1 session revoked this week",
    iconType: "smartphone",
    colorScheme: {
      bg: "bg-[#fff3e0]",
      text: "text-[#ef6c00]",
    },
  },
];

// DUMMY DATA: Breakdown of system users categorized by assigned role
// Includes count and relative percentage bar styling matching the mockup
export const USERS_BY_ROLE = [
  {
    role: "Field worker",
    count: 6,
    percentage: 85,
    barColor: "bg-[#236b3b]", // Deep forest green
  },
  {
    role: "Supervisor",
    count: 3,
    percentage: 50,
    barColor: "bg-[#6ca939]", // Vibrant olive / leaf green
  },
  {
    role: "Disease expert",
    count: 2,
    percentage: 35,
    barColor: "bg-[#3c8a6b]", // Muted teal / sage green
  },
  {
    role: "Administrator",
    count: 1,
    percentage: 18,
    barColor: "bg-[#1e5631]", // Dark evergreen
  },
  {
    role: "Reporting user",
    count: 1,
    percentage: 18,
    barColor: "bg-[#7cb342]", // Light lime green
  },
];

// DUMMY DATA: Coverage status for tea estates and their respective divisions
export const ESTATE_COVERAGE = [
  {
    id: "EST-001",
    name: "Highland Tea Estate",
    region: "Nuwara Eliya",
    divisions: 3,
    status: "Active",
  },
  {
    id: "EST-002",
    name: "Riverbend Tea Estate",
    region: "Kandy",
    divisions: 3,
    status: "Active",
  },
  {
    id: "EST-003",
    name: "Mist Valley Tea Estate",
    region: "Badulla",
    divisions: 3,
    status: "Active",
  },
];

// DUMMY DATA: Audit log stream of recent system administrative events
export const RECENT_ACTIVITIES = [
  {
    id: "act-1",
    type: "scope_updated",
    icon: "check",
    title: "Scope updated for Dr Tara Wijesinghe",
    meta: "EST-001, EST-002 · 20 Oct 09:40",
  },
  {
    id: "act-2",
    type: "session_revoked",
    icon: "check",
    title: "Device session revoked",
    meta: "USR-011 · DEVICE_SESSION_REVOKED · 20 Oct 08:15",
  },
  {
    id: "act-3",
    type: "division_reviewed",
    icon: "check",
    title: "Division DIV-009 Forest Edge reviewed",
    meta: "Status active · 19 Oct 16:02",
  },
  {
    id: "act-4",
    type: "user_invited",
    icon: "invite",
    title: "User invited: Maya Dissanayake",
    meta: "Reporting user · 18 Oct 11:30",
  },
];

// DUMMY DATA: List of users needing monitoring, verification, or attention
export const USERS_REQUIRING_ATTENTION = [
  {
    id: "USR-004",
    name: "Ishara Kumari",
    initials: "IK",
    avatarBg: "bg-emerald-100 text-emerald-800",
    role: "Field worker",
    scope: "DIV-001, DIV-002",
    status: "Active",
    statusType: "success",
    lastDeviceSession: "Today · 08:12",
  },
  {
    id: "USR-011",
    name: "Sewmi Raj",
    initials: "SR",
    avatarBg: "bg-emerald-100 text-emerald-800",
    role: "Field worker",
    scope: "DIV-007, DIV-008",
    status: "Session revoked",
    statusType: "warning",
    lastDeviceSession: "20 Oct · 08:15",
  },
  {
    id: "USR-007",
    name: "Dr Sahan Amarasinghe",
    initials: "SA",
    avatarBg: "bg-emerald-100 text-emerald-800",
    role: "Disease expert",
    scope: "EST-003",
    status: "Active",
    statusType: "success",
    lastDeviceSession: "Today · 07:48",
  },
  {
    id: "USR-009",
    name: "Kavishka Jay",
    initials: "KJ",
    avatarBg: "bg-emerald-100 text-emerald-800",
    role: "Supervisor",
    scope: "EST-003",
    status: "Active",
    statusType: "success",
    lastDeviceSession: "Yesterday",
  },
];

// DUMMY DATA: Available roles for the "Switch Demo Role" feature
export const AVAILABLE_ROLES = [
  { id: "admin", name: "Administrator", user: "Anika Perera", access: "Full system administration" },
  { id: "supervisor", name: "Supervisor", user: "Kavishka Jay", access: "Division inspection oversight" },
  { id: "expert", name: "Disease expert", user: "Dr Sahan Amarasinghe", access: "Diagnosis & advisory" },
  { id: "field_worker", name: "Field worker", user: "Ishara Kumari", access: "Mobile scout leaf capture" },
];
