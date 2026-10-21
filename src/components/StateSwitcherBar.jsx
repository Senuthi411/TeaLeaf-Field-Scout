import React, { useState } from 'react';
import { Layers, Eye, EyeOff, CheckCircle2, ChevronDown } from 'lucide-react';

export const StateSwitcherBar = ({
  currentState,
  setCurrentState,
  onOpenConfirmModal,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <div className="bg-slate-900 text-slate-300 px-4 py-1 text-[11px] flex items-center justify-between border-b border-slate-800">
        <span className="font-semibold text-emerald-400 flex items-center space-x-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          <span>Figma State Inspector: Active ({currentState.toUpperCase()})</span>
        </span>
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
        >
          Expand Inspector
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between border-b border-slate-800 gap-2 select-none">
      <div className="flex items-center space-x-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
        <span className="font-bold text-slate-200">Figma 6.1 State Inspector:</span>
        <span className="text-slate-400 hidden sm:inline">
          Switch between states depicted in the evaluation design canvas
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1.5 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
          <button
            type="button"
            onClick={() => setCurrentState('live')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer ${
              currentState === 'live'
                ? 'bg-emerald-700 text-white font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Live Queue
          </button>

          <button
            type="button"
            onClick={() => setCurrentState('loading')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer ${
              currentState === 'loading'
                ? 'bg-emerald-700 text-white font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Loading Images
          </button>

          <button
            type="button"
            onClick={() => setCurrentState('empty')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer ${
              currentState === 'empty'
                ? 'bg-emerald-700 text-white font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Queue Empty
          </button>

          <button
            type="button"
            onClick={onOpenConfirmModal}
            className="px-2.5 py-1 rounded text-xs font-medium text-amber-300 hover:text-amber-200 hover:bg-slate-700/50 transition border-l border-slate-700 pl-2 cursor-pointer"
          >
            Confirm Modal
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsCollapsed(true)}
          className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800 transition cursor-pointer"
          title="Minimize Inspector Bar"
        >
          <EyeOff className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
