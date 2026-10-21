import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronDown, Bell, Leaf, Radio, Check, X, Shield, Clock } from 'lucide-react';

export const Header = ({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  onShowToast,
}) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMeshDetailsOpen, setIsMeshDetailsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Blister Blight Alert',
      desc: 'Critical sporulation detected in BLK-A2 (Division 01).',
      time: '12m ago',
      unread: true,
      critical: true,
    },
    {
      id: 2,
      title: 'Mesh Node #03 Reconnected',
      desc: 'Pedro highlands repeater restored to full bandwidth.',
      time: '45m ago',
      unread: true,
      critical: false,
    },
    {
      id: 3,
      title: 'Drone Spray Completed',
      desc: 'Division 02 copper-oxy preventative cycle logged.',
      time: '2h ago',
      unread: false,
      critical: false,
    },
  ]);

  const locationOptions = [
    'Nuwara Eliya Highlands (DIV 01-06)',
    'Pedro Estate Central (DIV 01-03)',
    'Dimbula Valley Western (DIV 07-12)',
    'Uva Basin Eastern (DIV 13-18)',
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    if (onShowToast) onShowToast('All notifications marked as read.');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur-md">
      {/* Left: Branding & Location Selector */}
      <div className="flex items-center space-x-6">
        {/* Brand Logo */}
        <div className="flex items-center space-x-2.5 select-none">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-800 text-white shadow-sm ring-1 ring-emerald-900/10">
            <Leaf className="h-5 w-5 fill-emerald-100 text-emerald-100" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-slate-900 leading-tight">
              TeaLeaf
            </span>
            <span className="text-[9.5px] font-bold tracking-wider text-emerald-800 uppercase">
              Field Scout OS
            </span>
          </div>
        </div>

        {/* Location Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLocationOpen(!isLocationOpen)}
            className="group hidden items-center space-x-2 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-emerald-600/30 hover:bg-white md:flex transition-all cursor-pointer"
          >
            <MapPin className="h-3.5 w-3.5 text-emerald-700" />
            <span className="text-slate-800 font-semibold">{selectedLocation}</span>
            <ChevronDown className={`h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLocationOpen && (
            <div className="absolute left-0 mt-1.5 w-72 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-1">
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Select Estate Division
              </div>
              {locationOptions.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => {
                    setSelectedLocation(loc);
                    setIsLocationOpen(false);
                    if (onShowToast) onShowToast(`Switched active division to ${loc}`);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition cursor-pointer ${
                    selectedLocation === loc
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{loc}</span>
                  {selectedLocation === loc && <Check className="h-3.5 w-3.5 text-emerald-700" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Middle: Global Search */}
      <div className="flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search diseases, blocks or leaf samples..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50/60 py-1.5 pl-9 pr-8 text-xs text-slate-800 placeholder-slate-400 transition-all focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/10"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right: Estate Mesh Badge, Notifications & Profile */}
      <div className="flex items-center space-x-3.5">
        {/* Estate Mesh Indicator (Clickable for telemetry details) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMeshDetailsOpen(!isMeshDetailsOpen)}
            className="hidden sm:flex items-center space-x-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100/70 transition cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600"></span>
            </span>
            <span className="tracking-wide">ESTATE MESH ONLINE</span>
          </button>

          {isMeshDetailsOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 text-xs">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>Estate LoRa Mesh Status</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-mono">100% ONLINE</span>
              </div>
              <div className="mt-2 space-y-1.5 text-[11px] text-slate-600 border-t border-slate-100 pt-2">
                <div className="flex justify-between"><span>Active Repeaters:</span> <strong className="text-slate-800">6 / 6 nodes</strong></div>
                <div className="flex justify-between"><span>Mesh Latency:</span> <strong className="text-slate-800 font-mono">14 ms</strong></div>
                <div className="flex justify-between"><span>Connected Handhelds:</span> <strong className="text-slate-800 font-mono">24 Scouts</strong></div>
                <div className="flex justify-between"><span>Subnet Protocol:</span> <strong className="text-slate-800 font-mono">LoRaWAN 868MHz</strong></div>
              </div>
              <button
                type="button"
                onClick={() => setIsMeshDetailsOpen(false)}
                className="mt-2.5 w-full rounded-md bg-slate-100 py-1 text-center text-[10px] font-semibold text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            aria-label="Notifications"
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-3.5 py-2.5">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-slate-800">Field Notifications</span>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-red-100 px-1.5 py-0.2 text-[10px] font-bold text-red-700">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-[10px] font-semibold text-emerald-800 hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 text-xs transition ${n.unread ? 'bg-emerald-50/20' : 'bg-white hover:bg-slate-50'}`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className={`font-semibold ${n.critical ? 'text-red-700' : 'text-slate-900'}`}>
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">{n.time}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-500 leading-normal">{n.desc}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 bg-slate-50/50 p-2 text-center">
                <button
                  type="button"
                  onClick={() => setIsNotificationsOpen(false)}
                  className="text-[11px] font-medium text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative border-l border-slate-200 pl-3">
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2.5 cursor-pointer text-left focus:outline-none"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
                alt="Dr. N. Perera"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-emerald-700/20"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <div
                style={{ display: 'none' }}
                className="h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-xs font-semibold text-white"
              >
                NP
              </div>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-white"></span>
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-bold text-slate-800 leading-tight">Dr. N. Perera</span>
              <span className="text-[10px] font-medium text-emerald-700/90 leading-tight">
                Senior Agronomist
              </span>
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400 hidden md:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-60 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 text-xs">
              <div className="border-b border-slate-100 pb-2">
                <div className="font-bold text-slate-900">Dr. Nimal Perera</div>
                <div className="text-[11px] text-emerald-700 font-medium">Head of Plant Pathology</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">TRI Lic. #LK-PATH-4921</div>
              </div>
              <div className="mt-2 space-y-1 text-[11px] text-slate-600">
                <div className="flex justify-between"><span>Station:</span> <strong className="text-slate-800">Pedro Central Lab</strong></div>
                <div className="flex justify-between"><span>Shift Status:</span> <strong className="text-emerald-700 font-semibold">On-Duty (Triage)</strong></div>
                <div className="flex justify-between"><span>Cases Verified:</span> <strong className="text-slate-800">142 this week</strong></div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  if (onShowToast) onShowToast('Profile preferences synchronized.');
                }}
                className="mt-3 w-full rounded-md bg-emerald-50 py-1.5 text-center text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100 transition"
              >
                Sync Agronomist Credentials
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
