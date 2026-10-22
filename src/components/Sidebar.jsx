import React from 'react';
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  BarChart2, 
  PieChart, 
  TrendingUp, 
  Clock, 
  Filter, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  Leaf
} from 'lucide-react';
import { currentUser, snapshotMetadata } from '../data/mockData';

// Map icon string names from mockData to actual Lucide components
const iconMap = {
  Home,
  BookOpen,
  BarChart3,
  BarChart2,
  PieChart,
  TrendingUp,
  Clock,
  Filter,
  RefreshCw
};

export default function Sidebar({ 
  navigationItems, 
  activePage, 
  setActivePage, 
  isCollapsed, 
  setIsCollapsed 
}) {
  return (
    <aside 
      className={`relative flex flex-col justify-between shrink-0 bg-[#0c321d] text-white transition-all duration-300 ease-in-out z-30 select-none ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
      style={{ minHeight: '100vh' }}
    >
      {/* Sidebar Edge Collapse Toggle Button (Exact replica of the pill button shown on the border) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3.5 top-6 z-40 flex items-center justify-center w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-600 shadow-md hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer"
        aria-label="Toggle navigation menu"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Top Branding and Navigation Section */}
      <div className="flex flex-col pt-6 px-4">
        {/* Brand Logo & Title */}
        <div className={`flex items-center gap-3 pb-6 px-1 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#dcfce7] text-[#0f3823] shadow-xs shrink-0">
            <Leaf className="w-5 h-5 fill-[#15803d] text-[#15803d]" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-lg font-bold tracking-tight text-white leading-tight">
                TeaLeaf
              </span>
              <span className="text-xs text-emerald-300 font-normal tracking-wide">
                Field Scout
              </span>
            </div>
          )}
        </div>

        {/* Section Header: ANALYTICS */}
        <div className="mt-2 mb-2 px-2">
          {!isCollapsed ? (
            <span className="text-[11px] font-semibold tracking-wider text-emerald-400/80 uppercase">
              Analytics
            </span>
          ) : (
            <div className="w-6 h-0.5 bg-emerald-700/50 mx-auto rounded" />
          )}
        </div>

        {/* Navigation List */}
        <nav className="flex flex-col gap-1 mt-1">
          {navigationItems.map((item) => {
            const IconComponent = iconMap[item.icon] || BarChart2;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`group flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#18462b] text-white shadow-xs font-semibold'
                    : 'text-emerald-100/75 hover:bg-white/6 hover:text-white'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
              >
                <IconComponent 
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? 'text-white' : 'text-emerald-200/80'
                  }`} 
                />
                {!isCollapsed && (
                  <span className="truncate tracking-tight">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile and Legal Disclaimer */}
      <div className="flex flex-col p-4 pt-2">
        {/* User Profile Card */}
        <div 
          className={`flex items-center gap-3 p-2.5 rounded-xl bg-[#143e26] border border-emerald-800/40 shadow-xs ${
            isCollapsed ? 'justify-center p-2' : ''
          }`}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#cbf5dc] text-[#0d3922] font-semibold text-xs shrink-0">
            {/* DUMMY DATA: User Initials */}
            {currentUser.initials}
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              {/* DUMMY DATA: User Full Name */}
              <span className="text-xs font-medium text-white truncate">
                {currentUser.name}
              </span>
              {/* DUMMY DATA: User Role */}
              <span className="text-[11px] text-emerald-300/80 truncate">
                {currentUser.role}
              </span>
            </div>
          )}
        </div>

        {/* Demonstration Disclaimer */}
        {!isCollapsed && (
          <p className="text-[11px] text-emerald-200/40 mt-3 px-1 text-left select-none tracking-tight">
            {/* DUMMY DATA: UI Mockup Disclaimer */}
            {snapshotMetadata.disclaimer}
          </p>
        )}
      </div>
    </aside>
  );
}
