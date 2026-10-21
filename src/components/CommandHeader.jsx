import React from 'react';
import { RotateCw, Megaphone, ShieldAlert, Sparkles } from 'lucide-react';

export const CommandHeader = ({ onRefreshSync, onTriggerAdvisory, isSyncing }) => {
  return (
    <div className="space-y-2">
      {/* Protocol Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center space-x-2 text-[11px] font-bold tracking-wider text-emerald-800">
          <span className="uppercase font-mono">TRIAGE TERMINAL // LEVEL-3 PATHOLOGY</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-medium">Tea Research Institute Protocol v4.2</span>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={onRefreshSync}
            disabled={isSyncing}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 active:scale-[0.98] transition disabled:opacity-60"
          >
            <RotateCw className={`h-3.5 w-3.5 text-slate-500 ${isSyncing ? 'animate-spin text-emerald-600' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Refresh Sync'}</span>
          </button>

          <button
            type="button"
            onClick={onTriggerAdvisory}
            className="inline-flex items-center space-x-1.5 rounded-lg bg-[#0f4c3a] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0c3c2e] active:scale-[0.98] transition"
          >
            <Megaphone className="h-3.5 w-3.5 text-emerald-200" />
            <span>Trigger Estate Advisory</span>
          </button>
        </div>
      </div>

      {/* Main Title */}
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Agronomist Pathological Triage Command
      </h1>
    </div>
  );
};
