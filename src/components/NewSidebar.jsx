import React from 'react';
import {
  LayoutDashboard,
  Inbox,
  BookOpen,
  History,
  LogOut,
} from 'lucide-react';

export const NewSidebar = ({ activeTab, setActiveTab, onSignOut }) => {
  const menuItems = [
    { id: 'Expert Dashboard', label: 'Expert Dashboard', icon: LayoutDashboard },
    { id: 'Assigned Cases', label: 'Assigned Cases', icon: Inbox, count: 5 },
    { id: 'Disease Catalog', label: 'Disease Catalog', icon: BookOpen },
    { id: 'Case History', label: 'Case History', icon: History },
  ];

  return (
    <aside className="w-60 shrink-0 bg-[#0d3826] text-white flex flex-col justify-between min-h-[calc(100vh)] select-none">
      {/* Top Branding & Navigation */}
      <div>
        {/* Brand Header with Uploaded Logo */}
        <div className="flex items-center space-x-3 px-5 py-5 border-b border-emerald-900/60">
          <img
            src="/logo.png"
            alt="TeaLeaf Logo"
            className="h-9 w-9 rounded-full object-contain shadow-xs shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-white leading-tight">
              TeaLeaf
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-emerald-300 uppercase">
              Field Scout
            </span>
          </div>
        </div>

        {/* Menu Navigation */}
        <div className="p-3.5 space-y-4">
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-emerald-300/60">
            Menu
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1b4e38] text-white font-semibold shadow-xs border border-emerald-600/30'
                      : 'text-emerald-100/80 hover:bg-emerald-900/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-300' : 'text-emerald-400/70'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-emerald-700/80 text-emerald-100'
                          : 'bg-emerald-900/70 text-emerald-300'
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

      {/* Bottom User Profile Section */}
      <div className="p-4 border-t border-emerald-900/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white ring-2 ring-emerald-500/40">
              TW
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white leading-tight">
                Dr Tara Wijesinghe
              </span>
              <span className="text-[10px] text-emerald-300 font-medium">
                Disease expert
              </span>
            </div>
          </div>
          {onSignOut && (
            <button
              type="button"
              onClick={onSignOut}
              title="Sign Out"
              className="rounded-lg p-1 text-emerald-400/70 hover:bg-emerald-900/60 hover:text-white transition cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-2 text-[9.5px] text-emerald-400/50 leading-tight">
          Demonstration data - UI design only
        </div>
      </div>
    </aside>
  );
};
