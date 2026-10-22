import React, { useState } from 'react';
import { 
  ChevronRight, 
  ArrowLeftRight, 
  Search, 
  Bell, 
  ChevronDown, 
  Check, 
  X,
  ExternalLink
} from 'lucide-react';
import { snapshotMetadata, demoRoles, mockNotifications } from '../data/mockData';

export default function Header({ 
  currentBreadcrumb, 
  activeRole, 
  setActiveRole,
  searchTerm,
  setSearchTerm
}) {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-6 lg:px-8 bg-[#f8fafc] border-b border-slate-200/60 backdrop-blur-md">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center text-xs lg:text-sm">
        <span className="text-slate-500 font-normal hover:text-slate-700 cursor-pointer">
          Analytics
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-2" />
        <span className="font-semibold text-slate-900">
          {currentBreadcrumb}
        </span>
      </div>

      {/* Right: Actions, Search, Demo Badge, Notifications, User */}
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Switch Demo Role Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-full shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
            title="Switch demo preview persona"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Switch Demo Role</span>
          </button>

          {/* Role Dropdown */}
          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 text-xs">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Demo Role
              </div>
              {/* DUMMY DATA: Iterating through demo roles */}
              {demoRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    setActiveRole(role);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-50 transition ${
                    activeRole.id === role.id ? 'bg-emerald-50/70 text-emerald-900 font-semibold' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold">
                      {role.initials}
                    </div>
                    <div>
                      <p className="text-xs leading-none">{role.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{role.label}</p>
                    </div>
                  </div>
                  {activeRole.id === role.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search reports and filters"
            className="w-56 lg:w-68 pl-8.5 pr-4 py-1.5 text-xs text-slate-800 bg-[#f1f5f9] placeholder:text-slate-400 rounded-full border border-transparent focus:outline-hidden focus:border-slate-300 focus:bg-white transition-all shadow-2xs"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Demo Data Amber Pill Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#fef3c7] border border-[#fde68a] text-[#92400e] text-xs font-medium rounded-full shadow-2xs select-none">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] inline-block animate-pulse" />
          <span>{snapshotMetadata.environment}</span>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 text-xs">
              <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-slate-100">
                <span className="font-semibold text-slate-800">Notifications</span>
                <span className="text-[11px] text-emerald-600 font-medium cursor-pointer hover:underline">
                  Mark all as read
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {/* DUMMY DATA: Notifications List */}
                {mockNotifications.map((notif) => (
                  <div key={notif.id} className="p-3 hover:bg-slate-50 transition cursor-pointer">
                    <p className="font-medium text-slate-800">{notif.title}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5 line-clamp-2">{notif.message}</p>
                    <span className="text-[10px] text-slate-400 mt-1 inline-block">{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar & Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 pl-1.5 rounded-full hover:bg-slate-100/80 transition cursor-pointer select-none"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#dcfce7] text-[#166534] font-semibold text-xs shadow-2xs">
              {/* DUMMY DATA: User Initials */}
              {activeRole.initials}
            </div>
            <div className="hidden lg:flex flex-col text-left leading-none">
              {/* DUMMY DATA: User Display Name */}
              <span className="text-xs font-semibold text-slate-800">
                {activeRole.name}
              </span>
              {/* DUMMY DATA: User Role */}
              <span className="text-[10px] text-slate-500 mt-0.5">
                {activeRole.label}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
          </button>

          {/* User Settings Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="font-semibold text-slate-900">{activeRole.name}</p>
                <p className="text-[11px] text-slate-500">{activeRole.label}</p>
              </div>
              <div className="py-1">
                <button className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center justify-between">
                  <span>Scouting Preferences</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center justify-between">
                  <span>Audit Logs</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center justify-between">
                  <span>Help & Documentation</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
