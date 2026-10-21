import React from 'react';
import {
  LayoutDashboard,
  Clock,
  Pill,
  BookOpen,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';

const PAGE_CONFIGS = {
  Dashboard: {
    title: 'Estate Operations Dashboard',
    section: 'Estate Operations',
    icon: LayoutDashboard,
    badge: 'Overview',
    description: 'High-level aggregation of plantation health indexes, daily scouting missions, and meteorological telemetry across all highland divisions.',
  },
  'Disease Timeline': {
    title: 'Pathological Disease Timeline',
    section: 'Agronomy Intelligence',
    icon: Clock,
    badge: 'Historical Trend',
    description: 'Chronological progression analysis of Blister Blight, Grey Blight, and Canker spread patterns correlated with precipitation and humidity cycles.',
  },
  'Rx Treatment': {
    title: 'Rx Fungicide & Chemical Treatment Log',
    section: 'Agronomy Intelligence',
    icon: Pill,
    badge: 'Prescriptions',
    description: 'Registry of issued chemical interventions, drone spray orders, inventory burn rates of Copper-Oxy and Carbendazim, and waiting intervals before plucking.',
  },
  'Knowledge Base': {
    title: 'TRI Agronomic Knowledge Base & Field Protocols',
    section: 'Agronomy Intelligence',
    icon: BookOpen,
    badge: 'Reference Docs',
    description: 'Official Tea Research Institute of Sri Lanka (TRI) circulars, diagnostic keys, pesticide safety manuals, and climatic vulnerability charts.',
  },
  'AI Assistant': {
    title: 'Agronomist Copilot & Pathological AI Assistant',
    section: 'Agronomy Intelligence',
    icon: Sparkles,
    badge: 'Neural Copilot',
    description: 'Autonomous disease diagnostic query assistant powered by multi-spectral leaf vision models calibrated for Ceylon tea clones.',
  },
};

export const OtherPageView = ({ pageName, onReturnToQueue }) => {
  const config = PAGE_CONFIGS[pageName] || {
    title: pageName,
    section: 'Agronomy Intelligence',
    icon: Layers,
    badge: 'Page View',
    description: 'Module linked from navigation.',
  };

  const Icon = config.icon;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2 text-xs font-medium text-slate-500">
          <span className="text-slate-400">{config.section}</span>
          <span>/</span>
          <span className="font-bold text-slate-800">{pageName}</span>
        </div>

        <button
          type="button"
          onClick={onReturnToQueue}
          className="inline-flex items-center space-x-2 rounded-lg bg-[#0f4c3a] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0c3c2e] active:scale-[0.98] transition cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Expert Review Queue</span>
        </button>
      </div>

     
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
        <div className="flex items-start space-x-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200">
            <Icon className="h-6 w-6" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                {config.badge}
              </span>
              <span className="text-xs text-slate-400 font-mono">MODULE ID: {pageName.toUpperCase().replace(/\s+/g, '_')}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{config.title}</h1>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">{config.description}</p>
          </div>
        </div>
      </div>

     
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center space-y-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-200/70 text-slate-600">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800">
            {pageName} Module Connected
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
            This tab link is fully routed. For tomorrow's evaluation, the primary live screen under assessment is the <strong className="text-emerald-800 font-semibold">Expert Review Queue (Screen 6.1)</strong>.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onReturnToQueue}
            className="inline-flex items-center space-x-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-slate-500" />
            <span>Switch Back to Expert Review Queue</span>
          </button>
        </div>
      </div>
    </div>
  );
};
