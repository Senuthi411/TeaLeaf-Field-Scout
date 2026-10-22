import React from 'react';
import PageHeader from '../components/PageHeader';
import { Leaf, ArrowRight } from 'lucide-react';

export default function PlaceholderPage({ title, onOpenFilters, onOpenExport, onNavigateTo }) {
  return (
    <div className="flex-1 flex flex-col p-6 lg:p-8 max-w-[1920px] mx-auto w-full">
      <PageHeader
        title={title}
        onOpenFilters={onOpenFilters}
        onOpenExport={onOpenExport}
      />

      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 shadow-2xs text-center flex flex-col items-center justify-center my-auto min-h-[460px]">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
          <Leaf className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{title} Module</h2>
        <p className="text-xs text-slate-500 max-w-md mt-2">
          This analytical section is configured with mock parameters. You can inspect the primary UI mockups built from your design specifications below:
        </p>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => onNavigateTo('analytics-dashboard')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-medium hover:bg-emerald-800 transition shadow-xs cursor-pointer"
          >
            <span>View Analytics Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigateTo('observation-statistics')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition cursor-pointer"
          >
            <span>View Observation Statistics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
