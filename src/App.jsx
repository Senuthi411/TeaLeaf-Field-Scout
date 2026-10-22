import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SupervisorDashboard from './pages/SupervisorDashboard';
import ReviewQueue from './pages/ReviewQueue';
import ObservationModal from './components/ObservationModal';
import { OBSERVATIONS_DATA } from './data/dummyData';

export default function App() {
  // Navigation & Page State ('dashboard' | 'review-queue' | 'correction-queue' | etc.)
  const [activePage, setActivePage] = useState('dashboard');

  // Review Queue Filter Tab State (Default: 'All')
  // This state is controlled and updated when clicking any of the 5 boxes on Dashboard!
  const [selectedQueueTab, setSelectedQueueTab] = useState('All');

  // Sidebar collapse toggle state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Global search input state in Header
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Demo user role state
  const [currentRole, setCurrentRole] = useState('supervisor');

  // Observations state (allows supervisor to update status interactively in the demo)
  const [observations, setObservations] = useState(OBSERVATIONS_DATA);

  // Active Observation ID for detailed modal inspection
  const [selectedObservationId, setSelectedObservationId] = useState(null);

  /**
   * CRITICAL FEATURE:
   * Handles navigation from the Supervisor Dashboard 5 metric boxes
   * to the Review Queue page, automatically selecting the matching tab!
   * 
   * Mapping:
   *  - "Awaiting review"   --> "Submitted"
   *  - "In review"         --> "In review"
   *  - "Open corrections"  --> "Correction requested"
   *  - "Active referrals"  --> "Referred"
   *  - "Verified"          --> "Verified"
   */
  const handleNavigateToQueueWithFilter = (targetTab, page = 'review-queue') => {
    setSelectedQueueTab(targetTab || 'All');
    setActivePage(page === 'fieldwork-assignments' ? 'review-queue' : 'review-queue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open observation modal by ID
  const handleOpenObservationModal = (obsId) => {
    setSelectedObservationId(obsId);
  };

  // Close observation modal
  const handleCloseObservationModal = () => {
    setSelectedObservationId(null);
  };

  // Update observation status in local state
  const handleUpdateObservationStatus = (obsId, newStatus) => {
    setObservations((prev) =>
      prev.map((obs) =>
        obs.id === obsId ? { ...obs, status: newStatus } : obs
      )
    );
  };

  // Get currently selected observation object for modal
  const activeObservation = observations.find(
    (obs) => obs.id === selectedObservationId
  );

  // Handle sidebar navigation changes
  const handleSidebarNavigate = (pageId) => {
    if (pageId === 'correction-queue') {
      setSelectedQueueTab('Correction requested');
      setActivePage('review-queue');
    } else if (pageId === 'expert-referrals') {
      setSelectedQueueTab('Referred');
      setActivePage('review-queue');
    } else {
      setActivePage(pageId);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9f7] text-slate-800 flex font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        setActivePage={handleSidebarNavigate}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* 2. Main Application Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Sticky Top Header */}
        <Header
          activePage={activePage}
          setActivePage={setActivePage}
          globalSearchQuery={globalSearchQuery}
          setGlobalSearchQuery={setGlobalSearchQuery}
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {activePage === 'dashboard' ? (
            <SupervisorDashboard
              onNavigateToQueueWithFilter={handleNavigateToQueueWithFilter}
              onOpenObservationModal={handleOpenObservationModal}
            />
          ) : (
            <ReviewQueue
              selectedTab={selectedQueueTab}
              setSelectedTab={setSelectedQueueTab}
              onOpenObservationModal={handleOpenObservationModal}
              onUpdateObservationStatus={handleUpdateObservationStatus}
            />
          )}
        </main>
      </div>

      {/* 3. Observation Details & Action Inspection Modal */}
      {selectedObservationId && (
        <ObservationModal
          observation={activeObservation}
          onClose={handleCloseObservationModal}
          onUpdateStatus={handleUpdateObservationStatus}
        />
      )}
    </div>
  );
}
