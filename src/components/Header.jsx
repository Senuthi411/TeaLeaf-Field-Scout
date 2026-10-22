import React, { useState } from 'react';
import {
  ArrowLeftRight,
  Search,
  Bell,
  ChevronDown,
  Check,
  User,
  Shield,
  LogOut,
  X
} from 'lucide-react';
import { CURRENT_USER } from '../data/dummyData';

/**
 * Header Component
 * Matches the top bar across both Dashboard and Review Queue pages.
 */
export default function Header({
  activePage,
  setActivePage,
  globalSearchQuery,
  setGlobalSearchQuery,
  onOpenNotifications,
  currentRole,
  setCurrentRole
}) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const roles = [
    { id: 'supervisor', name: 'Supervisor (Malini Fernando)', desc: 'Review & verify estate observations' },
    { id: 'fieldworker', name: 'Field Worker (Hiruni Nadeesha)', desc: 'Capture specimens & submit observations' },
    { id: 'agronomist', name: 'Estate Agronomist / Expert', desc: 'Process expert referrals & advise treatments' },
  ];

  const handleRoleSelect = (role) => {
    setCurrentRole(role.id);
    setShowRoleDropdown(false);
  };

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard':
        return 'Supervisor Dashboard';
      case 'review-queue':
        return 'Review Queue';
      case 'correction-queue':
        return 'Correction Queue';
      case 'expert-referrals':
        return 'Expert Referrals';
      case 'quarantine-queue':
        return 'Quarantine Queue';
      case 'decision-history':
        return 'Decision History';
      case 'evidence-viewer':
        return 'Evidence Viewer';
      case 'fieldwork-assignments':
        return 'Fieldwork Assignments';
      default:
        return 'Supervisor Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200/90 px-6 py-3.5 flex items-center justify-between gap-4 select-none">
      {/* Left: Breadcrumbs navigation */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setActivePage('dashboard')}
          className="text-slate-500 hover:text-slate-800 transition-colors font-medium cursor-pointer"
        >
          Review
        </button>
        <span className="text-slate-400">›</span>
        <span className="text-slate-900 font-semibold">
          {getPageTitle()}
        </span>
      </div>

      {/* Right: Controls & User Profile */}
      <div className="flex items-center gap-3">
        {/* Switch Demo Role Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-slate-600" />
            <span>Switch Demo Role</span>
          </button>

          {/* Role selection dropdown */}
          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 border-b border-slate-100">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Available Demo Roles
                </p>
              </div>
              <div className="p-1 space-y-1">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleRoleSelect(r)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-start justify-between cursor-pointer
                      ${currentRole === r.id ? 'bg-emerald-50 text-emerald-950 font-medium' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    <div>
                      <p className="font-semibold">{r.name}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{r.desc}</p>
                    </div>
                    {currentRole === r.id && (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Global Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            placeholder="Search observations, cases, users"
            className="w-64 pl-9 pr-3.5 py-1.5 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-xl border border-transparent focus:border-emerald-500 focus:outline-none transition-all"
          />
          {globalSearchQuery && (
            <button
              onClick={() => setGlobalSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Demo Data Tag Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50/80 border border-amber-200/70 text-amber-800 text-[11px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>Demo data</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationToast(!showNotificationToast)}
            className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            {/* Red alert unread dot */}
            <span className="absolute 1 top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {showNotificationToast && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-800">Notifications</p>
                <span className="text-[11px] text-emerald-700 font-medium cursor-pointer hover:underline">
                  Mark all as read
                </span>
              </div>
              <div className="py-2 space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                  <p className="font-semibold text-slate-800">COR-005 Resubmitted</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Hiruni uploaded underside macro photo for OBS-005</p>
                  <span className="text-[10px] text-slate-400">12 mins ago</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="font-semibold text-slate-800">New batch ingested</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">3 fresh captures from Riverbank (DIV-004)</p>
                  <span className="text-[10px] text-slate-400">1 hour ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown Pill */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#dcfce7] text-[#15803d] font-bold text-xs flex items-center justify-center shrink-0">
              {CURRENT_USER.initials}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-slate-800 leading-tight">
                {CURRENT_USER.name}
              </p>
              <p className="text-[11px] text-slate-500 leading-tight">
                {CURRENT_USER.role}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-900">{CURRENT_USER.name}</p>
                <p className="text-[11px] text-slate-500">{CURRENT_USER.estateName}</p>
              </div>
              <div className="p-1 text-xs text-slate-700">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Profile Settings</span>
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>Role Permissions</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
