import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const SimplePageView = ({ pageName, onReturnToDashboard }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Header with Page Name & Return Button */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {pageName}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Cases &gt; {pageName}
          </p>
        </div>

        <button
          type="button"
          onClick={onReturnToDashboard}
          className="inline-flex items-center space-x-1.5 rounded-xl bg-[#0d3826] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#09281a] transition cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Expert Dashboard</span>
        </button>
      </div>

      {/* Clean Card showing only page name */}
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-2xs space-y-2">
        <h2 className="text-xl font-bold text-slate-800">
          {pageName}
        </h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Module connected. Primary evaluation screen is the Expert Dashboard.
        </p>

        <div className="pt-4">
          <button
            type="button"
            onClick={onReturnToDashboard}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Expert Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
