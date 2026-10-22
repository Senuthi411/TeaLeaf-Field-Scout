import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ObservationStatsPage from './pages/ObservationStatsPage';
import DashboardPage from './pages/DashboardPage';
import PlaceholderPage from './pages/PlaceholderPage';
import FilterModal from './components/FilterModal';
import ExportModal from './components/ExportModal';
import { navigationItems, demoRoles } from './data/mockData';

export default function App() {
  // Navigation state: default to 'analytics-dashboard' (or 'observation-statistics')
  const [activePage, setActivePage] = useState('observation-statistics');

  // Sidebar collapse toggle state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Active persona / role (Switch Demo Role feature)
  // DUMMY DATA: Initial active role is 'Reporting user' (Maya Dissanayake)
  const [activeRole, setActiveRole] = useState(demoRoles[0]);

  // Global search input state
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state for Filters and Export buttons
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Active breadcrumb label based on active page
  const getBreadcrumbLabel = () => {
    if (activePage === 'analytics-dashboard') return 'Dashboard';
    if (activePage === 'observation-statistics') return 'Observation Statistics';
    const found = navigationItems.find((n) => n.id === activePage);
    return found ? found.label : 'Analytics';
  };

  // Report title for export modal
  const getCurrentReportTitle = () => {
    if (activePage === 'analytics-dashboard') return 'Analytics Dashboard Summary';
    if (activePage === 'observation-statistics') return 'Observation Statistics Breakdown';
    return `${getBreadcrumbLabel()} Report`;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex overflow-x-hidden font-['Inter',sans-serif]">
      {/* Dark Forest Green Left Navigation Sidebar */}
      <Sidebar
        navigationItems={navigationItems}
        activePage={activePage}
        setActivePage={setActivePage}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Sticky Header */}
        <Header
          currentBreadcrumb={getBreadcrumbLabel()}
          activeRole={activeRole}
          setActiveRole={setActiveRole}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Dynamic Page Router */}
        <main className="flex-1 flex flex-col">
          {activePage === 'observation-statistics' && (
            <ObservationStatsPage
              onOpenFilters={() => setIsFilterModalOpen(true)}
              onOpenExport={() => setIsExportModalOpen(true)}
              onNavigateToObservationStats={() => setActivePage('observation-statistics')}
            />
          )}

          {activePage === 'analytics-dashboard' && (
            <DashboardPage
              onOpenFilters={() => setIsFilterModalOpen(true)}
              onOpenExport={() => setIsExportModalOpen(true)}
              onNavigateToObservationStats={() => setActivePage('observation-statistics')}
            />
          )}

          {activePage !== 'observation-statistics' && activePage !== 'analytics-dashboard' && (
            <PlaceholderPage
              title={getBreadcrumbLabel()}
              onOpenFilters={() => setIsFilterModalOpen(true)}
              onOpenExport={() => setIsExportModalOpen(true)}
              onNavigateTo={setActivePage}
            />
          )}
        </main>
      </div>

      {/* Interactive Filters Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={(filters) => {
          console.log('Applied filters:', filters);
        }}
      />

      {/* Interactive Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        currentReportTitle={getCurrentReportTitle()}
      />
    </div>
  );
}
