import React from 'react';
import { Filter, Download } from 'lucide-react';
import { snapshotMetadata } from '../data/mockData';

export default function PageHeader({ 
  title, 
  onOpenFilters, 
  onOpenExport 
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Title & Metadata Subheading */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="text-xs lg:text-sm text-slate-500 mt-1 font-normal">
          {/* DUMMY DATA: Snapshot metadata string */}
          Data as of {snapshotMetadata.lastUpdated} · {snapshotMetadata.snapshotLabel}
        </p>
      </div>

      {/* Action Buttons: Filters and Export */}
      <div className="flex items-center gap-2.5">
        {/* Filters Button */}
        <button
          onClick={onOpenFilters}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200/90 rounded-lg shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
        >
          <Filter className="w-3.5 h-3.5 text-slate-600" />
          <span>Filters</span>
        </button>

        {/* Export Button */}
        <button
          onClick={onOpenExport}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200/90 rounded-lg shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-slate-600" />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
}
