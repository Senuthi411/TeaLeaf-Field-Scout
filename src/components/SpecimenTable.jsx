import React from 'react';
import { ExternalLink, MoreVertical, User, AlertCircle } from 'lucide-react';
import { LeafGraphic } from './LeafGraphic';

export const SpecimenTable = ({
  specimens,
  selectedIds,
  onToggleSelect,
  onLaunchDiagnosis,
  onMoreActions,
}) => {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'HIGH':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'MODERATE':
        return 'bg-lime-100 text-lime-700 border-lime-200';
      case 'REVIEW REQ.':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <th className="py-3 pl-4 pr-2 w-8">
              <span className="sr-only">Select</span>
            </th>
            <th className="py-3 px-3">Specimen / Preview</th>
            <th className="py-3 px-3">Location & Block</th>
            <th className="py-3 px-3">Priority</th>
            <th className="py-3 px-3">AI Pathogen Match</th>
            <th className="py-3 px-3">Waiting Time</th>
            <th className="py-3 px-3">Field Scout</th>
            <th className="py-3 px-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {specimens.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <tr
                key={item.id}
                className={`hover:bg-slate-50/80 transition-colors ${
                  isSelected ? 'bg-emerald-50/30' : ''
                }`}
              >
                <td className="py-3 pl-4 pr-2">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(item.id)}
                    className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 cursor-pointer accent-emerald-700"
                  />
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-14 shrink-0 overflow-hidden rounded-md border border-slate-200">
                      <LeafGraphic type={item.leafImage} specimenId={item.id} className="w-full h-full" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <div className="font-mono text-[10px] text-slate-400">#{item.id}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className="font-mono font-medium text-slate-700">{item.block}</span>
                  <div className="text-[10px] text-slate-400">{item.division}</div>
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`inline-block rounded border px-2 py-0.5 text-[10px] font-bold uppercase ${getPriorityBadge(
                      item.priority
                    )}`}
                  >
                    {item.priority}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-slate-800">{item.aiConfidence}</div>
                  <div className="italic text-[10px] text-slate-500">{item.pathogenLatin}</div>
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${
                      item.slaBreach ? 'bg-red-100 text-red-700 font-bold' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.waitingTime}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="text-slate-800 font-medium">{item.scout}</div>
                  <div className="text-[10px] text-slate-400">{item.time}</div>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={() => onLaunchDiagnosis(item)}
                      className="inline-flex items-center space-x-1 rounded-md bg-[#0f4c3a] px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#0c3c2e] transition"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Diagnose</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onMoreActions(item)}
                      className="rounded-md border border-slate-200 p-1 text-slate-400 hover:text-slate-700"
                    >
                      <MoreVertical className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
