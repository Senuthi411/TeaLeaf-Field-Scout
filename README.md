# TeaLeaf Field Scout - Analytics Portal

A high-fidelity React application built with Vite and Tailwind CSS reproducing the UI designs located in `C:\Tea - Scout\Ui`.

## Implemented Pages

1. **Observation Statistics (`3840x2160.png`)**
   - Breadcrumb: `Analytics` > `Observation Statistics`
   - 4 KPI Stat Cards:
     - **Total observations**: 33 (Captured 01 Oct – 19 Oct)
     - **Reviewed**: 19 (58% have a review decision)
     - **Open items**: 14 (42% still submitted or in review)
     - **Flag rate**: 18% (6 of 33 flagged)
   - **Weekly Observations Chart**: Forest green vertical bar chart with Y-axis grid (0–15) and X-axis dates (28 Sep, 05 Oct, 12 Oct, 19 Oct).
   - **Observations by Review Status**: Horizontal proportional progress bars for the 6 review statuses:
     - Submitted (8)
     - In review (6)
     - Verified (5)
     - Flagged (6)
     - Correction requested (2)
     - Referred (6)

2. **Analytics Dashboard (`3840x21602.png`)**
   - Breadcrumb: `Analytics` > `Dashboard`
   - Dismissible Information Alert Banner: *"Figures reflect the latest analytics snapshot and can lag behind live review activity. Last refreshed 21 Oct 2026 · 10:00."*
   - 4 KPI Stat Cards:
     - **Total observations**: 33 (Your estates · 2)
     - **Verified**: 5 (15% of observations)
     - **Awaiting review**: 14 (Submitted 8 · In review 6)
     - **Confirmed diagnoses**: 3 (From 6 expert referrals)
   - **Weekly Observations Chart**: Smooth green Area & Line chart with gradient fill and interactive data point markers.
   - **Suspected Disease Distribution**: Interactive Donut chart with center count (`33 observations`), quadrant accent segments, and legend:
     - Blister blight (8 · 24%)
     - Grey blight (9 · 27%)
     - Brown blight (8 · 24%)
     - Algal leaf spot (8 · 24%)

3. **Global Navigation & Shell**
   - Dark forest green sidebar with active item indicators, collapsible edge handle (`<` / `>`), user profile card ("Maya Dissanayake", "Reporting user"), and disclaimer footer.
   - Top Header with Breadcrumbs, "Switch Demo Role" dropdown, search bar, "• Demo data" badge, notification popup, and user settings menu.
   - Interactive "Filters" modal dialog and "Export" dialog.

## Dummy Data & Code Documentation

All dummy datasets are organized in [`src/data/mockData.js`](src/data/mockData.js) with extensive comments detailing:
- Data structure and type definitions
- Mathematical relationships (e.g. status breakdown summing to the 33 total observations)
- Percentage distributions
- Context and field agronomist terminology

## Getting Started

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```
