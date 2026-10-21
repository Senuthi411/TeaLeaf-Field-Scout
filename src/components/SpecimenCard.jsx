import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, ExternalLink, Flame, RefreshCw, Download, CheckCircle2 } from 'lucide-react';
import { LeafGraphic } from './LeafGraphic';

export const SpecimenCard = ({
  specimen,
  isSelected,
  onToggleSelect,
  onLaunchDiagnosis,
  onEscalateToCritical,
  onRequestResample,
  onExportSpecimen,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-red-600 text-white font-bold ring-1 ring-red-700/20';
      case 'HIGH':
        return 'bg-amber-500 text-white font-bold ring-1 ring-amber-600/20';
      case 'MODERATE':
        return 'bg-lime-600 text-white font-bold ring-1 ring-lime-700/20';
      case 'REVIEW REQ.':
        return 'bg-blue-600 text-white font-bold ring-1 ring-blue-700/20';
      default:
        return 'bg-slate-600 text-white';
    }
  };

  const getMatchBadge = (priority) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'MODERATE':
        return 'bg-lime-500/20 text-lime-300 border-lime-500/40';
      case 'REVIEW REQ.':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-white shadow-2xs transition-all hover:shadow-md ${
        isSelected ? 'border-emerald-600 ring-2 ring-emerald-600/20' : 'border-slate-200/90'
      }`}
    >
      
      <div className="flex items-center justify-between border-b border-slate-100 px-3.5 py-2.5 bg-slate-50/60">
        <label className="flex items-center space-x-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(specimen.id)}
            className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 cursor-pointer accent-emerald-700"
          />
          <span className="font-mono text-xs font-bold text-slate-800 tracking-tight">
            {specimen.block}
          </span>
        </label>

        <span
          className={`rounded px-1.5 py-0.5 text-[9.5px] uppercase tracking-wide ${getPriorityBadge(
            specimen.priority
          )}`}
        >
          {specimen.priority}
        </span>
      </div>

     
      <div
        className="relative group/img cursor-pointer"
        onClick={() => onLaunchDiagnosis(specimen)}
        title="Click to launch high-resolution micrographic diagnosis"
      >
        <LeafGraphic type={specimen.leafImage} specimenId={specimen.id} className="w-full h-40" />

      
        <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-black/75 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center space-x-1">
            <ExternalLink className="h-3 w-3 text-emerald-300" />
            <span>Open Microscopy</span>
          </span>
        </div>

        
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/80 px-2.5 py-1.5 text-[10px] text-white backdrop-blur-xs">
          <span className="font-mono font-semibold text-slate-300">#{specimen.id}</span>
          <span
            className={`rounded border px-1.5 py-0.2 font-mono font-bold ${getMatchBadge(
              specimen.priority
            )}`}
          >
            {specimen.aiConfidence}
          </span>
          <span className="truncate italic text-slate-300 max-w-[110px]" title={specimen.pathogenLatin}>
            {specimen.pathogenLatin}
          </span>
        </div>
      </div>

    
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Waiting Pill */}
          <div className="flex items-start justify-between gap-1.5">
            <h4
              onClick={() => onLaunchDiagnosis(specimen)}
              className="font-bold text-sm text-slate-900 leading-snug hover:text-emerald-800 cursor-pointer transition-colors"
            >
              {specimen.title}
            </h4>
            <span
              className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                specimen.slaBreach
                  ? 'bg-red-100 text-red-700 font-bold border border-red-200 animate-pulse'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {specimen.waitingTime}
            </span>
          </div>

        
          <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {specimen.description}
          </p>
        </div>

        
        <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="truncate max-w-[170px]">
            <span className="font-medium text-slate-600">
              {specimen.scout} <span className="text-slate-400 font-mono">({specimen.scoutId})</span>
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-400 shrink-0">{specimen.time}</span>
        </div>
      </div>

      
      <div className="border-t border-slate-100 bg-slate-50/50 p-2.5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onLaunchDiagnosis(specimen)}
          className="flex-1 inline-flex items-center justify-center space-x-1.5 rounded-lg bg-[#0f4c3a] py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-[#0c3c2e] active:scale-[0.98] transition cursor-pointer"
        >
          <ExternalLink className="h-3.5 w-3.5 text-emerald-200" />
          <span>Launch Diagnosis</span>
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="More options"
            className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
          >
            <MoreVertical className="h-3.5 w-3.5" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 bottom-full mb-1.5 w-52 rounded-xl border border-slate-200 bg-white p-1 shadow-xl z-50 text-xs animate-in fade-in slide-in-from-bottom-1">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onLaunchDiagnosis(specimen);
                }}
                className="flex w-full items-center space-x-2 rounded-lg px-2.5 py-1.5 text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <ExternalLink className="h-3.5 w-3.5 text-emerald-700" />
                <span>Launch Diagnosis</span>
              </button>

              {specimen.priority !== 'CRITICAL' && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onEscalateToCritical(specimen);
                  }}
                  className="flex w-full items-center space-x-2 rounded-lg px-2.5 py-1.5 text-red-700 hover:bg-red-50 transition cursor-pointer font-medium"
                >
                  <Flame className="h-3.5 w-3.5 text-red-600" />
                  <span>Escalate to Critical</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onRequestResample(specimen);
                }}
                className="flex w-full items-center space-x-2 rounded-lg px-2.5 py-1.5 text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
                <span>Request Re-sample</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onExportSpecimen(specimen);
                }}
                className="flex w-full items-center space-x-2 rounded-lg px-2.5 py-1.5 text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <Download className="h-3.5 w-3.5 text-slate-400" />
                <span>Export Telemetry</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
