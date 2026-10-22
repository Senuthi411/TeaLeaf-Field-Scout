export const currentUser = {
  id: "usr_maya_01",
  name: "Maya Dissanayake",
  initials: "MD",
  role: "Reporting user",
  department: "Field Agronomy & Scouting Operations",
  avatarBg: "#cbf5dc",
  avatarText: "#0d3922",
  email: "maya.dissanayake@tealeaf-scout.internal",
  assignedEstates: [
    "Highland Nuwara Eliya Estate (Division A & B)",
    "Dimbula Valley Estate"
  ]
};


export const demoRoles = [
  { id: "reporting", label: "Reporting user", name: "Maya Dissanayake", initials: "MD" },
  { id: "lead_scout", label: "Lead Field Scout", name: "Kamal Perera", initials: "KP" },
  { id: "agronomist", label: "Senior Agronomist", name: "Dr. Anura Fernando", initials: "AF" },
  { id: "estate_mgr", label: "Estate General Manager", name: "Sunil Rathnayake", initials: "SR" }
];


export const snapshotMetadata = {
  lastUpdated: "21 Oct 2026 · 10:00 (UTC+05:30)",
  snapshotLabel: "demo snapshot",
  environment: "Demo data",
  disclaimer: "Demonstration data · UI design only",
  alertMessage: "Figures reflect the latest analytics snapshot and can lag behind live review activity. Last refreshed 21 Oct 2026 · 10:00."
};

export const dashboardKpis = [
  {
    id: "total_observations",
    label: "Total observations",
    value: "33",
    subtext: "Your estates · 2",
    iconType: "leaf",
    iconBgColor: "bg-emerald-100/90",
    iconColor: "text-emerald-700"
  },
  {
    id: "verified",
    label: "Verified",
    value: "5",
    subtext: "15% of observations",
    iconType: "check",
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    id: "awaiting_review",
    label: "Awaiting review",
    value: "14",
    subtext: "Submitted 8 · In review 6",
    iconType: "clock",
    iconBgColor: "bg-amber-100",
    iconColor: "text-amber-700"
  },
  {
    id: "confirmed_diagnoses",
    label: "Confirmed diagnoses",
    value: "3",
    subtext: "From 6 expert referrals",
    iconType: "flask",
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-700"
  }
];


export const observationStatsKpis = [
  {
    id: "total_observations",
    label: "Total observations",
    value: "33",
    subtext: "Captured 01 Oct – 19 Oct",
    iconType: "leaf",
    iconBgColor: "bg-emerald-100/90",
    iconColor: "text-emerald-700"
  },
  {
    id: "reviewed",
    label: "Reviewed",
    value: "19",
    subtext: "58% have a review decision",
    iconType: "check",
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    id: "open_items",
    label: "Open items",
    value: "14",
    subtext: "42% still submitted or in review",
    iconType: "clock",
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-700"
  },
  {
    id: "flag_rate",
    label: "Flag rate",
    value: "18%",
    subtext: "6 of 33 flagged",
    iconType: "flag",
    iconBgColor: "bg-red-100",
    iconColor: "text-red-600"
  }
];


export const weeklyObservationTrends = [
  { week: "28 Sep", count: 11, label: "Week of Sep 28", percentageOfTotal: "33.3%" },
  { week: "05 Oct", count: 12, label: "Week of Oct 05", percentageOfTotal: "36.4%" },
  { week: "12 Oct", count: 9, label: "Week of Oct 12", percentageOfTotal: "27.3%" },
  { week: "19 Oct", count: 1, label: "Week of Oct 19", percentageOfTotal: "3.0%" }
];

/**
 * DUMMY DATA: Observations by Review Status (Mockup: 3840x2160.png)
 * Displays the 6 review pipeline categories, their exact counts and colors:
 * - Submitted: 8 (Royal Blue #1d4ed8)
 * - In review: 6 (Deep Indigo #3730a3)
 * - Verified: 5 (Vibrant Green #15803d)
 * - Flagged: 6 (Crimson Red #dc2626)
 * - Correction requested: 2 (Amber / Orange #d97706)
 * - Referred: 6 (Olive / Moss Green #65a30d)
 * 
 * Total sum: 8 + 6 + 5 + 6 + 2 + 6 = 33 observations.
 * Max reference scale for bar width: 33 (or relative proportional length).
 */
export const reviewStatusBreakdown = [
  {
    id: "submitted",
    status: "Submitted",
    count: 8,
    color: "#1d4ed8",
    colorClass: "bg-blue-600",
    description: "New field observation submitted by scout, awaiting initial review triage"
  },
  {
    id: "in_review",
    status: "In review",
    count: 6,
    color: "#3730a3",
    colorClass: "bg-indigo-700",
    description: "Under active investigation by division agronomist"
  },
  {
    id: "verified",
    status: "Verified",
    count: 5,
    color: "#15803d",
    colorClass: "bg-green-600",
    description: "Observation confirmed and verified against botanical standards"
  },
  {
    id: "flagged",
    status: "Flagged",
    count: 6,
    color: "#dc2626",
    colorClass: "bg-red-600",
    description: "Discrepancy detected or image quality requires secondary scrutiny"
  },
  {
    id: "correction_requested",
    status: "Correction requested",
    count: 2,
    color: "#d97706",
    colorClass: "bg-amber-600",
    description: "Scout has been requested to submit re-scouted leaf photos or GPS pin"
  },
  {
    id: "referred",
    status: "Referred",
    count: 6,
    color: "#65a30d",
    colorClass: "bg-lime-600",
    description: "Escalated to Tea Research Institute (TRI) or senior botanical experts"
  }
];

/**
 * DUMMY DATA: Suspected Disease Distribution (Mockup: 3840x21602.png)
 * Used by the Donut Chart and legend on the Analytics Dashboard.
 * 
 * Breakdown:
 * - Blister blight: 8 observations (24%) - Color: Forest / Emerald Green
 * - Grey blight: 9 observations (27%) - Color: Royal Blue
 * - Brown blight: 8 observations (24%) - Color: Warm Brown / Amber
 * - Algal leaf spot: 8 observations (24%) - Color: Purple / Violet
 * 
 * Total: 8 + 9 + 8 + 8 = 33 observations.
 */
export const suspectedDiseaseDistribution = [
  {
    id: "blister_blight",
    name: "Blister blight",
    count: 8,
    percentage: 24,
    color: "#16a34a", // Vibrant Green
    colorClass: "bg-emerald-600",
    scientificName: "Exobasidium vexans",
    severity: "High",
    description: "Affects young succulent tea leaves, forming translucent blistering spots."
  },
  {
    id: "grey_blight",
    name: "Grey blight",
    count: 9,
    percentage: 27,
    color: "#2563eb", // Royal Blue
    colorClass: "bg-blue-600",
    scientificName: "Pestalotiopsis theae",
    severity: "Moderate",
    description: "Fungal pathogen creating concentric grey lesions on mature foliage."
  },
  {
    id: "brown_blight",
    name: "Brown blight",
    count: 8,
    percentage: 24,
    color: "#d97706", // Brown / Amber
    colorClass: "bg-amber-600",
    scientificName: "Colletotrichum camelliae",
    severity: "Moderate",
    description: "Dark brown necrotic patches starting from leaf tips and margins."
  },
  {
    id: "algal_leaf_spot",
    name: "Algal leaf spot",
    count: 8,
    percentage: 24,
    color: "#7c3aed", // Purple
    colorClass: "bg-purple-600",
    scientificName: "Cephaleuros virescens",
    severity: "Low to Moderate",
    description: "Parasitic green alga producing rust-colored velvety patches on older leaves."
  }
];

/**
 * DUMMY DATA: Left Navigation Sidebar Items
 * Corresponds to all items in the UI sidebar:
 * - "Analytics Dashboard" (Image 2)
 * - "Observation Statistics" (Image 1)
 * Plus the other analytical modules in the application suite.
 */
export const navigationItems = [
  { id: "analytics-dashboard", label: "Analytics Dashboard", icon: "Home", path: "/dashboard" },
  { id: "estate-overview", label: "Estate Overview", icon: "BookOpen", path: "/estate-overview" },
  { id: "division-overview", label: "Division Overview", icon: "BarChart3", path: "/division-overview" },
  { id: "observation-statistics", label: "Observation Statistics", icon: "BarChart2", path: "/observation-stats" },
  { id: "disease-distribution", label: "Disease Distribution", icon: "PieChart", path: "/disease-distribution" },
  { id: "suspected-vs-confirmed", label: "Suspected vs Confirmed", icon: "TrendingUp", path: "/suspected-vs-confirmed" },
  { id: "review-bottlenecks", label: "Review Bottlenecks", icon: "Clock", path: "/review-bottlenecks" },
  { id: "reporting-filters", label: "Reporting Filters", icon: "Filter", path: "/reporting-filters" },
  { id: "data-freshness", label: "Data Freshness", icon: "RefreshCw", path: "/data-freshness" }
];

/**
 * DUMMY DATA: Simulated Notifications List
 * For the top right notification bell popup.
 */
export const mockNotifications = [
  {
    id: "notif_01",
    title: "New observation submitted",
    message: "Scout Kamal added sample #OBS-2026-1042 from Division A Block 4.",
    time: "12 mins ago",
    read: false
  },
  {
    id: "notif_02",
    title: "Review completed",
    message: "Dr. Fernando marked 5 samples as Verified (Blister blight).",
    time: "1 hour ago",
    read: false
  },
  {
    id: "notif_03",
    title: "Weekly report ready",
    message: "Aggregated tea scout report for 12 Oct – 19 Oct has been compiled.",
    time: "Yesterday",
    read: true
  }
];

/**
 * DUMMY DATA: Filter Options
 * Used when the user opens the "Filters" modal dialog.
 */
export const filterOptions = {
  estates: [
    { id: "all", label: "All Estates (2 selected)" },
    { id: "highland", label: "Highland Nuwara Eliya Estate" },
    { id: "dimbula", label: "Dimbula Valley Estate" }
  ],
  divisions: [
    { id: "all", label: "All Divisions" },
    { id: "div_a", label: "Division A - Upper Slopes" },
    { id: "div_b", label: "Division B - River Bed Section" },
    { id: "div_c", label: "Division C - Ridge Block" }
  ],
  dateRanges: [
    { id: "oct_snapshot", label: "01 Oct 2026 – 21 Oct 2026 (Demo Snapshot)" },
    { id: "last_7_days", label: "Last 7 Days" },
    { id: "last_30_days", label: "Last 30 Days" },
    { id: "custom", label: "Custom Date Range..." }
  ],
  reviewStatuses: [
    "Submitted",
    "In review",
    "Verified",
    "Flagged",
    "Correction requested",
    "Referred"
  ]
};
