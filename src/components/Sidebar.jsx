import React from 'react';
import {
  LayoutDashboard,
  Inbox,
  Clock,
  Pill,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export const Sidebar = ({ activeTab = 'Expert Queue', setActiveTab, awaitingCount = 18 }) => {
 
  const estateOperations = [
    { name: 'Dashboard', icon: LayoutDashboard },
  ];

  
  const agronomyIntelligence = [
    { name: 'Expert Queue', icon: Inbox, count: awaitingCount },
    { name: 'Disease Timeline', icon: Clock },
    { name: 'Rx Treatment', icon: Pill },
    { name: 'Knowledge Base', icon: BookOpen },
    { name: 'AI Assistant', icon: Sparkles },
  ];

  return (
    <aside className="w-56 shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between min-h-[calc(100vh-4rem)] select-none">
      <div className="p-3.5 space-y-6">
       
        <div>
          <h3 className="px-2.5 mb-2 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
            Estate Operations
          </h3>
          <nav className="space-y-0.5">
            {estateOperations.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveTab(item.name)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#0f4c3a] text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-200' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

       
        <div>
          <h3 className="px-2.5 mb-2 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
            Agronomy Intelligence
          </h3>
          <nav className="space-y-0.5">
            {agronomyIntelligence.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveTab(item.name)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#0f4c3a] text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-200' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-emerald-900 text-emerald-200 ring-1 ring-emerald-700/50'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      
      <div className="p-3 border-t border-slate-100">
        <div className="rounded-lg border border-slate-200/90 bg-slate-50/70 p-2.5">
          <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400">
            <span>Sensor Hub</span>
            <div className="flex items-center space-x-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] text-emerald-700 lowercase font-medium">live</span>
            </div>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 tracking-tight font-mono">
              DIV - 04 // BLK - 12B
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100"></span>
          </div>
        </div>
      </div>
    </aside>
  );
};
