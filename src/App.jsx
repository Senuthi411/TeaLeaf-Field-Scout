import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CommandHeader } from './components/CommandHeader';
import { KPICards } from './components/KPICards';
import { FilterBar } from './components/FilterBar';
import { SpecimenCard } from './components/SpecimenCard';
import { SpecimenTable } from './components/SpecimenTable';
import { BottomCards } from './components/BottomCards';
import { EmptyState } from './components/EmptyState';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ConfirmModal } from './components/ConfirmModal';
import { DiagnosisModal } from './components/DiagnosisModal';
import { AdvisoryModal } from './components/AdvisoryModal';
import { DiagnosticKeyModal } from './components/DiagnosticKeyModal';
import { StateSwitcherBar } from './components/StateSwitcherBar';
import { OtherPageView } from './components/OtherPageView';
import { MOCK_SPECIMENS } from './data/mockData';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function App() {
  // Navigation & Location
  const [activeTab, setActiveTab] = useState('Expert Queue');
  const [selectedLocation, setSelectedLocation] = useState('Nuwara Eliya Highlands (DIV 01-06)');
  const [searchQuery, setSearchQuery] = useState('');

  // Specimen Data State
  const [specimens, setSpecimens] = useState(MOCK_SPECIMENS);
  const [selectedIds, setSelectedIds] = useState([]);

  // Stats Counters
  const [verifiedCount, setVerifiedCount] = useState(9);

  // Filters State
  const [pathogenFilter, setPathogenFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [divisionFilter, setDivisionFilter] = useState('ALL');
  const [waitingFilter, setWaitingFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modals & UI States
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmCount, setConfirmCount] = useState(5);
  const [isDiagnosisModalOpen, setIsDiagnosisModalOpen] = useState(false);
  const [activeSpecimen, setActiveSpecimen] = useState(null);
  const [isAdvisoryModalOpen, setIsAdvisoryModalOpen] = useState(false);
  const [isDiagnosticKeyOpen, setIsDiagnosticKeyOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Preview State Switcher (Live / Loading / Empty)
  const [previewState, setPreviewState] = useState('live');

  // Trigger Toast Notification
  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter Logic
  const filteredSpecimens = useMemo(() => {
    return specimens.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          item.id.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.block.toLowerCase().includes(q) ||
          item.pathogenLatin.toLowerCase().includes(q) ||
          item.aiPathogen.toLowerCase().includes(q) ||
          item.scout.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Pathogen filter
      if (pathogenFilter !== 'ALL' && !item.title.toLowerCase().includes(pathogenFilter.toLowerCase())) {
        return false;
      }

      // Priority filter
      if (priorityFilter !== 'ALL' && item.priority !== priorityFilter) {
        return false;
      }

      // Division filter
      if (divisionFilter !== 'ALL' && item.division !== divisionFilter) {
        return false;
      }

      // Waiting filter
      if (waitingFilter === 'UNDER_2H' && item.waitingHours >= 2) return false;
      if (waitingFilter === 'UNDER_6H' && item.waitingHours >= 6) return false;
      if (waitingFilter === 'OVER_12H' && item.waitingHours < 12) return false;

      return true;
    });
  }, [specimens, searchQuery, pathogenFilter, priorityFilter, divisionFilter, waitingFilter]);

  // Dynamic KPI calculations
  const criticalCount = useMemo(() => {
    const num = specimens.filter((s) => s.priority === 'CRITICAL').length;
    return String(num).padStart(2, '0');
  }, [specimens]);

  // Selection handlers
  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllEligible = (checked) => {
    if (checked) {
      setSelectedIds(filteredSpecimens.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Batch Validation
  const handleBatchValidateClick = () => {
    const eligibleCount = selectedIds.length > 0 ? selectedIds.length : Math.min(5, specimens.length);
    setConfirmCount(eligibleCount);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmBatchApproval = () => {
    setIsConfirmModalOpen(false);
    const toRemove = selectedIds.length > 0 ? selectedIds : specimens.slice(0, confirmCount).map((s) => s.id);
    setSpecimens((prev) => prev.filter((s) => !toRemove.includes(s.id)));
    setVerifiedCount((prev) => prev + toRemove.length);
    showToast(`Approved ${toRemove.length} diagnoses. Dispatched to Estate Rx Log.`);
    setSelectedIds([]);
  };

  // Single Diagnosis Launch
  const handleLaunchDiagnosis = (specimen) => {
    setActiveSpecimen(specimen);
    setIsDiagnosisModalOpen(true);
  };

  const handleApproveSingleDiagnosis = (specimen) => {
    showToast(`Confirmed diagnosis for #${specimen.id}. Rx advisory sent.`);
    setSpecimens((prev) => prev.filter((s) => s.id !== specimen.id));
    setVerifiedCount((prev) => prev + 1);
  };

  // Escalate Card to Critical
  const handleEscalateToCritical = (specimen) => {
    setSpecimens((prev) =>
      prev.map((s) => (s.id === specimen.id ? { ...s, priority: 'CRITICAL', priorityColor: 'red' } : s))
    );
    showToast(`Escalated #${specimen.id} to CRITICAL priority. Bio-security team notified.`);
  };

  // Request Resample from Scout
  const handleRequestResample = (specimen) => {
    showToast(`Resample order dispatched to ${specimen.scout} (${specimen.scoutId}) for #${specimen.id}.`);
  };

  // Export Specimen Data
  const handleExportSpecimen = (specimen) => {
    showToast(`Exported pathological telemetry for #${specimen.id}.`);
  };

  // Sync action
  const handleRefreshSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Telemetry refreshed from 24 field scouts and 6 estate mesh nodes.');
    }, 750);
  };

  // Advisory broadcast
  const handleBroadcastAdvisory = (advisoryData) => {
    showToast(`Estate Advisory transmitted to ${advisoryData.division} with severity: ${advisoryData.severity}`);
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] flex flex-col text-slate-800 antialiased font-sans">
      {/* Top Interactive Figma State Switcher */}
      <StateSwitcherBar
        currentState={previewState}
        setCurrentState={setPreviewState}
        onOpenConfirmModal={() => {
          setConfirmCount(5);
          setIsConfirmModalOpen(true);
        }}
      />

      {/* Main App Navigation Bar */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        onShowToast={showToast}
      />

      {/* App Body: Left Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setPreviewState('live'); // return to live mode when switching tabs
          }}
          awaitingCount={specimens.length}
        />

        {/* Center Main Stage */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-6 space-y-5">
          {/* If the user clicked any tab OTHER than Expert Queue, render the linked page view */}
          {activeTab !== 'Expert Queue' ? (
            <OtherPageView
              pageName={activeTab}
              onReturnToQueue={() => setActiveTab('Expert Queue')}
            />
          ) : (
            /* Expert Queue: Screen 6.1 */
            <>
              {/* 1. Protocol Banner, Sync / Advisory Actions & Screen Title */}
              <CommandHeader
                onRefreshSync={handleRefreshSync}
                onTriggerAdvisory={() => setIsAdvisoryModalOpen(true)}
                isSyncing={isSyncing}
              />

              {/* 2. Key Metrics Summary Cards */}
              <KPICards
                stats={{
                  awaiting: String(specimens.length).padStart(2, '0'),
                  critical: criticalCount,
                  sla: '12',
                  verified: String(verifiedCount).padStart(2, '0'),
                }}
              />

              {/* 3. Filter Controls & Batch Actions Toolbar */}
              <FilterBar
                pathogenFilter={pathogenFilter}
                setPathogenFilter={setPathogenFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                divisionFilter={divisionFilter}
                setDivisionFilter={setDivisionFilter}
                waitingFilter={waitingFilter}
                setWaitingFilter={setWaitingFilter}
                viewMode={viewMode}
                setViewMode={setViewMode}
                totalCount={specimens.length}
                filteredCount={filteredSpecimens.length}
                selectAllEligible={
                  selectedIds.length > 0 && selectedIds.length === filteredSpecimens.length
                }
                setSelectAllEligible={handleSelectAllEligible}
                onBatchValidate={handleBatchValidateClick}
                onRequestResample={() =>
                  showToast('Field resample requisition sent to on-shift supervisors.')
                }
                selectedCount={selectedIds.length}
              />

              {/* 4. Main Queue Content (Switchable between Live, Skeleton, and Empty state) */}
              {previewState === 'loading' ? (
                <LoadingSkeleton />
              ) : previewState === 'empty' || filteredSpecimens.length === 0 ? (
                <EmptyState
                  onReset={() => {
                    setPreviewState('live');
                    setPathogenFilter('ALL');
                    setPriorityFilter('ALL');
                    setDivisionFilter('ALL');
                    setWaitingFilter('ALL');
                    setSearchQuery('');
                    setSpecimens(MOCK_SPECIMENS);
                  }}
                />
              ) : viewMode === 'grid' ? (
                /* Specimen Cards Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {filteredSpecimens.map((specimen) => (
                    <SpecimenCard
                      key={specimen.id}
                      specimen={specimen}
                      isSelected={selectedIds.includes(specimen.id)}
                      onToggleSelect={handleToggleSelect}
                      onLaunchDiagnosis={handleLaunchDiagnosis}
                      onEscalateToCritical={handleEscalateToCritical}
                      onRequestResample={handleRequestResample}
                      onExportSpecimen={handleExportSpecimen}
                    />
                  ))}
                </div>
              ) : (
                /* Table View */
                <SpecimenTable
                  specimens={filteredSpecimens}
                  selectedIds={selectedIds}
                  onToggleSelect={handleToggleSelect}
                  onLaunchDiagnosis={handleLaunchDiagnosis}
                  onMoreActions={handleLaunchDiagnosis}
                />
              )}

              {/* 5. Bottom SLA Compliance & TRI Reference Strain Cards */}
              <BottomCards
                onOpenStrainIndex={() => setIsDiagnosticKeyOpen(true)}
                onDownloadTelemetry={() =>
                  showToast('Downloaded TRI-Pedro-Div01-04-SLA-Telemetry.csv dataset.')
                }
              />
            </>
          )}
        </main>
      </div>

      {/* Confirmation Modal (Matches Figma Mockup State: "Approve 5 selected?") */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        count={confirmCount}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmBatchApproval}
      />

      {/* Full Agronomist Diagnosis Inspection Modal */}
      <DiagnosisModal
        isOpen={isDiagnosisModalOpen}
        specimen={activeSpecimen}
        onClose={() => setIsDiagnosisModalOpen(false)}
        onApprove={handleApproveSingleDiagnosis}
      />

      {/* Estate Advisory Broadcast Modal */}
      <AdvisoryModal
        isOpen={isAdvisoryModalOpen}
        onClose={() => setIsAdvisoryModalOpen(false)}
        onSend={handleBroadcastAdvisory}
      />

      {/* TRI Reference Strain Index Modal */}
      <DiagnosticKeyModal
        isOpen={isDiagnosticKeyOpen}
        onClose={() => setIsDiagnosticKeyOpen(false)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs text-white shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage.msg}</span>
        </div>
      )}
    </div>
  );
}
