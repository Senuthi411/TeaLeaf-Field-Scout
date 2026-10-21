import React from 'react';
import { ArrowUpRight, BookOpen, Download } from 'lucide-react';
import { TRI_REFERENCE_STRAINS } from '../data/mockData';

export const BottomCards = ({ onOpenStrainIndex, onDownloadTelemetry }) => {
  const triggerCsvDownload = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'Specimen_ID,Division,Block,Pathogen,Latin_Classification,AI_Confidence,Waiting_Hours,SLA_Status,Scout,Timestamp',
        'DBB-8842,Division 01,Pedro // BLK-A2,Blister Blight Sporulation,Exobasidium vexans,98.2%,1.4h,Within SLA,K. Somapala,08:14 AM',
        'DBB-8838,Division 01,Pedro // BLK-A1,Grey Blight Foliar Necrosis,Pestalotiopsis theae,91.4%,6.2h,Warning SLA,D. Bandara,03:30 AM',
        'DBB-8820,Division 02,Pedro // BLK-B4,Red Stem Canker Lesion,Physalospora neglecta,84.0%,14.0h,SLA Breach,R. Sivagnanam,Yesterday',
        'DBB-8815,Division 03,Pedro // BLK-C1,Unidentified Chlorotic Mosaic,Pathogen Unverified,62.1%,3.1h,Review Req.,M. Jayawardena,08:45 AM',
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'TRI-Pedro-Div01-04-SLA-Telemetry.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (onDownloadTelemetry) onDownloadTelemetry();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left Card: Field Pathology SLA Compliance */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Field Pathology SLA Compliance
              </h3>
              <div className="text-sm font-bold text-slate-900 mt-0.5">
                Division 01 - 04 Response Window
              </div>
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
              91.8% on target
            </span>
          </div>

          {/* 3 Stats Columns */}
          <div className="mt-4 grid grid-cols-3 gap-3 border-y border-slate-100 py-3">
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-400">
                Median Diagnosis Time
              </div>
              <div className="text-lg font-extrabold text-slate-800 font-mono mt-0.5">
                1h 48m
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase text-slate-400">
                Target SLA Window
              </div>
              <div className="text-lg font-extrabold text-slate-800 font-mono mt-0.5">
                &lt; 4h 00m
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase text-slate-400">
                Escalation Threshold
              </div>
              <div className="text-lg font-extrabold text-red-600 font-mono mt-0.5">
                &gt; 12h 00m
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 gap-2">
          <div className="truncate">
            <span className="text-slate-400 font-medium">Active Pathologist On-Shift: </span>
            <span className="font-semibold text-slate-700">Dr. N. Perera, Dr. S. Ramanathan</span>
          </div>
          <button
            type="button"
            onClick={triggerCsvDownload}
            className="inline-flex items-center space-x-1 font-semibold text-emerald-700 hover:text-emerald-900 transition self-start sm:self-auto cursor-pointer"
          >
            <span>Download SLA Telemetry</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Right Card: TRI Reference Strain Index */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-100 text-slate-600">
                <BookOpen className="h-3.5 w-3.5" />
              </div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                TRI Reference Strain Index
              </h3>
            </div>
            <span className="text-[10.5px] font-mono text-slate-400">TRI-LK // REV. 2026.4</span>
          </div>

          {/* Reference List */}
          <div className="mt-3 space-y-2">
            {TRI_REFERENCE_STRAINS.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg bg-slate-50/70 px-2.5 py-1.5 text-xs border border-slate-100"
              >
                <div className="truncate max-w-[210px]">
                  <span className="font-semibold text-slate-800">{item.strain}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    Active Rx: {item.rx}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-3.5">
          <button
            type="button"
            onClick={onOpenStrainIndex}
            className="w-full inline-flex items-center justify-center space-x-2 rounded-lg border border-slate-200 bg-slate-50/80 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 active:scale-[0.99] transition cursor-pointer"
          >
            <BookOpen className="h-3.5 w-3.5 text-slate-500" />
            <span>Open Diagnostic Key Reference</span>
          </button>
        </div>
      </div>
    </div>
  );
};
