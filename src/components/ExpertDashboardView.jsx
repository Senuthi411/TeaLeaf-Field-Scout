import React, { useState } from 'react';
import {
  Hourglass,
  CheckCircle2,
  Link as LinkIcon,
  Clock,
  ArrowRight,
  Info,
  X,
  BookOpen,
  FolderOpen,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import {
  EXPERT_METRICS,
  AWAITING_CASES,
  RECENT_DIAGNOSES,
  CATALOG_REFERENCES,
} from '../data/expertDashboardData';

export const ExpertDashboardView = ({
  onNavigateToAssignedCases,
  onNavigateToCatalog,
  onSelectCase,
}) => {
  const [showInfoBanner, setShowInfoBanner] = useState(true);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Section matching Image 4 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Expert Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Welcome back, Dr Wijesinghe • Estates in scope: EST-001, EST-002
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigateToAssignedCases}
          className="inline-flex items-center space-x-2 rounded-xl bg-[#0d3826] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#09281a] active:scale-[0.98] transition cursor-pointer self-start sm:self-auto"
        >
          <FolderOpen className="h-4 w-4 text-emerald-300" />
          <span>Open assigned cases</span>
        </button>
      </div>

      {/* 2. 4 Metric KPI Cards matching Image 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Awaiting diagnosis */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs hover:shadow-sm transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              Awaiting diagnosis
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 ring-1 ring-amber-200/60">
              <Hourglass className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900">
              {EXPERT_METRICS.awaiting.count}
            </span>
          </div>
          <div className="mt-1 text-[11px] font-mono text-slate-400 truncate">
            {EXPERT_METRICS.awaiting.cases}
          </div>
        </div>

        {/* Card 2: Diagnosed */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs hover:shadow-sm transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              Diagnosed
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/60">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900">
              {EXPERT_METRICS.diagnosed.count}
            </span>
          </div>
          <div className="mt-1 text-[11px] font-mono text-slate-400 truncate">
            {EXPERT_METRICS.diagnosed.cases}
          </div>
        </div>

        {/* Card 3: Pending case link */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs hover:shadow-sm transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              Pending case link
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-200/60">
              <LinkIcon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900">
              {EXPERT_METRICS.pendingLink.count}
            </span>
          </div>
          <div className="mt-1 text-[11px] font-mono text-slate-400 truncate">
            {EXPERT_METRICS.pendingLink.ref}
          </div>
        </div>

        {/* Card 4: Avg. time to diagnose */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs hover:shadow-sm transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              Avg. time to diagnose
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 ring-1 ring-purple-200/60">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900">
              {EXPERT_METRICS.avgTime.value}
            </span>
          </div>
          <div className="mt-1 text-[11px] font-medium text-slate-400">
            {EXPERT_METRICS.avgTime.subtext}
          </div>
        </div>
      </div>

      {/* 3. Main Grid: Left Awaiting Table + Right Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Wide, 2 cols): Awaiting your diagnosis Table */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs space-y-4">
          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">
              Awaiting your diagnosis
            </h2>
            <button
              type="button"
              onClick={onNavigateToAssignedCases}
              className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer"
            >
              <span>View all</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Table matching Image 4 */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 px-3">Case</th>
                  <th className="py-2.5 px-3">Observation</th>
                  <th className="py-2.5 px-3">Division</th>
                  <th className="py-2.5 px-3">Suspected</th>
                  <th className="py-2.5 px-3">Referred</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {AWAITING_CASES.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => onSelectCase && onSelectCase(item)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-3 font-semibold text-emerald-800 group-hover:underline font-mono">
                      {item.id}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">
                      {item.observationId}
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-medium">
                      {item.division}
                    </td>
                    <td className="py-3 px-3 text-slate-800">
                      {item.suspected}
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                      {item.referredDate}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center space-x-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10.5px] font-semibold text-amber-800 border border-amber-200/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                        <span>{item.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Info Banner at bottom of card matching Image 4 */}
          {showInfoBanner && (
            <div className="rounded-xl border border-blue-200/80 bg-blue-50/50 p-3 flex items-center justify-between text-xs text-blue-900 transition">
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4 text-blue-600 shrink-0" />
                <span className="text-[11.5px] leading-relaxed">
                  Suspected disease comes from the field. Your confirmed diagnosis is recorded separately.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowInfoBanner(false)}
                className="text-blue-400 hover:text-blue-700 p-0.5 rounded transition cursor-pointer"
                title="Dismiss note"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Right Column (1 col): Recent diagnoses & Catalog quick reference */}
        <div className="space-y-5">
          {/* Recent diagnoses Card matching Image 4 */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Recent diagnoses
            </h2>

            <div className="mt-3.5 space-y-3.5">
              {RECENT_DIAGNOSES.map((diag, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">
                      {diag.diagId} • {diag.disease}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {diag.caseId} • {diag.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Catalog quick reference Card matching Image 4 */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900">
                Catalog quick reference
              </h2>
              <button
                type="button"
                onClick={onNavigateToCatalog}
                className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer"
              >
                <span>Open</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="mt-3.5 space-y-2.5">
              {CATALOG_REFERENCES.map((cat, idx) => (
                <div
                  key={idx}
                  onClick={onNavigateToCatalog}
                  className="flex items-center space-x-2.5 text-xs text-slate-700 hover:text-emerald-800 cursor-pointer p-1 rounded-lg hover:bg-slate-50 transition"
                >
                  <BookOpen className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="font-medium">
                    {cat.name} <span className="text-slate-400 font-mono text-[11px]">• {cat.code}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
