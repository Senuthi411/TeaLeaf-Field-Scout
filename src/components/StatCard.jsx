import React from 'react';
import { Leaf, Check, Clock, FlaskConical, Flag } from 'lucide-react';

const iconMap = {
  leaf: Leaf,
  check: Check,
  clock: Clock,
  flask: FlaskConical,
  flag: Flag
};

export default function StatCard({ 
  label, 
  value, 
  subtext, 
  iconType, 
  iconBgColor, 
  iconColor,
  onClick
}) {
  const IconComponent = iconMap[iconType] || Leaf;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-200/80 p-5 lg:p-6 shadow-2xs hover:shadow-xs transition-shadow duration-200 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Header: Label & Icon */}
      <div className="flex items-start justify-between">
        <span className="text-xs font-normal text-slate-500 tracking-tight">
          {label}
        </span>
        <div className={`flex items-center justify-center w-8 h-8 rounded-xl ${iconBgColor} ${iconColor} shrink-0`}>
          <IconComponent className="w-4 h-4" />
        </div>
      </div>

      {/* Main KPI Value */}
      <div className="mt-2.5">
        <span className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
          {value}
        </span>
      </div>

      {/* Subtext Footer */}
      <div className="mt-2 text-xs text-slate-500 font-normal">
        {subtext}
      </div>
    </div>
  );
}
