import React, { useState } from 'react';
import { Search, Bell, Users, ChevronDown, Check, X, Shield, LogOut } from 'lucide-react';

export const NewHeader = ({
  breadcrumb = ['Cases', 'Expert Dashboard'],
  searchQuery,
  setSearchQuery,
  onOpenDemoRole,
  onSignOut,
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New case referred',
      desc: 'Supervisor Malini Fernando referred CASE-023 (East Hills).',
      time: '10m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Diagnosis confirmed',
      desc: 'DIAG-042 (Grey blight) archived to Estate Registry.',
      time: '1h ago',
      unread: false,
    },
    {
      id: 3,
      title: 'Lab PCR pending',
      desc: 'Sample OBS-011 awaiting spore viability assay.',
      time: '3h ago',
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-6 backdrop-blur-md">
      {/* Left: Breadcrumbs matching Image 4 */}
      <div className="flex items-center space-x-2 text-xs font-medium text-slate-500">
        {breadcrumb.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <span className="text-slate-300">&gt;</span>}
            <span
              className={
                idx === breadcrumb.length - 1
                  ? 'font-bold text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }
            >
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Right: Switch Demo Role, Search, Demo Data pill, Bell, User Profile */}
      <div className="flex items-center space-x-3.5">
        {/* Switch Demo Role Button */}
        <button
          type="button"
          onClick={onOpenDemoRole}
          className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition cursor-pointer"
        >
          <Users className="h-3.5 w-3.5 text-slate-500" />
          <span>Switch Demo Role</span>
        </button>

        {/* Global Search */}
        <div className="relative w-64 lg:w-72">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-3.5 w-3.5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cases, observations, diseases"
            className="w-full rounded-lg border border-slate-200 bg-slate-50/70 py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Demo Data Badge */}
        <div className="hidden sm:flex items-center space-x-1.5 rounded-full border border-amber-200 bg-amber-50/80 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
          <span>Demo data</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-3.5 py-2.5">
                <span className="text-xs font-bold text-slate-800">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
                    }
                    className="text-[10px] font-semibold text-emerald-800 hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 text-xs hover:bg-slate-50 transition">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-slate-800">{n.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile matching Image 4 */}
        <div className="relative border-l border-slate-200 pl-3">
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2.5 cursor-pointer text-left focus:outline-none"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white ring-2 ring-emerald-600/20">
              TW
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-bold text-slate-800 leading-tight">
                Dr Tara Wijesinghe
              </span>
              <span className="text-[10px] text-slate-500 leading-tight">
                Disease expert
              </span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden md:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 text-xs animate-in fade-in slide-in-from-top-1">
              <div className="border-b border-slate-100 pb-2">
                <div className="font-bold text-slate-900">Dr Tara Wijesinghe</div>
                <div className="text-[11px] text-emerald-700 font-medium">Head of Plant Pathology</div>
                <div className="text-[10px] font-mono text-slate-400">ID: USR-005 • Scope: EST-001, EST-002</div>
              </div>
              <div className="mt-2.5 space-y-1.5 text-[11px] text-slate-600">
                <div className="flex justify-between"><span>Active Role:</span> <strong className="text-slate-800">Disease Expert</strong></div>
                <div className="flex justify-between"><span>Assigned Estates:</span> <strong className="text-slate-800">Riverbend, Highland</strong></div>
              </div>
              <div className="mt-3 border-t border-slate-100 pt-2 space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    onOpenDemoRole();
                  }}
                  className="flex w-full items-center space-x-2 rounded-lg px-2.5 py-1.5 text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                >
                  <Users className="h-3.5 w-3.5 text-slate-500" />
                  <span>Switch Demo Role</span>
                </button>
                {onSignOut && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      onSignOut();
                    }}
                    className="flex w-full items-center space-x-2 rounded-lg px-2.5 py-1.5 text-red-600 hover:bg-red-50 transition cursor-pointer font-medium"
                  >
                    <LogOut className="h-3.5 w-3.5 text-red-500" />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
