import React from 'react';
import { BookOpen, ArrowLeft, ShieldAlert, CheckCircle2, Search, ExternalLink } from 'lucide-react';
import { CATALOG_REFERENCES } from '../data/expertDashboardData';

export const CatalogView = ({ onReturnToDashboard }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Disease Catalog
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tea Research Institute (TRI) Sri Lanka • Standard Reference Protocols
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATALOG_REFERENCES.map((item) => (
          <div
            key={item.code}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs hover:shadow-sm transition space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {item.code}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1.5">
                  {item.name}
                </h3>
                <div className="text-xs italic text-slate-500">{item.scientific}</div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
                <BookOpen className="h-4 w-4" />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Protocol:</span>
                <span className="font-semibold text-slate-800">{item.triProtocol}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Active Prescription:</span>
                <span className="font-semibold text-emerald-800">{item.activeRx}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
