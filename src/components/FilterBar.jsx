import React from 'react';
import { ChevronDown, LayoutGrid, List, Sparkles, RefreshCw, Check } from 'lucide-react';

export const FilterBar = ({
  pathogenFilter,
  setPathogenFilter,
  priorityFilter,
  setPriorityFilter,
  divisionFilter,
  setDivisionFilter,
  waitingFilter,
  setWaitingFilter,
  viewMode,
  setViewMode,
  totalCount = 18,
  filteredCount = 4,
  selectAllEligible,
  setSelectAllEligible,
  onBatchValidate,
  onRequestResample,
  selectedCount = 0,
}) => {
  return (
    <div className="space-y-3">
      {/* Top Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          {/* Pathogen Filter */}
          <div className="relative">
            <select
              value={pathogenFilter}
              onChange={(e) => setPathogenFilter(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition"
            >
              <option value="ALL">All Pathogens</option>
              <option value="Blister Blight">Blister Blight</option>
              <option value="Grey Blight">Grey Blight</option>
              <option value="Red Stem Canker">Red Stem Canker</option>
              <option value="Unidentified Chlorotic Mosaic">Chlorotic Mosaic</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition"
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MODERATE">Moderate</option>
              <option value="REVIEW REQ.">Review Req.</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Division & Block Filter */}
          <div className="relative">
            <select
              value={divisionFilter}
              onChange={(e) => setDivisionFilter(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition"
            >
              <option value="ALL">All Divisions & Blocks</option>
              <option value="Division 01">Division 01 (Pedro)</option>
              <option value="Division 02">Division 02 (Pedro B)</option>
              <option value="Division 03">Division 03 (Pedro C)</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Waiting Time Filter */}
          <div className="relative">
            <select
              value={waitingFilter}
              onChange={(e) => setWaitingFilter(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition"
            >
              <option value="ALL">Waiting Time: All</option>
              <option value="UNDER_2H">&lt; 2 Hours</option>
              <option value="UNDER_6H">&lt; 6 Hours</option>
              <option value="OVER_12H">&gt; 12 Hours (SLA Breach)</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* View Switcher & Counter */}
        <div className="flex items-center space-x-3 text-xs text-slate-500">
          <span className="font-medium text-slate-600">
            Viewing <span className="font-bold text-slate-900">{filteredCount}</span> of {totalCount} Cases
          </span>

          <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center space-x-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                viewMode === 'grid'
                  ? 'bg-slate-100 font-semibold text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                viewMode === 'table'
                  ? 'bg-slate-100 font-semibold text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Batch Operations Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200/90 bg-white/80 px-3.5 py-2">
        <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-slate-700 select-none">
          <input
            type="checkbox"
            checked={selectAllEligible}
            onChange={(e) => setSelectAllEligible(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 cursor-pointer accent-emerald-700"
          />
          <span className="font-medium">
            Select All Eligible <span className="text-slate-400 font-normal">({selectedCount > 0 ? `${selectedCount} selected` : '14 Active'})</span>
          </span>
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mr-1">
            Quick Batch Operations:
          </span>

          <button
            type="button"
            onClick={onBatchValidate}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-emerald-300/80 bg-emerald-50/60 px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100/70 active:scale-[0.98] transition shadow-2xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Batch Validate Confirmed AI (&gt;90%)</span>
          </button>

          <button
            type="button"
            onClick={onRequestResample}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition shadow-2xs"
          >
            <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
            <span>Request Field Resample</span>
          </button>
        </div>
      </div>
    </div>
  );
};
