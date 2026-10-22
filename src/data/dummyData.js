/**
 * ==============================================================================
 * DUMMY DATA FOR TEALEAF FIELD SCOUT
 * ==============================================================================
 * 
 * This file contains mock data modeled directly from the UI design specifications
 * for the Riverbend Tea Estate (EST-002) Supervisor Portal.
 * 
 * Datasets included:
 *  1. CURRENT_USER: Information for currently logged in supervisor (Malini Fernando)
 *  2. OBSERVATIONS_DATA: The 15 master field observation records with disease classifications,
 *     field workers, capture dates, divisions, and status lifecycles.
 *  3. DASHBOARD_STAT_BOXES: The 5 metric cards displayed at the top of the Supervisor Dashboard,
 *     linked directly to the corresponding filter tabs on the Review Queue page.
 *  4. REVIEW_STATUS_DISTRIBUTION: Breakdown counts for the distribution chart.
 *  5. NEEDS_ATTENTION_ITEMS: Actionable queue alerts requiring supervisor intervention.
 *  6. PENDING_BY_DIVISION: Unresolved case workloads grouped by estate agricultural divisions.
 *  7. FILTER_OPTIONS: Dropdown options for divisions, diseases, and capture timeframe filters.
 * ==============================================================================
 */

// Current supervisor user profile
export const CURRENT_USER = {
  name: "Malini Fernando",
  role: "Supervisor",
  initials: "MF",
  estateId: "EST-002",
  estateName: "Riverbend Tea Estate",
  lastActiveDate: "Wed 21 Oct 2026",
};

/**
 * ------------------------------------------------------------------------------
 * Master Observation Records (15 Dummy Observations)
 * ------------------------------------------------------------------------------
 * Matches every item displayed in the Observation Review Queue table and
 * the oldest awaiting review table on the dashboard.
 * 
 * Status types:
 *  - "Submitted" (awaiting supervisor review)
 *  - "In review" (currently being evaluated)
 *  - "Flagged" (anomaly detected or quality issues)
 *  - "Correction requested" (returned to field worker for re-capture or additional info)
 *  - "Referred" (escalated to senior tea pathologist / agronomist)
 *  - "Verified" (confirmed and recorded into tea estate agronomy logs)
 */
export const OBSERVATIONS_DATA = [
  {
    id: "OBS-004",
    division: "Riverbank",
    divisionCode: "DIV-004",
    suspectedDisease: "Algal leaf spot",
    capturedDate: "05 Oct 2026",
    capturedDateIso: "2026-10-05",
    ageDays: 16,
    fieldWorker: {
      name: "Hiruni Nadeesha",
      initials: "HN",
    },
    status: "Flagged",
    statusKey: "flagged",
    confidence: "74%",
    gpsLocation: "6.8721° N, 80.6124° E",
    plot: "Block B-12",
    leafStage: "Mature flush",
    notes: "Unusual reddish-brown velvety spots on mature foliage, possible secondary fungal infection.",
    severity: "Moderate"
  },
  {
    id: "OBS-005",
    division: "East Hills",
    divisionCode: "DIV-005",
    suspectedDisease: "Blister blight",
    capturedDate: "06 Oct 2026",
    capturedDateIso: "2026-10-06",
    ageDays: 15,
    fieldWorker: {
      name: "Hiruni Nadeesha",
      initials: "HN",
    },
    status: "Correction requested",
    statusKey: "correction-requested",
    correctionId: "COR-005",
    correctionNote: "COR-005 resubmitted · OBS-005 · decide approve or reject",
    confidence: "82%",
    gpsLocation: "6.8794° N, 80.6210° E",
    plot: "East Ridge Plot 4",
    leafStage: "Tender flush",
    notes: "Translucent spots visible on young leaves. Requested clearer underside macro photo.",
    severity: "High"
  },
  {
    id: "OBS-006",
    division: "West Terrace",
    divisionCode: "DIV-006",
    suspectedDisease: "Grey blight",
    capturedDate: "07 Oct 2026",
    capturedDateIso: "2026-10-07",
    ageDays: 14,
    fieldWorker: {
      name: "Ravindu Kumara",
      initials: "RK",
    },
    status: "Referred",
    statusKey: "referred",
    referralId: "REF-006",
    confidence: "91%",
    gpsLocation: "6.8655° N, 80.6011° E",
    plot: "Lower Terrace C",
    leafStage: "Old foliage",
    notes: "Concentric rings with black dots (Pestalotiopsis theae). Referred to Pathologist Dr. Jayasuriya.",
    severity: "Critical"
  },
  {
    id: "OBS-013",
    division: "Riverbank",
    divisionCode: "DIV-004",
    suspectedDisease: "Blister blight",
    capturedDate: "14 Oct 2026",
    capturedDateIso: "2026-10-14",
    ageDays: 7,
    fieldWorker: {
      name: "Hiruni Nadeesha",
      initials: "HN",
    },
    status: "Submitted",
    statusKey: "submitted",
    confidence: "88%",
    gpsLocation: "6.8710° N, 80.6145° E",
    plot: "Riverbed Sector 3",
    leafStage: "Young shoot",
    notes: "Circular blisters indented on upper leaf surface, white velvety spores on lower surface.",
    severity: "High"
  },
  {
    id: "OBS-014",
    division: "East Hills",
    divisionCode: "DIV-005",
    suspectedDisease: "Grey blight",
    capturedDate: "15 Oct 2026",
    capturedDateIso: "2026-10-15",
    ageDays: 6,
    fieldWorker: {
      name: "Hiruni Nadeesha",
      initials: "HN",
    },
    status: "In review",
    statusKey: "in-review",
    confidence: "85%",
    gpsLocation: "6.8780° N, 80.6190° E",
    plot: "East Ridge Plot 2",
    leafStage: "Mature leaf",
    notes: "Supervisor Malini currently cross-referencing weather records with spore germination window.",
    severity: "Moderate"
  },
  {
    id: "OBS-015",
    division: "West Terrace",
    divisionCode: "DIV-006",
    suspectedDisease: "Brown blight",
    capturedDate: "16 Oct 2026",
    capturedDateIso: "2026-10-16",
    ageDays: 5,
    fieldWorker: {
      name: "Ravindu Kumara",
      initials: "RK",
    },
    status: "Verified",
    statusKey: "verified",
    confidence: "96%",
    gpsLocation: "6.8640° N, 80.6030° E",
    plot: "West Slope 1",
    leafStage: "Plucking table",
    notes: "Verified by supervisor. Colletotrichum camelliae symptoms conform to regional treatment protocol #4.",
    severity: "Low"
  },
  {
    id: "OBS-022",
    division: "Riverbank",
    divisionCode: "DIV-004",
    suspectedDisease: "Grey blight",
    capturedDate: "04 Oct 2026",
    capturedDateIso: "2026-10-04",
    ageDays: 17,
    fieldWorker: {
      name: "Hiruni Nadeesha",
      initials: "HN",
    },
    status: "Submitted",
    statusKey: "submitted",
    confidence: "79%",
    gpsLocation: "6.8735° N, 80.6110° E",
    plot: "Riverbank Sector 1",
    leafStage: "Middle canopy",
    notes: "Oldest pending observation in scope. Needs expedited review.",
    severity: "High"
  },
  {
    id: "OBS-023",
    division: "East Hills",
    divisionCode: "DIV-005",
    suspectedDisease: "Brown blight",
    capturedDate: "05 Oct 2026",
    capturedDateIso: "2026-10-05",
    ageDays: 16,
    fieldWorker: {
      name: "Hiruni Nadeesha",
      initials: "HN",
    },
    status: "Referred",
    statusKey: "referred",
    referralId: "REF-023",
    confidence: "90%",
    gpsLocation: "6.8810° N, 80.6235° E",
    plot: "Upper Valley 5",
    leafStage: "Tip shoots",
    notes: "Referred to Estate Agronomist for fungicide formulation guidance.",
    severity: "Moderate"
  },
  {
    id: "OBS-024",
    division: "West Terrace",
    divisionCode: "DIV-006",
    suspectedDisease: "Algal leaf spot",
    capturedDate: "06 Oct 2026",
    capturedDateIso: "2026-10-06",
    ageDays: 15,
    fieldWorker: {
      name: "Ravindu Kumara",
      initials: "RK",
    },
    status: "Flagged",
    statusKey: "flagged",
    confidence: "68%",
    gpsLocation: "6.8670° N, 80.6050° E",
    plot: "West Terrace · follow-up needed",
    leafStage: "Old stems & leaves",
    notes: "Follow-up needed: Ambiguous lighting during capture, suspected Cephaleuros virescens.",
    severity: "High"
  },
  {
    id: "OBS-031",
    division: "Riverbank",
    divisionCode: "DIV-004",
    suspectedDisease: "Brown blight",
    capturedDate: "13 Oct 2026",
    capturedDateIso: "2026-10-13",
    ageDays: 8,
    fieldWorker: {
      name: "Hiruni Nadeesha",
      initials: "HN",
    },
    status: "Submitted",
    statusKey: "submitted",
    confidence: "84%",
    gpsLocation: "6.8725° N, 80.6130° E",
    plot: "Riverbank Sector 4",
    leafStage: "Maintenance foliage",
    notes: "Oval brown patches coalescing into marginal necrosis.",
    severity: "Moderate"
  },
  {
    id: "OBS-032",
    division: "East Hills",
    divisionCode: "DIV-005",
    suspectedDisease: "Algal leaf spot",
    capturedDate: "14 Oct 2026",
    capturedDateIso: "2026-10-14",
    ageDays: 7,
    fieldWorker: {
      name: "Hiruni Nadeesha",
      initials: "HN",
    },
    status: "Verified",
    statusKey: "verified",
    confidence: "94%",
    gpsLocation: "6.8790° N, 80.6200° E",
    plot: "East Ridge Plot 3",
    leafStage: "Mature foliage",
    notes: "Verified: Characteristic green-orange velvety discs. Recommended copper spray application.",
    severity: "Low"
  },
  {
    id: "OBS-033",
    division: "West Terrace",
    divisionCode: "DIV-006",
    suspectedDisease: "Blister blight",
    capturedDate: "15 Oct 2026",
    capturedDateIso: "2026-10-15",
    ageDays: 6,
    fieldWorker: {
      name: "Ravindu Kumara",
      initials: "RK",
    },
    status: "In review",
    statusKey: "in-review",
    confidence: "87%",
    gpsLocation: "6.8660° N, 80.6025° E",
    plot: "Lower Terrace B",
    leafStage: "First leaf",
    notes: "Active assessment of blister severity across adjacent bushes in West Terrace.",
    severity: "High"
  },
  {
    id: "OBS-040",
    division: "Riverbank",
    divisionCode: "DIV-004",
    suspectedDisease: "Algal leaf spot",
    capturedDate: "03 Oct 2026",
    capturedDateIso: "2026-10-03",
    ageDays: 18,
    fieldWorker: {
      name: "Hiruni Nadeesha",
      initials: "HN",
    },
    status: "Flagged",
    statusKey: "flagged",
    confidence: "71%",
    gpsLocation: "6.8740° N, 80.6115° E",
    plot: "Riverbank Sector 2",
    leafStage: "Lower leaf",
    notes: "Low contrast photo, edge boundary blurred by motion artifact during scan.",
    severity: "Moderate"
  },
  {
    id: "OBS-041",
    division: "East Hills",
    divisionCode: "DIV-005",
    suspectedDisease: "Blister blight",
    capturedDate: "04 Oct 2026",
    capturedDateIso: "2026-10-04",
    ageDays: 17,
    fieldWorker: {
      name: "Hiruni Nadeesha",
      initials: "HN",
    },
    status: "Correction requested",
    statusKey: "correction-requested",
    correctionId: "COR-041",
    correctionNote: "OBS-041 · requested 4 Oct · awaiting field worker re-submission",
    confidence: "80%",
    gpsLocation: "6.8805° N, 80.6220° E",
    plot: "East Ridge Plot 1",
    leafStage: "Tender shoot",
    notes: "Requested second angle capture showing petiole attachment.",
    severity: "High"
  },
  {
    id: "OBS-042",
    division: "West Terrace",
    divisionCode: "DIV-006",
    suspectedDisease: "Grey blight",
    capturedDate: "05 Oct 2026",
    capturedDateIso: "2026-10-05",
    ageDays: 16,
    fieldWorker: {
      name: "Ravindu Kumara",
      initials: "RK",
    },
    status: "Referred",
    statusKey: "referred",
    referralId: "REF-042",
    confidence: "89%",
    gpsLocation: "6.8648° N, 80.6040° E",
    plot: "Upper Terrace A",
    leafStage: "Old foliage",
    notes: "Third sample in West Terrace cluster sent for lab culture verification.",
    severity: "Critical"
  }
];

/**
 * ------------------------------------------------------------------------------
 * Supervisor Dashboard 5 Metric Cards
 * ------------------------------------------------------------------------------
 * LINKING REQUIREMENT:
 * In the supervisor dashboard page, the upper half has 5 boxes.
 * Each box is linked to the Review Queue page selections on the upper half:
 *  1. "Awaiting review" (3)       --> Filters Review Queue tab to "Submitted"
 *  2. "In review" (2)             --> Filters Review Queue tab to "In review"
 *  3. "Open corrections" (2)      --> Filters Review Queue tab to "Correction requested"
 *  4. "Active referrals" (3)      --> Filters Review Queue tab to "Referred"
 *  5. "Verified" (2)              --> Filters Review Queue tab to "Verified"
 */
export const DASHBOARD_STAT_BOXES = [
  {
    id: "box-awaiting-review",
    title: "Awaiting review",
    count: 3,
    subtext: "Submitted · oldest 4 Oct",
    targetFilterTab: "Submitted", // Tab name in Review Queue
    iconType: "inbox",
    accentColor: "blue",
    iconBg: "bg-sky-50 text-sky-600",
  },
  {
    id: "box-in-review",
    title: "In review",
    count: 2,
    subtext: "OBS-014, OBS-033",
    targetFilterTab: "In review", // Tab name in Review Queue
    iconType: "eye",
    accentColor: "purple",
    iconBg: "bg-purple-50 text-purple-600",
  },
  {
    id: "box-open-corrections",
    title: "Open corrections",
    count: 2,
    subtext: "COR-005, COR-041",
    targetFilterTab: "Correction requested", // Tab name in Review Queue
    iconType: "edit",
    accentColor: "amber",
    iconBg: "bg-amber-50 text-amber-600",
  },
  {
    id: "box-active-referrals",
    title: "Active referrals",
    count: 3,
    subtext: "REF-006, REF-023, REF-042",
    targetFilterTab: "Referred", // Tab name in Review Queue
    iconType: "send",
    accentColor: "green",
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "box-verified",
    title: "Verified",
    count: 2,
    subtext: "OBS-015, OBS-032",
    targetFilterTab: "Verified", // Tab name in Review Queue
    iconType: "check",
    accentColor: "emerald",
    iconBg: "bg-green-50 text-green-600",
  }
];

/**
 * ------------------------------------------------------------------------------
 * Review Queue Filter Tabs Configuration
 * ------------------------------------------------------------------------------
 * Displays tab options at the top of the Review Queue page:
 * All (15), Submitted (3), In review (2), Flagged (3),
 * Correction requested (2), Referred (3), Verified (2)
 */
export const REVIEW_QUEUE_TABS = [
  { label: "All", count: 15, filterValue: "All" },
  { label: "Submitted", count: 3, filterValue: "Submitted" },
  { label: "In review", count: 2, filterValue: "In review" },
  { label: "Flagged", count: 3, filterValue: "Flagged" },
  { label: "Correction requested", count: 2, filterValue: "Correction requested" },
  { label: "Referred", count: 3, filterValue: "Referred" },
  { label: "Verified", count: 2, filterValue: "Verified" },
];

/**
 * ------------------------------------------------------------------------------
 * Review Status Distribution (Dashboard Middle-Left Card)
 * ------------------------------------------------------------------------------
 * Visual breakdown of all 15 cases across their statuses.
 */
export const REVIEW_STATUS_DISTRIBUTION = [
  {
    status: "Submitted",
    count: 3,
    total: 15,
    barColor: "bg-blue-600",
    filterTab: "Submitted",
  },
  {
    status: "In review",
    count: 2,
    total: 15,
    barColor: "bg-purple-600",
    filterTab: "In review",
  },
  {
    status: "Verified",
    count: 2,
    total: 15,
    barColor: "bg-emerald-800",
    filterTab: "Verified",
  },
  {
    status: "Flagged",
    count: 3,
    total: 15,
    barColor: "bg-rose-500",
    filterTab: "Flagged",
  },
  {
    status: "Correction requested",
    count: 2,
    total: 15,
    barColor: "bg-amber-500",
    filterTab: "Correction requested",
  },
  {
    status: "Referred",
    count: 3,
    total: 15,
    barColor: "bg-lime-600",
    filterTab: "Referred",
  },
];

/**
 * ------------------------------------------------------------------------------
 * Needs Your Attention Items (Dashboard Middle Card)
 * ------------------------------------------------------------------------------
 * Actionable tasks and urgent queue notifications for the supervisor.
 */
export const NEEDS_ATTENTION_ITEMS = [
  {
    id: "att-1",
    title: "COR-005 resubmitted",
    subtitle: "OBS-005 · decide approve or reject",
    observationId: "OBS-005",
    type: "correction",
    filterTab: "Correction requested"
  },
  {
    id: "att-2",
    title: "COR-041 awaiting field worker",
    subtitle: "OBS-041 · requested 4 Oct",
    observationId: "OBS-041",
    type: "correction",
    filterTab: "Correction requested"
  },
  {
    id: "att-3",
    title: "OBS-024 flagged",
    subtitle: "West Terrace · follow-up needed",
    observationId: "OBS-024",
    type: "flagged",
    filterTab: "Flagged"
  },
  {
    id: "att-4",
    title: "QUA-002 released, pending ingest",
    subtitle: "Riverbank · waiting for ingest receipt",
    observationId: "QUA-002",
    type: "quarantine",
    filterTab: "All"
  },
];

/**
 * ------------------------------------------------------------------------------
 * Pending by Division (Dashboard Middle-Right Card)
 * ------------------------------------------------------------------------------
 * Summarizes pending cases (Submitted + In review) by estate geographic sector.
 * Pending = submitted (3) or in review (2) = 5 total pending cases across estate.
 */
export const PENDING_BY_DIVISION = [
  {
    name: "Riverbank (DIV-004)",
    code: "DIV-004",
    count: 3,
    barColor: "bg-emerald-800",
    percentageWidth: "100%", // 3 out of max 3
  },
  {
    name: "East Hills (DIV-005)",
    code: "DIV-005",
    count: 1,
    barColor: "bg-lime-500",
    percentageWidth: "33.3%", // 1 out of max 3
  },
  {
    name: "West Terrace (DIV-006)",
    code: "DIV-006",
    count: 1,
    barColor: "bg-emerald-600",
    percentageWidth: "33.3%", // 1 out of max 3
  },
];

/**
 * ------------------------------------------------------------------------------
 * Oldest Awaiting Review (Dashboard Bottom Table)
 * ------------------------------------------------------------------------------
 * Highlights submitted observations with longest wait times.
 */
export const OLDEST_AWAITING_REVIEW = [
  {
    id: "OBS-022",
    division: "Riverbank",
    suspectedDisease: "Grey blight",
    captured: "04 Oct 2026",
    age: "17 days",
    status: "Submitted",
  },
  {
    id: "OBS-031",
    division: "Riverbank",
    suspectedDisease: "Brown blight",
    captured: "13 Oct 2026",
    age: "8 days",
    status: "Submitted",
  },
  {
    id: "OBS-013",
    division: "Riverbank",
    suspectedDisease: "Blister blight",
    captured: "14 Oct 2026",
    age: "7 days",
    status: "Submitted",
  },
];

/**
 * ------------------------------------------------------------------------------
 * Filter Dropdown Options for Review Queue
 * ------------------------------------------------------------------------------
 */
export const FILTER_OPTIONS = {
  divisions: ["All", "Riverbank", "East Hills", "West Terrace"],
  diseases: ["All", "Algal leaf spot", "Blister blight", "Grey blight", "Brown blight"],
  capturedRanges: ["Last 30 days", "Last 7 days", "Last 14 days", "All time"],
};

/**
 * ------------------------------------------------------------------------------
 * Sidebar Navigation Links Configuration
 * ------------------------------------------------------------------------------
 */
export const NAVIGATION_LINKS = [
  { id: "dashboard", label: "Dashboard", icon: "home" },
  { id: "review-queue", label: "Review Queue", icon: "inbox" },
  { id: "correction-queue", label: "Correction Queue", icon: "pencil" },
  { id: "expert-referrals", label: "Expert Referrals", icon: "send" },
  { id: "quarantine-queue", label: "Quarantine Queue", icon: "shieldAlert" },
  { id: "decision-history", label: "Decision History", icon: "history" },
  { id: "evidence-viewer", label: "Evidence Viewer", icon: "image" },
  { id: "fieldwork-assignments", label: "Fieldwork Assignments", icon: "clipboardList" },
];
