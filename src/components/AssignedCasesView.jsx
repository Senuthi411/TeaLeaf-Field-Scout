import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  Download,
  RotateCcw,
  CheckCircle2,
  Hourglass,
  Link as LinkIcon,
  ArrowLeft,
  X,
} from 'lucide-react';
import { ALL_ASSIGNED_CASES } from '../data/expertDashboardData';

export const AssignedCasesView = ({ onSelectCase, onReturnToDashboard }) => {
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'AWAITING' | 'DIAGNOSED'
  const [searchQuery, setSearchQuery] = useState('');
  const [estateFilter, setEstateFilter] = useState('ALL');
  const [diseaseFilter, setDiseaseFilter] = useState('ALL');
  const [timeFilter, setTimeFilter] = useState('30d');

  const filteredCases = useMemo(() => {
    return ALL_ASSIGNED_CASES.filter((item) => {
      // Tab filter
      if (activeTab === 'AWAITING' && item.status !== 'Awaiting diagnosis') return false;
      if (activeTab === 'DIAGNOSED' && item.status !== 'Diagnosed') return false;

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.id.toLowerCase().includes(q) ||
          item.observationId.toLowerCase().includes(q) ||
          item.suspected.toLowerCase().includes(q) ||
          item.estateDivision.toLowerCase().includes(q) ||
          item.referredBy.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Estate Filter
      if (estateFilter !== 'ALL' && !item.estateDivision.toLowerCase().includes(estateFilter.toLowerCase())) {
        return false;
      }

      // Disease Filter
      if (diseaseFilter !== 'ALL' && !item.suspected.toLowerCase().includes(diseaseFilter.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [activeTab, searchQuery, estateFilter, diseaseFilter]);

  const handleExportCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'Case_ID,Observation_ID,Estate_Division,Suspected_Disease,Referred_By,Referred_Date,Status',
        ...filteredCases.map(
          (c) =>
            `${c.id},${c.observationId},${c.estateDivision},${c.suspected},${c.referredBy},${c.referredDate},${c.status}`
        ),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'TeaLeaf-Assigned-Cases-Export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetFilters = () => {
    setActiveTab('ALL');
    setSearchQuery('');
    setEstateFilter('ALL');
    setDiseaseFilter('ALL');
    setTimeFilter('30d');
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Header matching Image 5 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Assigned Cases
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Cases referred to you by supervisors
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={onReturnToDashboard}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Tabs Filter Bar matching Image 5 */}
      <div className="flex items-center space-x-6 border-b border-slate-200 text-xs font-semibold text-slate-500">
        <button
          type="button"
          onClick={() => setActiveTab('ALL')}
          className={`pb-2.5 transition border-b-2 cursor-pointer ${
            activeTab === 'ALL'
              ? 'border-emerald-800 text-emerald-900 font-bold'
              : 'border-transparent hover:text-slate-800'
          }`}
        >
          All 5
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('AWAITING')}
          className={`pb-2.5 transition border-b-2 cursor-pointer ${
            activeTab === 'AWAITING'
              ? 'border-emerald-800 text-emerald-900 font-bold'
              : 'border-transparent hover:text-slate-800'
          }`}
        >
          Awaiting diagnosis 3
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('DIAGNOSED')}
          className={`pb-2.5 transition border-b-2 cursor-pointer ${
            activeTab === 'DIAGNOSED'
              ? 'border-emerald-800 text-emerald-900 font-bold'
              : 'border-transparent hover:text-slate-800'
          }`}
        >
          Diagnosed 2
        </button>
      </div>

      {/* Filters Toolbar matching Image 5 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search by case or observation */}
          <div className="relative w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by case or observation"
              className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          {/* Estate Dropdown */}
          <div className="relative">
            <select
              value={estateFilter}
              onChange={(e) => setEstateFilter(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 shadow-2xs focus:border-emerald-600 focus:outline-none cursor-pointer"
            >
              <option value="ALL">Estate: All</option>
              <option value="Riverbend">Riverbend</option>
              <option value="Highland">Highland</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Disease Dropdown */}
          <div className="relative">
            <select
              value={diseaseFilter}
              onChange={(e) => setDiseaseFilter(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 shadow-2xs focus:border-emerald-600 focus:outline-none cursor-pointer"
            >
              <option value="ALL">Disease: All</option>
              <option value="Blister blight">Blister blight</option>
              <option value="Grey blight">Grey blight</option>
              <option value="Brown blight">Brown blight</option>
              <option value="Algal leaf spot">Algal leaf spot</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Referred Time Dropdown */}
          <div className="relative">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 shadow-2xs focus:border-emerald-600 focus:outline-none cursor-pointer"
            >
              <option value="30d">Referred: Last 30 days</option>
              <option value="7d">Referred: Last 7 days</option>
              <option value="all">Referred: All time</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Reset Filters Link */}
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 underline cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      </div>

      {/* Main Table matching Image 5 */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3 px-3.5">Case</th>
              <th className="py-3 px-3.5">Observation</th>
              <th className="py-3 px-3.5">Estate - Division</th>
              <th className="py-3 px-3.5">Suspected</th>
              <th className="py-3 px-3.5">Referred By</th>
              <th className="py-3 px-3.5">Referred</th>
              <th className="py-3 px-3.5">Link</th>
              <th className="py-3 px-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCases.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelectCase && onSelectCase(item)}
                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <td className="py-3.5 px-3.5 font-bold text-emerald-800 group-hover:underline font-mono">
                  {item.id}
                </td>
                <td className="py-3.5 px-3.5 font-mono text-slate-600">
                  {item.observationId}
                </td>
                <td className="py-3.5 px-3.5 text-slate-700 font-medium">
                  {item.estateDivision}
                </td>
                <td className="py-3.5 px-3.5 text-slate-800">
                  {item.suspected}
                </td>
                <td className="py-3.5 px-3.5">
                  <div className="flex items-center space-x-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-800">
                      {item.referredByInitials}
                    </span>
                    <span className="text-slate-700">{item.referredBy}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3.5 text-slate-500 font-mono text-[11px]">
                  {item.referredDate}
                </td>
                <td className="py-3.5 px-3.5">
                  <span className="inline-flex items-center space-x-1 rounded bg-slate-100 px-2 py-0.5 text-[10.5px] font-medium text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                    <span>Linked</span>
                  </span>
                </td>
                <td className="py-3.5 px-3.5">
                  {item.status === 'Awaiting diagnosis' ? (
                    <span className="inline-flex items-center space-x-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10.5px] font-semibold text-amber-800 border border-amber-200/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                      <span>{item.status}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10.5px] font-semibold text-emerald-800 border border-emerald-200/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                      <span>{item.status}</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Table Footer matching Image 5 */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/40 px-4 py-3 text-xs text-slate-500">
          <span>Showing 1-{filteredCases.length} of {ALL_ASSIGNED_CASES.length} cases</span>
          <div className="flex items-center space-x-1">
            <button
              type="button"
              disabled
              className="h-6 w-6 rounded border border-slate-200 flex items-center justify-center text-slate-300 cursor-not-allowed"
            >
              &lt;
            </button>
            <button
              type="button"
              className="h-6 w-6 rounded border border-emerald-700 bg-emerald-800 text-white flex items-center justify-center font-bold"
            >
              1
            </button>
            <button
              type="button"
              disabled
              className="h-6 w-6 rounded border border-slate-200 flex items-center justify-center text-slate-300 cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
