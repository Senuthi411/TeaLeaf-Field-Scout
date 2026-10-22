import React from 'react';
import {
  Inbox,
  Eye,
  PenSquare,
  Send,
  CheckCircle2,
  Check,
  ChevronRight,
  ArrowRight,
  Download,
  Users,
  ExternalLink,
  Layers,
  Clock
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import {
  DASHBOARD_STAT_BOXES,
  REVIEW_STATUS_DISTRIBUTION,
  NEEDS_ATTENTION_ITEMS,
  PENDING_BY_DIVISION,
  OLDEST_AWAITING_REVIEW,
  CURRENT_USER
} from '../data/dummyData';

/**
 * SupervisorDashboard Component
 * 
 * Exact recreation of the Supervisor Dashboard (Dashboard.png).
 * Crucial feature: Upper half 5 metric boxes are linked accordingly
 * to the Review Queue page selections on the upper half of that page!
 */
export default function SupervisorDashboard({
  onNavigateToQueueWithFilter,
  onOpenObservationModal
}) {
  // Helper to render box icon
  const renderBoxIcon = (iconType) => {
    const props = { className: "w-4 h-4" };
    switch (iconType) {
      case 'inbox':
        return <Inbox {...props} />;
      case 'eye':
        return <Eye {...props} />;
      case 'edit':
        return <PenSquare {...props} />;
      case 'send':
        return <Send {...props} />;
      case 'check':
        return <Check {...props} />;
      default:
        return <Inbox {...props} />;
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* ------------------------------------------------------------- */}
      {/* 1. Page Title & Action Bar                                    */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Supervisor Dashboard
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {CURRENT_USER.estateName} ({CURRENT_USER.estateId}) · 15 observations in your scope · {CURRENT_USER.lastActiveDate}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Fieldwork Assignments button */}
          <button
            onClick={() => onNavigateToQueueWithFilter('All', 'fieldwork-assignments')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Fieldwork Assignments</span>
          </button>

          {/* Open review queue primary button */}
          <button
            onClick={() => onNavigateToQueueWithFilter('All')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#185c32] hover:bg-[#124b27] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Open review queue</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. Upper Half - 5 Metric Boxes                                */}
      {/* LINKED ACCORDINGLY TO REVIEW QUEUE TAB SELECTIONS             */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {DASHBOARD_STAT_BOXES.map((box) => (
          <div
            key={box.id}
            onClick={() => onNavigateToQueueWithFilter(box.targetFilterTab)}
            title={`View ${box.targetFilterTab} in Review Queue`}
            className="group bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-emerald-600/60 transition-all duration-150 cursor-pointer flex flex-col justify-between"
          >
            {/* Top row: Title + Icon Badge */}
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-slate-600 group-hover:text-emerald-900 transition-colors">
                {box.title}
              </span>
              <div className={`p-2 rounded-xl ${box.iconBg} transition-transform group-hover:scale-110`}>
                {renderBoxIcon(box.iconType)}
              </div>
            </div>

            {/* Middle: Big Metric Number */}
            <div className="my-2">
              <span className="text-3xl font-bold text-slate-900 tracking-tight">
                {box.count}
              </span>
            </div>

            {/* Bottom: Subtext & Target indicator */}
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate">{box.subtext}</span>
              <span className="opacity-0 group-hover:opacity-100 text-emerald-700 font-semibold transition-opacity flex items-center shrink-0 ml-1">
                Filter ›
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. Middle Row: 3 Information Cards                            */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Card 1: Review Status Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">
              Review status distribution
            </h3>

            <div className="space-y-3">
              {REVIEW_STATUS_DISTRIBUTION.map((item) => {
                const percent = (item.count / 3) * 100; // max individual count is 3
                return (
                  <div
                    key={item.status}
                    onClick={() => onNavigateToQueueWithFilter(item.filterTab)}
                    className="flex items-center gap-3 text-xs group cursor-pointer hover:bg-slate-50/70 p-1 rounded-lg transition-colors"
                    title={`Click to view ${item.status} cases in Review Queue`}
                  >
                    {/* Label */}
                    <span className="w-36 text-slate-600 text-[11px] font-medium group-hover:text-slate-900">
                      {item.status}
                    </span>

                    {/* Progress Track */}
                    <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.barColor} transition-all duration-300`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    {/* Count */}
                    <span className="w-4 text-right text-xs font-semibold text-slate-700 group-hover:text-emerald-800">
                      {item.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card 2: Needs Your Attention */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">
              Needs your attention
            </h3>

            <div className="space-y-2.5">
              {NEEDS_ATTENTION_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.observationId.startsWith('OBS')) {
                      onOpenObservationModal(item.observationId);
                    } else {
                      onNavigateToQueueWithFilter(item.filterTab);
                    }
                  }}
                  className="p-3 rounded-xl border border-slate-200/90 hover:border-emerald-500/80 hover:bg-slate-50/60 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="overflow-hidden pr-2">
                    <p className="text-xs font-semibold text-slate-800 group-hover:text-emerald-900 truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Pending by Division */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">
              Pending by division
            </h3>

            <div className="space-y-3.5">
              {PENDING_BY_DIVISION.map((div) => (
                <div
                  key={div.code}
                  className="flex items-center gap-3 text-xs"
                >
                  {/* Division Name */}
                  <span className="w-36 text-slate-600 text-[11px] font-medium truncate">
                    {div.name}
                  </span>

                  {/* Progress bar */}
                  <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${div.barColor}`}
                      style={{ width: div.percentageWidth }}
                    />
                  </div>

                  {/* Count */}
                  <span className="w-4 text-right text-xs font-semibold text-slate-700">
                    {div.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Explanatory Caption */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-[11px] text-slate-400">
              Pending = submitted or in review.
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. Bottom Table: Oldest Awaiting Review                       */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
        {/* Table Header Section */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">
            Oldest awaiting review
          </h3>
          <button
            onClick={() => onNavigateToQueueWithFilter('Submitted')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View queue</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Observation</th>
                <th className="py-3 px-6">Division</th>
                <th className="py-3 px-6">Suspected Disease</th>
                <th className="py-3 px-6">Captured</th>
                <th className="py-3 px-6">Age</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {OLDEST_AWAITING_REVIEW.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/60 transition-colors group cursor-pointer"
                  onClick={() => onOpenObservationModal(row.id)}
                >
                  {/* Observation ID */}
                  <td className="py-3.5 px-6 font-bold text-emerald-900 group-hover:underline">
                    {row.id}
                  </td>

                  {/* Division */}
                  <td className="py-3.5 px-6 text-slate-700">
                    {row.division}
                  </td>

                  {/* Suspected Disease */}
                  <td className="py-3.5 px-6 text-slate-700">
                    {row.suspectedDisease}
                  </td>

                  {/* Captured Date */}
                  <td className="py-3.5 px-6 text-slate-600">
                    {row.captured}
                  </td>

                  {/* Age */}
                  <td className="py-3.5 px-6 text-slate-600">
                    {row.age}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-6">
                    <StatusBadge status={row.status} />
                  </td>

                  {/* Action Link */}
                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenObservationModal(row.id);
                      }}
                      className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 group-hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Review</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
