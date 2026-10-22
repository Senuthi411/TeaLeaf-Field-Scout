import React from 'react';
import PageHeader from '../components/PageHeader';
import AlertBanner from '../components/AlertBanner';
import StatCard from '../components/StatCard';
import WeeklyObservationChart from '../components/WeeklyObservationChart';
import DiseaseDistributionDonut from '../components/DiseaseDistributionDonut';
import { dashboardKpis } from '../data/mockData';

export default function DashboardPage({ onOpenFilters, onOpenExport, onNavigateToObservationStats }) {
  return (
    <div className="flex-1 flex flex-col p-6 lg:p-8 max-w-[1920px] mx-auto w-full">
      {/* Page Header (Title, Subtitle, Filters, Export) */}
      <PageHeader
        title="Analytics Dashboard"
        onOpenFilters={onOpenFilters}
        onOpenExport={onOpenExport}
      />

      {/* Blue Alert Banner (Matches 3840x21602.png) */}
      {/* 
        DUMMY DATA:
        "Figures reflect the latest analytics snapshot and can lag behind live review activity. Last refreshed 21 Oct 2026 · 10:00."
      */}
      <AlertBanner />

      {/* Top 4 KPI Cards Grid (Matches 3840x21602.png) */}
      {/* 
        DUMMY DATA:
        1. Total observations: 33 (Your estates · 2)
        2. Verified: 5 (15% of observations)
        3. Awaiting review: 14 (Submitted 8 · In review 6)
        4. Confirmed diagnoses: 3 (From 6 expert referrals)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
        {dashboardKpis.map((kpi) => (
          <StatCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            subtext={kpi.subtext}
            iconType={kpi.iconType}
            iconBgColor={kpi.iconBgColor}
            iconColor={kpi.iconColor}
            onClick={onNavigateToObservationStats}
          />
        ))}
      </div>

      {/* Main Two-Column Analytics Section (Matches 3840x21602.png) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left Card: Area / Line Chart with Green Shading */}
        <div className="min-h-[420px]">
          <WeeklyObservationChart chartType="line" />
        </div>

        {/* Right Card: Donut Chart with Suspected Disease Distribution */}
        <div className="min-h-[420px]">
          <DiseaseDistributionDonut />
        </div>
      </div>
    </div>
  );
}
