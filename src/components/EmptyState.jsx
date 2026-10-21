import React from 'react';
import { Leaf, CheckCircle2, RotateCw } from 'lucide-react';

export const EmptyState = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 p-12 text-center">
      {/* Badge from Figma */}
      <span className="mb-4 inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
        EMPTY
      </span>

      {/* Circular Gray Placeholder */}
      <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 ring-8 ring-slate-50">
        <Leaf className="h-9 w-9 text-slate-300" />
        <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-2 ring-white">
          <CheckCircle2 className="h-4 w-4" />
        </div>
      </div>

      <h3 className="text-base font-bold text-slate-800">Queue empty</h3>
      <p className="mt-1 text-xs text-slate-500 max-w-sm">
        No specimens are waiting for diagnosis.
      </p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 active:scale-[0.98] transition"
        >
          <RotateCw className="h-3.5 w-3.5 text-slate-400" />
          <span>Reload Sample Queue</span>
        </button>
      )}
    </div>
  );
};
