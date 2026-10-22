import React from 'react';
import {
  X,
  MapPin,
  Calendar,
  User,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Send,
  FileText,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * ObservationModal Component
 * Interactive details modal displaying complete tea leaf disease inspection,
 * field worker findings, photo evidence preview, and supervisor review actions.
 */
export default function ObservationModal({
  observation,
  onClose,
  onUpdateStatus
}) {
  if (!observation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-emerald-900">
              {observation.id}
            </span>
            <StatusBadge status={observation.status} />
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Specimen Details Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-[11px] font-medium text-slate-400 uppercase">Division</p>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">{observation.division}</p>
              <p className="text-[10px] text-slate-400">{observation.divisionCode || 'DIV'}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-400 uppercase">Disease</p>
              <p className="text-xs font-semibold text-emerald-800 mt-0.5">{observation.suspectedDisease}</p>
              <p className="text-[10px] text-slate-400">AI Conf: {observation.confidence || '88%'}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-400 uppercase">Captured</p>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">{observation.capturedDate || observation.captured}</p>
              <p className="text-[10px] text-slate-400">{observation.ageDays ? `${observation.ageDays} days ago` : 'Recent'}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-400 uppercase">Field Worker</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center">
                  {observation.fieldWorker?.initials || 'HN'}
                </span>
                <span className="text-xs font-semibold text-slate-800 truncate">
                  {observation.fieldWorker?.name || 'Hiruni Nadeesha'}
                </span>
              </div>
            </div>
          </div>

          {/* Visual Evidence Section */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>Diagnostic Evidence & Field Notes</span>
            </h4>
            <div className="p-4 rounded-xl border border-slate-200 bg-emerald-50/20 space-y-2">
              <p className="text-xs text-slate-700 leading-relaxed">
                {observation.notes || 'Specimen collected during routine morning sector scouting. Symptoms visible on leaf foliage.'}
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-[11px] text-slate-500 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {observation.gpsLocation || '6.8721° N, 80.6124° E'}
                </span>
                <span>Plot: <strong className="text-slate-700">{observation.plot || 'Sector A'}</strong></span>
                <span>Stage: <strong className="text-slate-700">{observation.leafStage || 'Mature foliage'}</strong></span>
                <span>Severity: <strong className="text-rose-600">{observation.severity || 'Moderate'}</strong></span>
              </div>
            </div>
          </div>

          {/* Supervisor Decision Actions */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 mb-2">
              Supervisor Action Options
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  onUpdateStatus(observation.id, 'Verified');
                  onClose();
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verify</span>
              </button>
              <button
                onClick={() => {
                  onUpdateStatus(observation.id, 'In review');
                  onClose();
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>In Review</span>
              </button>
              <button
                onClick={() => {
                  onUpdateStatus(observation.id, 'Correction requested');
                  onClose();
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Request Correction</span>
              </button>
              <button
                onClick={() => {
                  onUpdateStatus(observation.id, 'Referred');
                  onClose();
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-lime-600 hover:bg-lime-700 text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Refer Expert</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-white hover:text-slate-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
