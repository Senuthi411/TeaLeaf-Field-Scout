import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Clock,
  Layers,
  Check,
} from 'lucide-react';
import { LeafGraphic } from './LeafGraphic';

export const ObservationDetailsModal = ({ caseItem, isOpen, onClose, onConfirmDiagnosis }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [confirmedNotes, setConfirmedNotes] = useState('');

  if (!isOpen || !caseItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar matching Image 1 */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-6 py-4">
          <div>
            <div className="text-[11px] font-medium text-slate-500">
              Review &gt; Observation {caseItem.observationId || '035-005'} &gt; Details
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-0.5">
              Observation Details
            </h2>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              {caseItem.id} • {caseItem.observationId} • {caseItem.suspected} suspected
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                onConfirmDiagnosis && onConfirmDiagnosis(caseItem);
                onClose();
              }}
              className="inline-flex items-center space-x-1.5 rounded-lg bg-[#0d3826] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#09281a] transition cursor-pointer"
            >
              <Check className="h-3.5 w-3.5 text-emerald-300" />
              <span>Confirm & Diagnose</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs matching Image 1 */}
        <div className="flex items-center space-x-6 border-b border-slate-200 px-6 text-xs font-semibold text-slate-500 bg-white">
          {['Overview', 'Evidence', 'Metadata', 'Revisions'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTab(t)}
              className={`py-3 transition border-b-2 cursor-pointer ${
                activeTab === t
                  ? 'border-emerald-800 text-emerald-900 font-bold'
                  : 'border-transparent hover:text-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body matching Image 1 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Original Evidence Visualizer matching Image 1 */}
            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Original evidence
                </h3>

                {/* Leaf graphic matching Image 1 */}
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-gradient-to-b from-[#1b3f27] to-[#0e2417] p-4 flex flex-col items-center justify-center">
                  <LeafGraphic
                    type={caseItem.leafType || 'blister-blight'}
                    specimenId={caseItem.id}
                    className="w-full h-56"
                  />
                  <div className="mt-2 text-[10px] font-mono text-emerald-200/80 bg-black/40 px-2 py-0.5 rounded">
                    IMG_{caseItem.observationId}_original.png
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 font-mono leading-relaxed pt-1">
                  {caseItem.referredDate} • Evidence placeholder for {caseItem.observationId} • Original preserved • High resolution
                </div>
              </div>

              {/* Diagnosis Action Box */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  <span>Expert Pathologist Verdict</span>
                </div>
                <p className="text-slate-600 text-[11.5px]">
                  Confirmed diagnosis will be dispatched to supervisor <strong className="text-slate-800">{caseItem.referredBy}</strong> and logged to the estate treatment registry.
                </p>
                <textarea
                  rows={2}
                  value={confirmedNotes}
                  onChange={(e) => setConfirmedNotes(e.target.value)}
                  placeholder="Add agronomist notes / treatment instructions..."
                  className="w-full rounded-lg border border-emerald-200 bg-white p-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Right: Observation Summary & Suspected Symptoms matching Image 1 */}
            <div className="space-y-4">
              {/* Observation Summary Card matching Image 1 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs space-y-3 text-xs">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Observation summary
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Observation ID</span>
                    <div className="font-mono font-semibold text-slate-800 mt-0.5">{caseItem.observationId}</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Device observation</span>
                    <div className="font-mono font-semibold text-slate-800 mt-0.5">DEV-OBS-0065</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Estate</span>
                    <div className="font-semibold text-slate-800 mt-0.5">{caseItem.estate || 'Riverbend Tea Estate (EST-002)'}</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Division</span>
                    <div className="font-semibold text-slate-800 mt-0.5">{caseItem.division || 'East Hills (DIV-003)'}</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Captured by</span>
                    <div className="font-semibold text-slate-800 mt-0.5">{caseItem.scout || 'Hiranji Hadeesha'}</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Catalog version</span>
                    <div className="font-semibold text-slate-800 mt-0.5 font-mono">2</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Upload status</span>
                    <div className="mt-0.5 text-emerald-700 font-semibold flex items-center space-x-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      <span>Uploaded</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Review status</span>
                    <div className="mt-0.5 text-amber-700 font-semibold flex items-center space-x-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                      <span>{caseItem.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suspected Disease and Symptoms Card matching Image 1 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs space-y-2.5 text-xs">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Suspected disease and symptoms
                </h3>

                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-slate-800 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                    <span>Suspected: {caseItem.suspected} ({caseItem.diseaseCode || 'DIS-001'})</span>
                    <span className="text-slate-400 font-normal">• Not a confirmed diagnosis</span>
                  </div>

                  <div className="flex items-center space-x-2 text-slate-600 text-[11px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
                    <span>Symptoms: Vesicular pustules (SYM-001) • Interveinal chlorosis (SYM-003)</span>
                  </div>

                  <p className="text-[11px] text-slate-500 italic pt-1">
                    Field note: Scouting observation logged via TeaLeaf Mobile Scout; requires level-3 pathology sign-off.
                  </p>
                </div>
              </div>

              {/* Linked Records Card matching Image 1 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs space-y-2.5 text-xs">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Linked records
                </h3>

                <div className="space-y-1.5 text-[11.5px]">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-600">Review: <strong className="text-slate-800 font-mono">REV-008</strong></span>
                    <span className="text-amber-700 font-semibold">Correction requested</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-600">Correction request: <strong className="text-slate-800 font-mono">COR-005</strong></span>
                    <span className="text-blue-700 font-semibold">Resubmitted</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-600">Revision: <strong className="text-slate-800 font-mono">OBS-035-2</strong></span>
                    <span className="text-purple-700 font-semibold">Pending evaluation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/70 px-6 py-3.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirmDiagnosis && onConfirmDiagnosis(caseItem);
              onClose();
            }}
            className="inline-flex items-center space-x-1.5 rounded-lg bg-[#0d3826] px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#09281a] transition cursor-pointer"
          >
            <Check className="h-3.5 w-3.5 text-emerald-300" />
            <span>Confirm Diagnosis for {caseItem.id}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
