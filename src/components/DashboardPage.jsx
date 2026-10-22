import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Shield,
  MapPin,
  Layers,
  Smartphone,
  User,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  Bell,
  Download,
  Plus,
  ArrowLeftRight,
  Check,
  CircleDot,
  LogOut,
  X,
  ExternalLink
} from 'lucide-react';
import { TeaLeafIcon, TeaLeafBrand } from './TeaLeafLogo';
import {
  CURRENT_USER,
  DASHBOARD_METRICS,
  USERS_BY_ROLE,
  ESTATE_COVERAGE,
  RECENT_ACTIVITIES,
  USERS_REQUIRING_ATTENTION,
  AVAILABLE_ROLES
} from '../data/mockData';

/**
 * Administrator Dashboard Page
 * Faithfully replicates the layout, components, and styling of "3840x2160.png".
 * 
 * Props:
 * - onSignOut: Function called to navigate back to the Sign In page.
 */
export default function DashboardPage({ onSignOut }) {
  // Navigation & UI state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentRole, setCurrentRole] = useState(CURRENT_USER.role);
  
  // DUMMY DATA: Dynamic state for users requiring attention (allows adding via "+ Create user")
  const [attentionUsers, setAttentionUsers] = useState(USERS_REQUIRING_ATTENTION);

  // Form state for "+ Create user" dialog
  const [newUser, setNewUser] = useState({
    name: '',
    role: 'Field worker',
    scope: 'DIV-001',
  });

  // Handle creating a new dummy user
  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUser.name.trim()) return;

    // DUMMY DATA: Generate initials and dummy user object
    const initials = newUser.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const created = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: newUser.name,
      initials: initials || 'TU',
      avatarBg: 'bg-emerald-100 text-emerald-800',
      role: newUser.role,
      scope: newUser.scope,
      status: 'Active',
      statusType: 'success',
      lastDeviceSession: 'Just now',
    };

    setAttentionUsers([created, ...attentionUsers]);
    setNewUser({ name: '', role: 'Field worker', scope: 'DIV-001' });
    setShowCreateUserModal(false);
  };

  // Helper function to render metric icon based on string type
  const renderMetricIcon = (iconType) => {
    switch (iconType) {
      case 'users':
        return <Users className="w-5 h-5" />;
      case 'map-pin':
        return <MapPin className="w-5 h-5" />;
      case 'layers':
        return <Layers className="w-5 h-5" />;
      case 'smartphone':
        return <Smartphone className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  // Navigation menu items matching sidebar of 3840x2160.png
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'roles', label: 'Roles & Permissions', icon: Shield },
    { id: 'estates', label: 'Estates', icon: MapPin },
    { id: 'divisions', label: 'Divisions', icon: Layers },
    { id: 'sessions', label: 'Device Sessions', icon: Smartphone },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9f7] flex flex-col md:flex-row text-gray-800 antialiased selection:bg-emerald-200">
      {/* =========================================================================
          LEFT SIDEBAR (matching 3840x2160.png)
         ========================================================================= */}
      <aside
        className={`${
          sidebarCollapsed ? 'w-20' : 'w-72'
        } bg-[#0e2617] text-white flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out relative z-20 border-r border-[#1a4027] min-h-screen`}
      >
        {/* Top Header with Brand Logo & Toggle Arrow */}
        <div>
          <div className="h-20 flex items-center justify-between px-5 border-b border-[#183d24]/60">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#1c472d] text-[#4ade80] flex items-center justify-center shrink-0 shadow-sm border border-emerald-500/20">
                <TeaLeafIcon className="w-6 h-6" strokeWidth={2} />
              </div>
              {!sidebarCollapsed && (
                <div className="leading-tight">
                  <div className="text-white font-bold text-base tracking-tight">TeaLeaf</div>
                  <div className="text-[#4ade80] font-semibold text-xs tracking-tight">Field Scout</div>
                </div>
              )}
            </div>

            {/* Circular Collapse Toggle Button `<` */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-6 h-6 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-md hover:bg-gray-100 transition cursor-pointer shrink-0"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Section: MENU */}
          <div className="px-4 pt-6 pb-2">
            {!sidebarCollapsed && (
              <span className="text-[11px] font-bold tracking-wider text-emerald-400/50 uppercase px-3 block mb-2">
                MENU
              </span>
            )}

            <nav className="space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-[#1e4d30] text-white shadow-inner font-semibold'
                        : 'text-emerald-100/70 hover:text-white hover:bg-[#153821]'
                    }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <IconComponent className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-emerald-300/80'}`} />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Profile Information Card matching mockup */}
        <div className="p-4 border-t border-[#183d24]/60">
          <div className="bg-[#173a24] p-3 rounded-xl flex items-center justify-between border border-[#225032]/40">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#dcfce7] text-[#166534] font-bold text-xs flex items-center justify-center shrink-0">
                {CURRENT_USER.initials}
              </div>
              {!sidebarCollapsed && (
                <div className="leading-tight truncate">
                  <div className="text-white text-xs font-semibold truncate">
                    {CURRENT_USER.name}
                  </div>
                  <div className="text-emerald-300/70 text-[11px] truncate">
                    {currentRole}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Sign Out / Return to Login button */}
            {!sidebarCollapsed && (
              <button
                onClick={onSignOut}
                className="text-emerald-300/60 hover:text-white transition p-1 cursor-pointer"
                title="Sign Out / Back to Login"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>

          {!sidebarCollapsed && (
            <p className="text-[11px] text-emerald-400/40 text-center mt-3">
              Demonstration data · UI design only
            </p>
          )}
        </div>
      </aside>

      {/* =========================================================================
          MAIN CONTENT AREA (matching 3840x2160.png)
         ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-gray-200/80 px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          {/* Breadcrumbs on left */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-gray-500 font-medium">Administration</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-semibold">Dashboard</span>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Switch Demo Role Button */}
            <button
              onClick={() => setShowRoleModal(true)}
              className="inline-flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium px-3.5 py-2 rounded-full transition shadow-sm cursor-pointer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden sm:inline">Switch Demo Role</span>
            </button>

            {/* Search observations, cases, users */}
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search observations, cases, users"
                className="w-64 lg:w-80 pl-10 pr-4 py-2 bg-gray-50/70 border border-gray-200 rounded-full text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-1 focus:ring-emerald-600 transition"
              />
            </div>

            {/* Demo data pill badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#fef3c7] text-[#92400e] border border-amber-200/60 px-3 py-1 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
              <span>Demo data</span>
            </div>

            {/* Notifications Bell Button */}
            <button
              onClick={() => alert("Notification center: All 3 estate division audits are up to date.")}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition shadow-sm cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>

            {/* User Profile Badge with dropdown toggle */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#dcfce7] text-[#166534] font-bold text-xs flex items-center justify-center">
                  {CURRENT_USER.initials}
                </div>
                <div className="text-left hidden lg:block leading-tight pr-1">
                  <div className="text-xs font-bold text-gray-900">{CURRENT_USER.name}</div>
                  <div className="text-[11px] text-gray-500">{currentRole}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-900">{CURRENT_USER.name}</p>
                    <p className="text-[11px] text-gray-500 truncate">{CURRENT_USER.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setShowRoleModal(true);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5 text-gray-400" />
                    Switch Role
                  </button>
                  <button
                    onClick={onSignOut}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-50"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-500" />
                    Sign Out (Back to Login)
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Body Container */}
        <main className="p-6 sm:p-8 space-y-6 max-w-[1700px] w-full mx-auto">
          {/* =====================================================================
              PAGE HEADER: Title, Date, Export & Create User Buttons
             ===================================================================== */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Administrator Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Identity, estates and device access overview · Wed 21 Oct 2026
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Export Button */}
              <button
                onClick={() => alert("Exporting administrator summary report (.CSV / .PDF)...")}
                className="inline-flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-gray-500" />
                <span>Export</span>
              </button>

              {/* Create User Button */}
              <button
                onClick={() => setShowCreateUserModal(true)}
                className="inline-flex items-center gap-2 bg-[#236b3b] hover:bg-[#1a552e] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create user</span>
              </button>
            </div>
          </div>

          {/* =====================================================================
              ROW 1: 4 Key Metric Cards (Active users, Estates, Divisions, Sessions)
             ===================================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DASHBOARD_METRICS.map((metric) => (
              <div
                key={metric.id}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold text-gray-500">
                    {metric.label}
                  </span>
                  <div className={`w-10 h-10 rounded-xl ${metric.colorScheme.bg} ${metric.colorScheme.text} flex items-center justify-center shrink-0`}>
                    {renderMetricIcon(metric.iconType)}
                  </div>
                </div>

                <div className="mt-2">
                  <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-2 font-medium">
                    {metric.subtext}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* =====================================================================
              ROW 2: 3 Columns Grid
              - Users by role
              - Estate coverage
              - Recent administrative activity
             ===================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 1. Users by role (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-6">
                  Users by role
                </h3>
                
                {/* DUMMY DATA: Progress bars for each role */}
                <div className="space-y-4">
                  {USERS_BY_ROLE.map((item) => (
                    <div key={item.role} className="flex items-center gap-3">
                      <span className="text-xs font-medium text-gray-600 w-28 shrink-0">
                        {item.role}
                      </span>
                      <div className="flex-1 bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.barColor} transition-all duration-500`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-gray-800 w-4 text-right">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50 text-[11px] text-gray-400">
                Total assigned roles across all 3 estate jurisdictions.
              </div>
            </div>

            {/* 2. Estate coverage (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-bold text-gray-900">
                    Estate coverage
                  </h3>
                  <button
                    onClick={() => alert("Navigating to Estates management view...")}
                    className="text-xs font-semibold text-[#236b3b] hover:text-[#184f29] hover:underline cursor-pointer"
                  >
                    View estates
                  </button>
                </div>

                {/* DUMMY DATA: Table showing estates and regions */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 font-semibold uppercase tracking-wider text-[11px]">
                        <th className="pb-2 font-semibold">ESTATE</th>
                        <th className="pb-2 font-semibold">REGION</th>
                        <th className="pb-2 font-semibold text-center">DIVISIONS</th>
                        <th className="pb-2 font-semibold text-right">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {ESTATE_COVERAGE.map((estate) => (
                        <tr key={estate.id} className="hover:bg-gray-50/60 transition-colors">
                          <td className="py-3 font-semibold text-[#236b3b]">
                            {estate.name}
                          </td>
                          <td className="py-3 text-gray-600">
                            {estate.region}
                          </td>
                          <td className="py-3 text-gray-600 text-center font-medium">
                            {estate.divisions}
                          </td>
                          <td className="py-3 text-right">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#eaf7ec] text-[#236b3b]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#236b3b]"></span>
                              {estate.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 text-[11px] text-gray-400">
                100% telemetry coverage across active divisions.
              </div>
            </div>

            {/* 3. Recent administrative activity (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
              <h3 className="text-base font-bold text-gray-900 mb-5">
                Recent administrative activity
              </h3>

              {/* DUMMY DATA: Timeline events list */}
              <div className="space-y-4">
                {RECENT_ACTIVITIES.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    {activity.icon === 'check' ? (
                      <div className="w-5 h-5 rounded-full bg-[#236b3b] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <Check className="w-3 h-3 stroke-[2.8]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-[#236b3b] flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[#236b3b]"></div>
                      </div>
                    )}
                    <div className="leading-tight">
                      <p className="text-xs font-semibold text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {activity.meta}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =====================================================================
              ROW 3: "Users requiring attention" Full-Width Card
             ===================================================================== */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                Users requiring attention
              </h3>
              <button
                onClick={() => alert("Navigating to complete User Directory...")}
                className="text-xs font-semibold text-[#236b3b] hover:text-[#184f29] hover:underline cursor-pointer"
              >
                View all users
              </button>
            </div>

            {/* DUMMY DATA: Table of users requiring attention */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-6 font-semibold">USER</th>
                    <th className="py-3 px-6 font-semibold">ROLE</th>
                    <th className="py-3 px-6 font-semibold">SCOPE</th>
                    <th className="py-3 px-6 font-semibold">STATUS</th>
                    <th className="py-3 px-6 font-semibold">LAST DEVICE SESSION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {attentionUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* User initials & full name */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${user.avatarBg} font-bold text-xs flex items-center justify-center shrink-0`}>
                            {user.initials}
                          </div>
                          <span className="font-semibold text-gray-900 text-xs sm:text-sm">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3.5 px-6 text-gray-600 font-medium">
                        {user.role}
                      </td>

                      {/* Scope */}
                      <td className="py-3.5 px-6 text-gray-700 font-medium">
                        {user.scope}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-6">
                        {user.statusType === 'warning' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#fef3c7] text-[#b45309]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
                            {user.status}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eaf7ec] text-[#236b3b]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#236b3b]"></span>
                            {user.status}
                          </span>
                        )}
                      </td>

                      {/* Last Device Session */}
                      <td className="py-3.5 px-6 text-gray-500 font-medium">
                        {user.lastDeviceSession}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* =========================================================================
          MODAL: Switch Demo Role
         ========================================================================= */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-[#236b3b]" />
                <h3 className="text-base font-bold text-gray-900">Switch Demo Role</h3>
              </div>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              Select a persona to test TeaLeaf Field Scout access permissions and scoped dashboard views:
            </p>

            {/* DUMMY DATA: List of test roles */}
            <div className="space-y-2 mb-6">
              {AVAILABLE_ROLES.map((role) => (
                <div
                  key={role.id}
                  onClick={() => {
                    setCurrentRole(role.name);
                    setShowRoleModal(false);
                  }}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition flex items-center justify-between ${
                    currentRole === role.name
                      ? 'border-[#236b3b] bg-[#eaf7ec]/50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-gray-900">{role.name}</div>
                    <div className="text-[11px] text-gray-500">{role.user} · {role.access}</div>
                  </div>
                  {currentRole === role.name && (
                    <span className="text-xs font-bold text-[#236b3b]">Current</span>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowRoleModal(false)}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: Create User
         ========================================================================= */}
      {showCreateUserModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#236b3b]" />
                <h3 className="text-base font-bold text-gray-900">Create New User</h3>
              </div>
              <button
                onClick={() => setShowCreateUserModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kasun Bandara"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
                >
                  <option value="Field worker">Field worker</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Disease expert">Disease expert</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Reporting user">Reporting user</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Assigned Scope
                </label>
                <select
                  value={newUser.scope}
                  onChange={(e) => setNewUser({ ...newUser, scope: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
                >
                  <option value="DIV-001, DIV-002">DIV-001, DIV-002 (Highland)</option>
                  <option value="DIV-007, DIV-008">DIV-007, DIV-008 (Riverbend)</option>
                  <option value="EST-003">EST-003 (Mist Valley)</option>
                  <option value="ALL">All Estates (Global)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateUserModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#236b3b] hover:bg-[#1a552e] text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
