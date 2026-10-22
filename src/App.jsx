import React, { useState } from 'react';
import SignInPage from './components/SignInPage';
import DashboardPage from './components/DashboardPage';

/**
 * Main Application Component
 * 
 * Implements navigation between:
 * 1. "Sign In" page (matching "D:\Member 1\Ui\1.png")
 * 2. "Administrator Dashboard" page (matching "D:\Member 1\Ui\3840x2160.png")
 * 
 * Requirement:
 * - "When click the sign in button go to the dashboard set this navigation"
 */
export default function App() {
  // Navigation state: 'signin' | 'dashboard'
  const [currentPage, setCurrentPage] = useState('signin');

  // Navigation handlers
  const handleNavigateToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handleNavigateToSignIn = () => {
    setCurrentPage('signin');
  };

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Quick Preview Navigation Ribbon (fixed in bottom-right corner for effortless demo toggling) */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 bg-black/85 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-white/10 opacity-90 hover:opacity-100 transition-opacity">
        <span className="text-gray-400 text-[11px] mr-1 hidden sm:inline">Active Page:</span>
        <button
          onClick={handleNavigateToSignIn}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
            currentPage === 'signin'
              ? 'bg-[#236b3b] text-white shadow-xs'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          1. Sign In
        </button>
        <button
          onClick={handleNavigateToDashboard}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
            currentPage === 'dashboard'
              ? 'bg-[#236b3b] text-white shadow-xs'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          2. Dashboard
        </button>
      </div>

      {/* Conditional rendering of pages based on navigation state */}
      {currentPage === 'signin' ? (
        <SignInPage onSignIn={handleNavigateToDashboard} />
      ) : (
        <DashboardPage onSignOut={handleNavigateToSignIn} />
      )}
    </div>
  );
}
