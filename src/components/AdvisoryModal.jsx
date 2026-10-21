import React, { useState } from 'react';
import { X, Megaphone, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';

export const AdvisoryModal = ({ isOpen, onClose, onSend }) => {
  const [division, setDivision] = useState('All Divisions (Highlands)');
  const [severity, setSeverity] = useState('High Risk - Sporulation Alert');
  const [message, setMessage] = useState('High morning relative humidity (>92%) detected. Blister Blight sporulation risk elevated. Prepare copper fungicide spraying squads in Pedro Division 01 & 02 immediately.');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-emerald-900 px-5 py-3.5 text-white">
          <div className="flex items-center space-x-2.5">
            <Megaphone className="h-4 w-4 text-emerald-300" />
            <h3 className="text-sm font-bold tracking-tight">Trigger Estate Pathological Advisory</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-emerald-200 hover:bg-emerald-800 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4 text-xs">
          <div>
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
              Target Division / Mesh Broadcast
            </label>
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-medium text-slate-800 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option>All Divisions (Highlands Mesh)</option>
              <option>Pedro Estate - Division 01</option>
              <option>Pedro Estate - Division 02</option>
              <option>Pedro Estate - Division 03</option>
            </select>
          </div>

          <div>
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
              Advisory Severity Level
            </label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-medium text-slate-800 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option>High Risk - Sporulation Alert (Quarantine)</option>
              <option>Moderate - Preventive Fungicide Window</option>
              <option>Advisory - Scouting Frequency Increase</option>
            </select>
          </div>

          <div>
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
              Advisory Transmission Message
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-2.5 text-amber-800 text-[11px] flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>This broadcast will immediately alert 24 Field Scouts via Flutter Mobile App & Estate Mesh.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-2.5 border-t border-slate-200 bg-slate-50 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSend && onSend({ division, severity, message });
              onClose();
            }}
            className="inline-flex items-center space-x-1.5 rounded-lg bg-[#0f4c3a] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0c3c2e] active:scale-[0.98] transition"
          >
            <Send className="h-3.5 w-3.5 text-emerald-200" />
            <span>Broadcast Advisory</span>
          </button>
        </div>
      </div>
    </div>
  );
};
