import React from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import WeeklyObservationChart from '../components/WeeklyObservationChart';
import ReviewStatusBarChart from '../components/ReviewStatusBarChart';
import { observationStatsKpis } from '../data/mockData';

export default function ObservationStatsPage({ onOpenFilters, onOpenExport, onNavigateToObservationStats }) {
  return (
    <div className="flex-1 flex flex-col p-6 lg:p-8 max-w-[1920px] mx-auto w-full">
      {/* Page Header (Title, Subtitle, Filters, Export) */}
      <PageHeader
        title="Observation Statistics"
        onOpenFilters={onOpenFilters}
        onOpenExport={onOpenExport}
      />

      {/* Top 4 KPI Cards Grid (Matches 3840x2160.png) */}
      {/* 
        DUMMY DATA:
        1. Total observations: 33 (Captured 01 Oct - 19 Oct)
        2. Reviewed: 19 (58% have a review decision)
        3. Open items: 14 (42% still submitted or in review)
        4. Flag rate: 18% (6 of 33 flagged)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
        {observationStatsKpis.map((kpi) => (
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

      {/* Main Two-Column Analytics Section (Matches 3840x2160.png) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left Card: Vertical Bar Chart (Weekly Observations: 11, 12, 9, 1) */}
        <div className="min-h-[420px]">
          <WeeklyObservationChart chartType="bar" />
        </div>

        {/* Right Card: Observations by Review Status (Submitted, In review, Verified, Flagged, Correction requested, Referred) */}
        <div className="min-h-[420px]">
          <ReviewStatusBarChart />
        </div>
      </div>
    </div>
  );
}
