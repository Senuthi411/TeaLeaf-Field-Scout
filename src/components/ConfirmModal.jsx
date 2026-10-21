import React from 'react';
import { CheckCheck, X } from 'lucide-react';

export const ConfirmModal = ({
  isOpen,
  count = 5,
  onClose,
  onConfirm,
  isProcessing = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl border border-slate-200">
        {/* Header Badge from Figma */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            CONFIRM
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Content matching Figma text exactly */}
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900">
            Approve {count} selected?
          </h3>
          <p className="text-xs text-slate-500">
            All {count} diagnoses are approved.
          </p>
        </div>

        {/* Action Buttons matching Figma layout */}
        <div className="mt-5 flex items-center justify-end space-x-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className="inline-flex items-center space-x-1.5 rounded-lg bg-[#0f4c3a] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0c3c2e] active:scale-[0.98] transition disabled:opacity-70"
          >
            {isProcessing ? (
              <span>Approving...</span>
            ) : (
              <>
                <CheckCheck className="h-3.5 w-3.5 text-emerald-200" />
                <span>Approve all</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
