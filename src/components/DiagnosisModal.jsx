import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, ShieldCheck, RefreshCw, Send, Check } from 'lucide-react';
import { LeafGraphic } from './LeafGraphic';

export const DiagnosisModal = ({ specimen, isOpen, onClose, onApprove }) => {
  const [selectedRx, setSelectedRx] = useState(specimen?.recommendedRx || '');
  const [notes, setNotes] = useState('');
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);

  if (!isOpen || !specimen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-3.5">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs font-bold text-slate-800 bg-slate-200/80 px-2 py-0.5 rounded">
              #{specimen.id}
            </span>
            <div className="h-4 w-px bg-slate-300"></div>
            <span className="font-mono text-xs font-semibold text-slate-600">
              {specimen.block}
            </span>
            <span className="inline-flex items-center rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 uppercase">
              {specimen.priority}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Main Inspection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left: Specimen Viewer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Micrographic AI Analysis</span>
                <button
                  type="button"
                  onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                  className="text-[11px] font-medium text-emerald-700 hover:underline"
                >
                  {showBoundingBoxes ? 'Hide AI Overlays' : 'Show AI Overlays'}
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-950">
                <LeafGraphic
                  type={specimen.leafImage}
                  specimenId={specimen.id}
                  className="w-full h-56"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                <span>AI Confidence: <strong className="text-emerald-700">{specimen.aiConfidence}</strong></span>
                <span>Latin: <em>{specimen.pathogenLatin}</em></span>
              </div>
            </div>

            {/* Right: Pathological Findings */}
            <div className="space-y-3.5 text-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900">{specimen.title}</h3>
                <p className="mt-1 text-slate-600 leading-relaxed">{specimen.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-50/70 p-3 border border-slate-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Tissue Type</span>
                  <div className="font-semibold text-slate-800 mt-0.5">{specimen.leafType}</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Severity</span>
                  <div className="font-semibold text-slate-800 mt-0.5">{specimen.severity}</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Field Scout</span>
                  <div className="font-semibold text-slate-800 mt-0.5">{specimen.scout} ({specimen.scoutId})</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Logged Time</span>
                  <div className="font-semibold text-slate-800 mt-0.5">{specimen.time}</div>
                </div>
              </div>

              {/* Protocol Recommendation */}
              <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-3 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-emerald-900 font-bold text-xs">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  <span>TRI Approved Prescription Protocol</span>
                </div>
                <div className="font-mono text-xs font-semibold text-emerald-950">
                  {specimen.recommendedRx}
                </div>
                <p className="text-[11px] text-emerald-800/80">
                  Broadcasts advisory to drone spraying unit and mobile estate supervisor.
                </p>
              </div>
            </div>
          </div>

          {/* Agronomist Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10.5px]">
              Agronomist Triage Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter specific instructions for field team (e.g., isolate row 12-18, spray post-rain)..."
              className="w-full rounded-lg border border-slate-200 p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/70 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Cancel
          </button>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                alert(`Resampling order dispatched for specimen #${specimen.id} to Scout ${specimen.scoutId}`);
                onClose();
              }}
              className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              <RefreshCw className="h-3 w-3 text-slate-400" />
              <span>Request Re-sample</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onApprove(specimen);
                onClose();
              }}
              className="inline-flex items-center space-x-1.5 rounded-lg bg-[#0f4c3a] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0c3c2e] active:scale-[0.98] transition"
            >
              <Check className="h-3.5 w-3.5 text-emerald-200" />
              <span>Confirm Diagnosis & Dispatch Rx</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
