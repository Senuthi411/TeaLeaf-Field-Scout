import React from 'react';
import { X, BookOpen, ExternalLink, Shield } from 'lucide-react';
import { TRI_REFERENCE_STRAINS } from '../data/mockData';

export const DiagnosticKeyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3.5">
          <div className="flex items-center space-x-2.5">
            <BookOpen className="h-4 w-4 text-emerald-800" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                TRI Pathological Reference Strain Index & Diagnostic Key
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                Sri Lanka Tea Research Institute (TRI) Protocol v4.2
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Strains Table */}
        <div className="p-5 overflow-y-auto space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Standard chemical treatments, dosage rates, and recommended field intervention protocols for highland Camellia sinensis varieties.
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-bold uppercase text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Pathogen / Strain</th>
                  <th className="py-2.5 px-3">Common Name</th>
                  <th className="py-2.5 px-3">Active Rx Compound</th>
                  <th className="py-2.5 px-3">Approved Dosage</th>
                  <th className="py-2.5 px-3">TRI Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TRI_REFERENCE_STRAINS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{item.strain}</td>
                    <td className="py-2.5 px-3 text-slate-600">{item.commonName}</td>
                    <td className="py-2.5 px-3">
                      <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {item.rx}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-700">{item.dosage}</td>
                    <td className="py-2.5 px-3 text-slate-500 font-mono text-[10px]">{item.protocol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-200 bg-slate-50 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#0f4c3a] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#0c3c2e] transition"
          >
            Close Reference
          </button>
        </div>
      </div>
    </div>
  );
};
