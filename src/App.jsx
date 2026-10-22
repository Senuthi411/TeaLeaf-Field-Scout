import React, { useState } from 'react';
import { NewSidebar } from './components/NewSidebar';
import { NewHeader } from './components/NewHeader';
import { ExpertDashboardView } from './components/ExpertDashboardView';
import { SimplePageView } from './components/SimplePageView';
import { ObservationDetailsModal } from './components/ObservationDetailsModal';
import { DemoRoleModal } from './components/DemoRoleModal';
import { LoginScreenModal } from './components/LoginScreenModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation State - Expert Dashboard is the only fully designed page
  const [activeTab, setActiveTab] = useState('Expert Dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals State
  const [selectedCase, setSelectedCase] = useState(null);
  const [isDemoRoleOpen, setIsDemoRoleOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectCase = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const handleConfirmDiagnosis = (caseItem) => {
    showToast(`Confirmed diagnosis for ${caseItem.id} (${caseItem.suspected}). Recorded to treatment registry.`);
  };

  const handleSelectDemoRole = (roleItem) => {
    if (roleItem.id === 'expert') {
      setActiveTab('Expert Dashboard');
      showToast(`Switched persona to ${roleItem.role} (${roleItem.name}).`);
    } else {
      showToast(`Selected ${roleItem.role}.`);
    }
  };

  // Determine breadcrumb based on active tab
  const getBreadcrumbs = () => {
    return ['Cases', activeTab];
  };

  return (
    <div className="min-h-screen bg-[#f3f5f4] flex text-slate-800 antialiased font-sans">
      {/* 1. Left Dark Green Sidebar matching Image 4 */}
      <NewSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSignOut={() => setIsLoginOpen(true)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header matching Image 4 */}
        <NewHeader
          breadcrumb={getBreadcrumbs()}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenDemoRole={() => setIsDemoRoleOpen(true)}
          onSignOut={() => setIsLoginOpen(true)}
        />

        {/* Dynamic Page Views: Only Expert Dashboard is fully designed; others show name only */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {activeTab === 'Expert Dashboard' ? (
            <ExpertDashboardView
              onNavigateToAssignedCases={() => setActiveTab('Assigned Cases')}
              onNavigateToCatalog={() => setActiveTab('Disease Catalog')}
              onSelectCase={handleSelectCase}
            />
          ) : (
            <SimplePageView
              pageName={activeTab}
              onReturnToDashboard={() => setActiveTab('Expert Dashboard')}
            />
          )}
        </main>
      </div>

      {/* Observation Details / Evidence Viewer Modal */}
      <ObservationDetailsModal
        caseItem={selectedCase}
        isOpen={Boolean(selectedCase)}
        onClose={() => setSelectedCase(null)}
        onConfirmDiagnosis={handleConfirmDiagnosis}
      />

      {/* Demo Role Switcher Modal */}
      <DemoRoleModal
        isOpen={isDemoRoleOpen}
        onClose={() => setIsDemoRoleOpen(false)}
        onSelectRole={handleSelectDemoRole}
      />

      {/* Login Screen Modal */}
      <LoginScreenModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSignIn={() => {
          setIsLoginOpen(false);
          showToast('Signed in as Dr Tara Wijesinghe.');
        }}
      />

      {/* Floating Action Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 rounded-xl bg-slate-900 px-4 py-3 text-xs text-white shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
