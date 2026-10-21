# TeaLeaf Field Scout OS — Agronomist Review Queue

**Screen 6.1: Agronomist Pathological Triage Command & Expert Review Queue**

A high-performance agronomic triage dashboard built for plantation agronomists and plant pathologists to diagnose foliar diseases, monitor field scout submissions, evaluate SLA compliance, and dispatch targeted fungicide prescriptions across highland tea estates.

---

## 🌿 Overview

This frontend module implements the **Level-3 Pathological Triage Command** conforming to the **Tea Research Institute (TRI) Protocol v4.2**. It allows Senior Agronomists to review micrographic leaf specimen samples collected by handheld scout devices across estate divisions, verify AI neural vision diagnoses, and coordinate emergency quarantine advisories.

---

## 🛠️ Tech Stack

- **Framework**: React.js (React 19)
- **Language**: JavaScript (ES6+ / JSX)
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Design Specifications**: Figma (Screen 6.1 - Expert Review Queue)

---

## ✨ Key Features

1. **Agronomist Pathological Triage Command**:
   - Real-time KPI summaries: *Awaiting Diagnosis*, *Critical Escalations*, *High-Priority SLA*, and *Verified Today*.
   - Live Estate LoRaWAN Mesh network telemetry status.
   - Synchronized with 24 field scouts and estate repeaters.

2. **Specimen Review & Micrography**:
   - High-fidelity foliar specimen visualizer with AI bounding box targeting rings and confidence ratings.
   - Clinical specimen metadata including specimen IDs (`#DBB-8842`), tissue type, scout ID, and waiting intervals.
   - Deep-dive diagnosis modal for microscopic verification, agronomist notes, and TRI chemical prescription dispatch.

3. **Field Pathology SLA Compliance**:
   - Real-time median response windows and escalation threshold telemetry.
   - One-click CSV telemetry export.

4. **TRI Reference Strain Index**:
   - Searchable reference index of authorized chemical treatments (Copper Oxychloride, Carbendazim, Wettable Sulphur) and dosage rates.

5. **Multi-View & Batch Operations**:
   - Responsive Grid View and Tabular View toggles.
   - Multi-criteria filtering by pathogen type, priority level, division, and waiting duration.
   - Batch validation of AI-confirmed diagnoses (`>90%`) with confirmation modals.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone or download the repository:
   ```bash
   git clone https://github.com/Senuthi411/TeaLeaf-Field-Scout.git
   cd tealeaf-scout-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:5173/
   ```

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── Header.jsx             # Top bar, location dropdown & mesh status
│   ├── Sidebar.jsx            # Module navigation & sensor hub widget
│   ├── CommandHeader.jsx      # Protocol banner & advisory triggers
│   ├── KPICards.jsx           # 4 pathology metrics cards
│   ├── FilterBar.jsx          # Triage filters & batch validation controls
│   ├── SpecimenCard.jsx       # Foliar specimen card with micrographic overlay
│   ├── SpecimenTable.jsx      # Alternative tabular triage view
│   ├── LeafGraphic.jsx        # SVG leaf disease micrographic renderer
│   ├── BottomCards.jsx        # SLA compliance & TRI reference strain cards
│   ├── DiagnosisModal.jsx     # High-resolution clinical review & Rx modal
│   ├── ConfirmModal.jsx       # Batch approval confirmation dialog
│   ├── AdvisoryModal.jsx      # Emergency quarantine broadcast modal
│   ├── DiagnosticKeyModal.jsx # TRI diagnostic key reference guide
│   └── OtherPageView.jsx      # Module router & placeholder views
├── data/
│   └── mockData.js            # Pathological specimen dataset & TRI protocols
├── App.jsx                    # Root triage dashboard state & logic
├── main.jsx                   # React entry point
└── index.css                  # Global styles & typography
```

---

## 📜 License
Developed for the TeaLeaf Field Scout OS Project.
