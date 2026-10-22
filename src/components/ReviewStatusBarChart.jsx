import React, { useState } from 'react';
import { reviewStatusBreakdown } from '../data/mockData';

export default function ReviewStatusBarChart() {
  const [hoveredStatus, setHoveredStatus] = useState(null);

  // DUMMY DATA: Total observations count used as benchmark denominator
  const totalObservations = 33;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 lg:p-6 shadow-2xs flex flex-col justify-between h-full">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold text-slate-900 tracking-tight">
          Observations by review status
        </h2>
      </div>

      {/* Status Progress Bars List */}
      <div className="flex flex-col justify-between space-y-4 my-auto">
        {/* DUMMY DATA: Mapping through all 6 review pipeline statuses */}
        {reviewStatusBreakdown.map((item) => {
          // Calculate proportional percentage for progress bar width
          const percentage = ((item.count / totalObservations) * 100).toFixed(1);
          const isHovered = hoveredStatus === item.id;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredStatus(item.id)}
              onMouseLeave={() => setHoveredStatus(null)}
              className="group flex items-center gap-4 py-1 cursor-pointer transition-colors"
              title={`${item.status}: ${item.count} observations (${percentage}% of total 33)`}
            >
              {/* Status Name Label */}
              <div className="w-36 sm:w-44 shrink-0">
                <span className={`text-xs transition-colors duration-150 ${
                  isHovered ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'
                }`}>
                  {/* DUMMY DATA: Status string label */}
                  {item.status}
                </span>
              </div>

              {/* Progress Bar Container / Track */}
              <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden relative">
                {/* Colored Fill Bar */}
                <div
                  className="h-full rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>

              {/* Numeric Value Count */}
              <div className="w-6 text-right shrink-0">
                <span className="text-xs font-semibold text-slate-800">
                  {/* DUMMY DATA: Review status count */}
                  {item.count}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom helper text */}
      <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] text-slate-400">
        <span>Sum of all status categories: 33 items</span>
        <span className="text-emerald-700 font-medium">100% reconciled</span>
      </div>
    </div>
  );
}
