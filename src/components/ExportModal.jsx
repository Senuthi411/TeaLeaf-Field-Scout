import React, { useState } from 'react';
import { X, FileSpreadsheet, FileText, CheckCircle2 } from 'lucide-react';
import { snapshotMetadata } from '../data/mockData';

export default function ExportModal({ isOpen, onClose, currentReportTitle }) {
  const [exportFormat, setExportFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Export Analytics Data</h3>
            <p className="text-xs text-slate-500 mt-0.5">{currentReportTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 space-y-4 text-xs">
          <p className="text-slate-600">
            Export the current filtered snapshot ({snapshotMetadata.lastUpdated}) in your preferred format.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* CSV Option */}
            <button
              type="button"
              onClick={() => setExportFormat('csv')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition ${
                exportFormat === 'csv'
                  ? 'border-emerald-600 bg-emerald-50/60 text-emerald-950 font-medium'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <FileSpreadsheet className={`w-6 h-6 ${exportFormat === 'csv' ? 'text-emerald-700' : 'text-slate-500'}`} />
              <span className="font-semibold text-xs">CSV Data Sheet</span>
              <span className="text-[10px] text-slate-500">Raw rows with all 33 observations</span>
            </button>

            {/* PDF Option */}
            <button
              type="button"
              onClick={() => setExportFormat('pdf')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition ${
                exportFormat === 'pdf'
                  ? 'border-emerald-600 bg-emerald-50/60 text-emerald-950 font-medium'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <FileText className={`w-6 h-6 ${exportFormat === 'pdf' ? 'text-emerald-700' : 'text-slate-500'}`} />
              <span className="font-semibold text-xs">PDF Summary</span>
              <span className="text-[10px] text-slate-500">Visual chart summary with KPI blocks</span>
            </button>
          </div>

          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Export generated successfully. Download started!</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 rounded-lg shadow-xs cursor-pointer flex items-center gap-2"
          >
            {isExporting ? 'Generating...' : `Export ${exportFormat.toUpperCase()}`}
          </button>
        </div>
      </div>
    </div>
  );
}
