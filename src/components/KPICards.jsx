import React from 'react';
import { ClipboardList, Flame, Clock, ShieldCheck } from 'lucide-react';

export const KPICards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {/* 1. Awaiting Diagnosis */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
            Awaiting Diagnosis
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <ClipboardList className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            {stats?.awaiting || '18'}
          </span>
          <span className="text-xs font-medium text-slate-400">
            +4 since 06:00
          </span>
        </div>
      </div>

      {/* 2. Critical Escalations */}
      <div className="rounded-xl border border-red-200/80 bg-red-50/20 p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-wider uppercase text-red-700">
            Critical Escalations
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-red-600">
            <Flame className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline space-x-2.5">
          <span className="text-3xl font-extrabold tracking-tight text-red-600">
            {stats?.critical || '04'}
          </span>
          <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[10.5px] font-semibold text-red-700">
            Immediate quarantine
          </span>
        </div>
      </div>

      {/* 3. High-Priority SLA */}
      <div className="rounded-xl border border-amber-200/80 bg-amber-50/20 p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-wider uppercase text-amber-800">
            High-Priority SLA
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
            <Clock className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline space-x-2.5">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            {stats?.sla || '12'}
          </span>
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10.5px] font-semibold text-amber-800">
            &lt; 2h buffer
          </span>
        </div>
      </div>

      {/* 4. Verified Today */}
      <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/20 p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-800">
            Verified Today
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <ShieldCheck className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline space-x-2.5">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            {stats?.verified || '09'}
          </span>
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-800">
            98.4% accuracy
          </span>
        </div>
      </div>
    </div>
  );
};
