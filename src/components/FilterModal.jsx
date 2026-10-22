import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { filterOptions } from '../data/mockData';

export default function FilterModal({ isOpen, onClose, onApplyFilters }) {
  const [selectedEstate, setSelectedEstate] = useState('all');
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('oct_snapshot');
  const [selectedStatuses, setSelectedStatuses] = useState(filterOptions.reviewStatuses);

  if (!isOpen) return null;

  const toggleStatus = (status) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const handleReset = () => {
    setSelectedEstate('all');
    setSelectedDivision('all');
    setSelectedDateRange('oct_snapshot');
    setSelectedStatuses(filterOptions.reviewStatuses);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Analytics Filters</h3>
            <p className="text-xs text-slate-500 mt-0.5">Filter scouting observations & breakdown metrics</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
          {/* Estate Selection */}
          <div>
            <label className="block font-medium text-slate-700 mb-1.5">Estate</label>
            <select
              value={selectedEstate}
              onChange={(e) => setSelectedEstate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-emerald-600"
            >
              {filterOptions.estates.map((est) => (
                <option key={est.id} value={est.id}>{est.label}</option>
              ))}
            </select>
          </div>

          {/* Division Selection */}
          <div>
            <label className="block font-medium text-slate-700 mb-1.5">Division</label>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-emerald-600"
            >
              {filterOptions.divisions.map((div) => (
                <option key={div.id} value={div.id}>{div.label}</option>
              ))}
            </select>
          </div>

          {/* Date Range Selection */}
          <div>
            <label className="block font-medium text-slate-700 mb-1.5">Date Range</label>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-emerald-600"
            >
              {filterOptions.dateRanges.map((d) => (
                <option key={d.id} value={d.id}>{d.label}</option>
              ))}
            </select>
          </div>

          {/* Review Statuses Filter (Checkboxes) */}
          <div>
            <label className="block font-medium text-slate-700 mb-2">Review Statuses Included</label>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.reviewStatuses.map((status) => {
                const isChecked = selectedStatuses.includes(status);
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => toggleStatus(status)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-left transition ${
                      isChecked
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-medium'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                      isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="truncate">{status}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-100">
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
          >
            Reset to defaults
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (onApplyFilters) onApplyFilters({ selectedEstate, selectedDivision, selectedDateRange, selectedStatuses });
                onClose();
              }}
              className="px-4 py-2 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs cursor-pointer"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
