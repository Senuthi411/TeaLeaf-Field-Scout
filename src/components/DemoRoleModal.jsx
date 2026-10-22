import React from 'react';
import {
  X,
  UserCheck,
  ClipboardCheck,
  Microscope,
  TrendingUp,
  ArrowRight,
  Info,
} from 'lucide-react';
import { DEMO_ROLES } from '../data/expertDashboardData';

export const DemoRoleModal = ({ isOpen, onClose, onSelectRole }) => {
  if (!isOpen) return null;

  const roleIcons = {
    admin: UserCheck,
    supervisor: ClipboardCheck,
    expert: Microscope,
    reporting: TrendingUp,
  };

  const roleColors = {
    admin: 'bg-purple-50 text-purple-600 ring-purple-200/60',
    supervisor: 'bg-emerald-50 text-emerald-600 ring-emerald-200/60',
    expert: 'bg-amber-50 text-amber-600 ring-amber-200/60',
    reporting: 'bg-blue-50 text-blue-600 ring-blue-200/60',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white shadow-2xl border border-slate-200 p-8 my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Header with Logo */}
        <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6">
          <img src="/logo.png" alt="TeaLeaf" className="h-5 w-5 rounded-full object-contain" />
          <span>TeaLeaf Field Scout</span>
        </div>

        {/* Center Title matching Image 2 */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center space-x-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-[11px] font-medium text-blue-800">
            <Info className="h-3.5 w-3.5" />
            <span>Prototype Demo Only — Role selection does not represent real authentication.</span>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            DEMO-01 — Select Demo Role
          </h2>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Choose a persona to explore its dashboard, sidebar and modules. Use "Switch Demo Role" in any header to return here.
          </p>
        </div>

        {/* 4 Cards in a row matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEMO_ROLES.map((item) => {
            const Icon = roleIcons[item.id] || UserCheck;
            const colorClass = roleColors[item.id] || 'bg-slate-50 text-slate-600';
            const isExpert = item.id === 'expert';

            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-5 flex flex-col justify-between transition hover:shadow-md ${
                  isExpert
                    ? 'border-emerald-700 ring-2 ring-emerald-600/20 bg-white'
                    : 'border-slate-200/90 bg-white'
                }`}
              >
                <div>
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ring-1 ${colorClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-4">
                    {item.role}
                  </h3>

                  <div className="text-xs font-semibold text-slate-700 mt-0.5">
                    {item.name} <span className="text-slate-400 font-mono text-[11px]">• {item.code}</span>
                  </div>

                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100">
                  <div className="text-[10px] font-medium text-slate-400 mb-2">
                    Opens: {item.opens}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectRole(item);
                      onClose();
                    }}
                    className={`w-full inline-flex items-center justify-center space-x-1.5 rounded-xl py-2 px-3 text-xs font-semibold transition cursor-pointer ${
                      isExpert
                        ? 'bg-[#0d3826] text-white hover:bg-[#09281a] shadow-xs'
                        : 'bg-emerald-700 text-white hover:bg-emerald-800'
                    }`}
                  >
                    <span>Continue as {item.role}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-[10.5px] text-slate-400">
          Existing sign-in flows (with validation states) remain available as separate prototype starting points.
        </div>
      </div>
    </div>
  );
};
