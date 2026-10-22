import React, { useState } from 'react';
import {
  LayoutDashboard,
  Inbox,
  PenSquare,
  Send,
  ShieldAlert,
  History,
  Image as ImageIcon,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { NAVIGATION_LINKS, CURRENT_USER } from '../data/dummyData';

/**
 * Sidebar Component
 * Matches the deep forest green sidebar in the design screenshots.
 * Allows switching between Dashboard and Review Queue, with collapse/expand toggle.
 */
export default function Sidebar({ activePage, setActivePage, isCollapsed, setIsCollapsed }) {
  const getIcon = (iconName) => {
    const props = { className: "w-4 h-4 shrink-0" };
    switch (iconName) {
      case 'home':
        return <LayoutDashboard {...props} />;
      case 'inbox':
        return <Inbox {...props} />;
      case 'pencil':
        return <PenSquare {...props} />;
      case 'send':
        return <Send {...props} />;
      case 'shieldAlert':
        return <ShieldAlert {...props} />;
      case 'history':
        return <History {...props} />;
      case 'image':
        return <ImageIcon {...props} />;
      case 'clipboardList':
        return <ClipboardList {...props} />;
      default:
        return <Inbox {...props} />;
    }
  };

  return (
    <aside
      className={`relative flex flex-col justify-between transition-all duration-300 ease-in-out z-30 select-none
        ${isCollapsed ? 'w-20' : 'w-64'} 
        bg-[#0e2a1b] text-white min-h-screen border-r border-emerald-950/40`}
    >
      {/* Collapse/Expand Toggle Button on the Right Edge */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-white text-slate-700 hover:text-emerald-900 
                   border border-slate-200 shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-110 z-40"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Top Section: Brand + Menu */}
      <div className="p-4 pt-6">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => setActivePage('dashboard')}
          className="flex items-center gap-3 cursor-pointer group px-2 mb-8"
        >
          {/* Leaf Icon Emblem */}
          <div className="w-10 h-10 rounded-2xl bg-[#1d462c] border border-emerald-600/30 flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-105 transition-transform shrink-0">
            <svg
              className="w-5 h-5 text-emerald-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </div>

          {!isCollapsed && (
            <div className="overflow-hidden transition-opacity duration-200">
              <h1 className="text-base font-bold tracking-tight text-white leading-none">
                TeaLeaf
              </h1>
              <p className="text-xs font-normal text-emerald-300/80 mt-1">
                Field Scout
              </p>
            </div>
          )}
        </div>

        {/* Section Header: MENU */}
        <div className="mb-3 px-3">
          {!isCollapsed ? (
            <span className="text-[11px] font-semibold tracking-wider text-emerald-300/60 uppercase">
              Menu
            </span>
          ) : (
            <div className="w-6 h-0.5 bg-emerald-800/40 mx-auto rounded" />
          )}
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {NAVIGATION_LINKS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer
                  ${
                    isActive
                      ? 'bg-[#1e482d] text-white shadow-xs font-semibold'
                      : 'text-emerald-100/70 hover:bg-white/5 hover:text-white'
                  }
                  ${isCollapsed ? 'justify-center' : 'justify-start'}
                `}
              >
                <div className={`${isActive ? 'text-emerald-300' : 'text-emerald-300/70'}`}>
                  {getIcon(item.icon)}
                </div>

                {!isCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Supervisor Profile & Disclaimer */}
      <div className="p-4 pb-6">
        {!isCollapsed ? (
          <>
            {/* User Profile Card */}
            <div className="bg-[#153823] border border-emerald-800/40 rounded-2xl p-3 flex items-center gap-3 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-[#dcfce7] text-[#14532d] font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                {CURRENT_USER.initials}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate leading-tight">
                  {CURRENT_USER.name}
                </p>
                <p className="text-[11px] text-emerald-300/75 truncate mt-0.5">
                  {CURRENT_USER.role}
                </p>
              </div>
            </div>

            {/* UI Disclaimer Note */}
            <p className="text-[10px] text-emerald-400/50 text-center mt-3 font-normal select-none">
              Demonstration data · UI design only
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div
              title={`${CURRENT_USER.name} (${CURRENT_USER.role})`}
              className="w-9 h-9 rounded-full bg-[#dcfce7] text-[#14532d] font-bold text-xs flex items-center justify-center cursor-pointer shadow-xs"
            >
              {CURRENT_USER.initials}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
