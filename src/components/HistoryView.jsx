import React from 'react';
import { History, ArrowLeft, CheckCircle2, Calendar, FileText } from 'lucide-react';
import { RECENT_DIAGNOSES } from '../data/expertDashboardData';

export const HistoryView = ({ onReturnToDashboard }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Case History
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Archived pathology diagnoses and treatment sign-offs
          </p>
        </div>

        <button
          type="button"
          onClick={onReturnToDashboard}
          className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Dashboard</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900">
          Completed Diagnoses Log
        </h2>

        <div className="divide-y divide-slate-100">
          {RECENT_DIAGNOSES.map((diag, idx) => (
            <div key={idx} className="py-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">
                    {diag.diagId} • {diag.disease}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Case reference: {diag.caseId} • Diagnosed by {diag.confirmedBy}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="font-mono text-[11px] text-slate-400">{diag.date}</span>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                  Archived
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
