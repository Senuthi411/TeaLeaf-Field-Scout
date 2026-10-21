import React from 'react';

export const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
   
      <div className="flex items-center space-x-2">
        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          LOADING
        </span>
        <h3 className="text-sm font-bold text-slate-800">Loading images</h3>
        <span className="text-xs text-slate-400">Loading specimen photos...</span>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white p-0 animate-pulse shadow-2xs"
          >
            
            <div className="flex items-center justify-between border-b border-slate-100 px-3.5 py-2.5 bg-slate-50/60">
              <div className="h-3.5 w-24 rounded bg-slate-200"></div>
              <div className="h-4 w-14 rounded bg-slate-200"></div>
            </div>

            
            <div className="h-40 w-full bg-slate-200/80 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
              <div className="absolute bottom-2 left-3 right-3 h-4 bg-slate-300/60 rounded"></div>
            </div>

          
            <div className="p-3.5 space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-4 w-32 rounded bg-slate-200"></div>
                <div className="h-3 w-16 rounded bg-slate-100"></div>
              </div>
              <div className="space-y-1.5">
                <div className="h-2.5 w-full rounded bg-slate-100"></div>
                <div className="h-2.5 w-4/5 rounded bg-slate-100"></div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between">
                <div className="h-3 w-28 rounded bg-slate-100"></div>
                <div className="h-3 w-12 rounded bg-slate-100"></div>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-slate-50/50 p-2.5 flex gap-2">
              <div className="h-7 flex-1 rounded-lg bg-slate-200"></div>
              <div className="h-7 w-7 rounded-lg bg-slate-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
