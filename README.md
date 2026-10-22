# TeaLeaf Field Scout OS — Expert Dashboard

**Frontend Implementation: Expert Dashboard (Screen CASE-01)**

A high-performance agronomic triage dashboard built for plantation plant pathologists and disease experts to evaluate foliar disease cases, review microscopic scouting evidence, and coordinate field disease management across highland tea estates.

---

## 🌿 Overview

This frontend module implements the **Expert Dashboard (Screen CASE-01)** and connected sub-modules matching the updated TeaLeaf Field Scout Figma design system:
- **Primary Screen**: `Expert Dashboard` (`Cases > Expert Dashboard`)
- **Connected Modules**: `Assigned Cases`, `Disease Catalog`, `Case History`
- **Interactive Modals**:
  - `Observation Details` (Evidence Viewer from Screen CAP-W02)
  - `Switch Demo Role` (4-Persona Selector from Screen DEMO-01)
  - `Welcome Back / Sign In` (Screen AUTH-01)

---

## 🛠️ Tech Stack

- **Framework**: React.js (React 19)
- **Language**: JavaScript (ES6+ / JSX)
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Design System**: Figma (TeaLeaf Field Scout OS)

---

## ✨ Features Implemented

1. **Expert Dashboard (Main Screen)**:
   - **4 KPI Metric Cards**:
     - *Awaiting diagnosis*: **3** (`CASE-023, CASE-047, CASE-058`)
     - *Diagnosed*: **2** (`CASE-006, CASE-042`)
     - *Pending case link*: **1** (`REF-002 - OBS-011`)
     - *Avg. time to diagnose*: **1.4 d** (`Demo figure`)
   - **Awaiting Diagnosis Table**:
     - `CASE-023` (East Hills • Brown blight • 05 Oct 2026)
     - `CASE-047` (North Ridge • Blister blight • 12 Oct 2026)
     - `CASE-058` (Upper Mist • Algal leaf spot • 14 Oct 2026)
     - Clickable case rows opening full microscopic evidence.
   - **Field Source Info Banner**:
     - *(i) Suspected disease comes from the field. Your confirmed diagnosis is recorded separately.*
   - **Recent Diagnoses**:
     - `DIAG-042 • Grey blight` (CASE-042 • 05 Oct 2026)
     - `DIAG-006 • Grey blight` (CASE-006 • 07 Oct 2026)
   - **Catalog Quick Reference**:
     - `Blister blight • DIS-001`, `Grey blight • DIS-002`, `Brown blight • DIS-003`, `Algal leaf spot • DIS-004`.

2. **Assigned Cases Module (Screen CASE-02)**:
   - Filter tabs: *All 5*, *Awaiting diagnosis 3*, *Diagnosed 2*.
   - Filter toolbar: Search, Estate dropdown, Disease dropdown, and Date range.
   - Export CSV capability.

3. **Observation Evidence Viewer Modal (Screen CAP-W02)**:
   - High-resolution foliar disease micrographic visualizer.
   - Observation metadata: ID `035-005`, Device ID `DEV-OBS-0065`, Estate `Riverbend`, Scout `Hiranji Hadeesha`.
   - Linked records (`REV-008`, `COR-005`, `OBS-035-2`).
   - One-click diagnosis confirmation.

4. **Demo Persona Switcher (Screen DEMO-01)**:
   - Interactive modal supporting *Administrator*, *Supervisor*, *Disease Expert*, and *Reporting User*.

---

## 🚀 Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.
