import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Building2,
  Grid2X2,
  Network,
  SlidersHorizontal,
  ListChecks,
  Workflow,
  History,
  Settings,
} from "lucide-react";
export const navigationGroups = [
  {
    label: "OPERATIONAL CORE",
    items: [
      ["Dashboard", "dashboard", LayoutDashboard],
      ["Users", "users", Users],
      ["Roles & Permissions", "roles", ShieldCheck],
    ],
  },
  {
    label: "ESTATE & SPATIAL TOPOLOGY",
    items: [
      ["Estates", "estates", Building2],
      ["Divisions & Blocks", "divisions", Grid2X2],
      ["Boundary Mapping", "mapping", Network],
    ],
  },
  {
    label: "ENGINE & GOVERNANCE",
    items: [
      ["Feature Configuration", "features", SlidersHorizontal],
      ["Business Rules", "rules", ListChecks],
      ["Workflow Builder", "workflows", Workflow],
      ["Audit Log", "audit", History],
      ["System Settings", "settings", Settings],
    ],
  },
];
export const navigationItems = navigationGroups.flatMap((group) => group.items);
