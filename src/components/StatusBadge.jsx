import React from 'react';

/**
 * StatusBadge Component
 * 
 * Renders status badges matching the design specifications from the images:
 * - Submitted: Light blue pill with blue dot
 * - In review: Light purple pill with purple dot
 * - Flagged: Light red/rose pill with rose dot
 * - Correction requested: Light amber pill with amber dot
 * - Referred: Light lime/olive pill with lime dot
 * - Verified: Light green pill with green dot
 */
export default function StatusBadge({ status }) {
  const getBadgeConfig = (statusStr) => {
    switch (statusStr?.toLowerCase()) {
      case 'submitted':
        return {
          bg: 'bg-blue-50/80',
          text: 'text-blue-700',
          border: 'border-blue-200/80',
          dot: 'bg-blue-500',
          label: 'Submitted',
        };
      case 'in review':
      case 'in-review':
        return {
          bg: 'bg-purple-50/80',
          text: 'text-purple-700',
          border: 'border-purple-200/80',
          dot: 'bg-purple-500',
          label: 'In review',
        };
      case 'flagged':
        return {
          bg: 'bg-rose-50/80',
          text: 'text-rose-700',
          border: 'border-rose-200/80',
          dot: 'bg-rose-500',
          label: 'Flagged',
        };
      case 'correction requested':
      case 'correction-requested':
        return {
          bg: 'bg-amber-50/80',
          text: 'text-amber-800',
          border: 'border-amber-200/80',
          dot: 'bg-amber-500',
          label: 'Correction requested',
        };
      case 'referred':
        return {
          bg: 'bg-lime-50/90',
          text: 'text-lime-800',
          border: 'border-lime-200/80',
          dot: 'bg-lime-600',
          label: 'Referred',
        };
      case 'verified':
        return {
          bg: 'bg-emerald-50/80',
          text: 'text-emerald-700',
          border: 'border-emerald-200/80',
          dot: 'bg-emerald-500',
          label: 'Verified',
        };
      default:
        return {
          bg: 'bg-slate-50',
          text: 'text-slate-700',
          border: 'border-slate-200',
          dot: 'bg-slate-400',
          label: statusStr || 'Unknown',
        };
    }
  };

  const config = getBadgeConfig(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border} whitespace-nowrap`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
