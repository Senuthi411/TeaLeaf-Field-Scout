import React, { useState } from 'react';
import { Clock, X } from 'lucide-react';
import { snapshotMetadata } from '../data/mockData';

export default function AlertBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 mb-6 bg-[#ebf5ff] border border-[#bfdbfe] text-[#1e40af] rounded-xl text-xs sm:text-sm shadow-2xs transition-all">
      <div className="flex items-center gap-2.5">
        <Clock className="w-4 h-4 text-[#2563eb] shrink-0" />
        <span className="font-normal text-slate-800 leading-relaxed">
          {/* DUMMY DATA: Refresh alert message */}
          {snapshotMetadata.alertMessage}
        </span>
      </div>
      <button
        onClick={() => setIsDismissed(true)}
        className="text-slate-400 hover:text-slate-600 transition p-1 rounded-md hover:bg-blue-100/50 cursor-pointer"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
