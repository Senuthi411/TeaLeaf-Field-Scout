import React, { useState, useMemo } from 'react';
import {
  Download,
  Search,
  ChevronDown,
  RotateCcw,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
  FileSpreadsheet,
  X
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import {
  OBSERVATIONS_DATA,
  REVIEW_QUEUE_TABS,
  FILTER_OPTIONS,
  CURRENT_USER
} from '../data/dummyData';

/**
 * ReviewQueue Component
 * 
 * Exact recreation of Observation Review Queue (3840x2160.png).
 * Receives the activeTabFilter (which can be passed when a user clicks any of the
 * 5 boxes on the Supervisor Dashboard).
 */
export default function ReviewQueue({
  selectedTab,
  setSelectedTab,
  onOpenObservationModal,
  onUpdateObservationStatus
}) {
  // Local filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('All');
  const [selectedDisease, setSelectedDisease] = useState('All');
  const [selectedCaptured, setSelectedCaptured] = useState('Last 30 days');

  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState(null); // 'division' | 'disease' | 'captured' | null

  // Row action menu popover state
  const [activeActionMenuRowId, setActiveActionMenuRowId] = useState(null);

  // Export banner feedback state
  const [exportFeedback, setExportFeedback] = useState(null);

  // Close any open dropdown on click away
  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Reset all filters back to default
  const handleResetFilters = () => {
    setSelectedTab('All');
    setSearchQuery('');
    setSelectedDivision('All');
    setSelectedDisease('All');
    setSelectedCaptured('Last 30 days');
    setOpenDropdown(null);
  };

  // Filter observations based on selected tab, search query, and dropdown filters
  const filteredObservations = useMemo(() => {
    return OBSERVATIONS_DATA.filter((item) => {
      // 1. Tab filter (Submitted, In review, Flagged, Correction requested, Referred, Verified, or All)
      if (selectedTab !== 'All' && item.status.toLowerCase() !== selectedTab.toLowerCase()) {
        return false;
      }

      // 2. Search query (matches Observation ID or Field Worker Name)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesId = item.id.toLowerCase().includes(query);
        const matchesWorker = item.fieldWorker.name.toLowerCase().includes(query);
        const matchesDisease = item.suspectedDisease.toLowerCase().includes(query);
        if (!matchesId && !matchesWorker && !matchesDisease) {
          return false;
        }
      }

      // 3. Division dropdown filter
      if (selectedDivision !== 'All' && item.division !== selectedDivision) {
        return false;
      }

      // 4. Disease dropdown filter
      if (selectedDisease !== 'All' && item.suspectedDisease !== selectedDisease) {
        return false;
      }

      return true;
    });
  }, [selectedTab, searchQuery, selectedDivision, selectedDisease]);

  // Dynamic counts for tabs based on OBSERVATIONS_DATA
  const getTabCount = (filterValue) => {
    if (filterValue === 'All') return OBSERVATIONS_DATA.length;
    return OBSERVATIONS_DATA.filter(
      (obs) => obs.status.toLowerCase() === filterValue.toLowerCase()
    ).length;
  };

  // Handle Export to CSV
  const handleExportCSV = () => {
    const headers = ["Observation ID", "Division", "Suspected Disease", "Captured Date", "Field Worker", "Status"];
    const rows = filteredObservations.map(obs => [
      obs.id,
      obs.division,
      obs.suspectedDisease,
      obs.capturedDate,
      obs.fieldWorker.name,
      obs.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `TeaLeaf_Observations_${selectedTab.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportFeedback(`Exported ${filteredObservations.length} records successfully.`);
    setTimeout(() => setExportFeedback(null), 3000);
  };

  return (
    <div className="space-y-5 pb-8 select-none">
      {/* ------------------------------------------------------------- */}
      {/* 1. Header Section: Title & Export Button                      */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Observation Review Queue
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {OBSERVATIONS_DATA.length} observations in {CURRENT_USER.estateId} · demo data
          </p>
        </div>

        {/* Top Right: Export Button */}
        <div className="relative">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export</span>
          </button>

          {/* Export notification toast */}
          {exportFeedback && (
            <div className="absolute right-0 top-10 w-64 bg-slate-900 text-white text-xs px-3 py-2 rounded-xl shadow-lg flex items-center justify-between z-40 animate-in fade-in duration-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                {exportFeedback}
              </span>
              <button onClick={() => setExportFeedback(null)}>
                <X className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. Upper Half - Status Filter Tabs                            */}
      {/* LINKED ACCORDINGLY FROM SUPERVISOR DASHBOARD 5 BOXES          */}
      {/* ------------------------------------------------------------- */}
      <div className="border-b border-slate-200/90 pt-1">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
          {REVIEW_QUEUE_TABS.map((tab) => {
            const isSelected = selectedTab.toLowerCase() === tab.filterValue.toLowerCase();
            const count = getTabCount(tab.filterValue);

            return (
              <button
                key={tab.label}
                onClick={() => setSelectedTab(tab.filterValue)}
                className={`flex items-center gap-1.5 pb-3 text-xs whitespace-nowrap transition-colors cursor-pointer relative font-medium
                  ${
                    isSelected
                      ? 'text-emerald-950 font-bold border-b-2 border-emerald-800'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[11px] font-semibold ${isSelected ? 'text-emerald-900' : 'text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. Search and Dropdown Filter Bar                             */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search input field */}
        <div className="relative flex-1 min-w-[280px] max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by observation ID or field worker"
            className="w-full pl-9 pr-8 py-2 text-xs bg-white text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 shadow-2xs focus:border-emerald-600 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Division Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('division')}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-2xs transition-colors cursor-pointer"
          >
            <span>Division: <strong className="text-slate-900 font-semibold">{selectedDivision}</strong></span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {openDropdown === 'division' && (
            <div className="absolute left-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40">
              {FILTER_OPTIONS.divisions.map((div) => (
                <button
                  key={div}
                  onClick={() => {
                    setSelectedDivision(div);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors cursor-pointer
                    ${selectedDivision === div ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  {div}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Disease Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('disease')}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-2xs transition-colors cursor-pointer"
          >
            <span>Disease: <strong className="text-slate-900 font-semibold">{selectedDisease}</strong></span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {openDropdown === 'disease' && (
            <div className="absolute left-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40">
              {FILTER_OPTIONS.diseases.map((dis) => (
                <button
                  key={dis}
                  onClick={() => {
                    setSelectedDisease(dis);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors cursor-pointer
                    ${selectedDisease === dis ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  {dis}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Captured Date Range Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('captured')}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-2xs transition-colors cursor-pointer"
          >
            <span>Captured: <strong className="text-slate-900 font-semibold">{selectedCaptured}</strong></span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {openDropdown === 'captured' && (
            <div className="absolute left-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40">
              {FILTER_OPTIONS.capturedRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedCaptured(range);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors cursor-pointer
                    ${selectedCaptured === range ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reset Filters Button */}
        <button
          onClick={handleResetFilters}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 px-2 py-2 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset filters</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. Observations Data Table                                    */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Observation</th>
                <th className="py-3 px-6">Division</th>
                <th className="py-3 px-6">Suspected Disease</th>
                <th className="py-3 px-6">Captured</th>
                <th className="py-3 px-6">Field Worker</th>
                <th className="py-3 px-6">Review Status</th>
                <th className="py-3 px-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredObservations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-medium">No observations match your current filter</p>
                    <button
                      onClick={handleResetFilters}
                      className="mt-2 text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
                    >
                      Reset all filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredObservations.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
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
                      {row.capturedDate}
                    </td>

                    {/* Field Worker with Initials Badge */}
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#dcfce7] text-[#14532d] text-[10px] font-bold flex items-center justify-center shrink-0">
                          {row.fieldWorker.initials}
                        </span>
                        <span className="text-slate-800 font-medium">
                          {row.fieldWorker.name}
                        </span>
                      </div>
                    </td>

                    {/* Review Status Pill */}
                    <td className="py-3.5 px-6">
                      <StatusBadge status={row.status} />
                    </td>

                    {/* Row Action Menu Button (•••) */}
                    <td className="py-3.5 px-6 text-right relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveActionMenuRowId(
                            activeActionMenuRowId === row.id ? null : row.id
                          );
                        }}
                        className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer ml-auto transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu for row actions */}
                      {activeActionMenuRowId === row.id && (
                        <div
                          className="absolute right-6 top-10 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 text-left"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => {
                              onOpenObservationModal(row.id);
                              setActiveActionMenuRowId(null);
                            }}
                            className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                            <span>View Details</span>
                          </button>
                          <div className="my-1 border-t border-slate-100" />
                          <button
                            onClick={() => {
                              onUpdateObservationStatus(row.id, 'Verified');
                              setActiveActionMenuRowId(null);
                            }}
                            className="w-full text-left px-3.5 py-1.5 text-xs text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer"
                          >
                            <span>Mark as Verified</span>
                          </button>
                          <button
                            onClick={() => {
                              onUpdateObservationStatus(row.id, 'In review');
                              setActiveActionMenuRowId(null);
                            }}
                            className="w-full text-left px-3.5 py-1.5 text-xs text-purple-700 hover:bg-purple-50 flex items-center gap-2 cursor-pointer"
                          >
                            <span>Move to In Review</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. Pagination & Counter Footer                                */}
      {/* ------------------------------------------------------------- */}
      <div className="flex items-center justify-between px-2 pt-1 text-xs text-slate-500">
        <div>
          Showing 1–{filteredObservations.length} of {filteredObservations.length} observations
        </div>

        <div className="flex items-center gap-1.5">
          <button
            disabled
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-300 flex items-center justify-center cursor-not-allowed"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          
          <button className="w-7 h-7 rounded-lg bg-[#185c32] text-white font-semibold text-xs flex items-center justify-center shadow-xs">
            1
          </button>

          <button
            disabled
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-300 flex items-center justify-center cursor-not-allowed"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
