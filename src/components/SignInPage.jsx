import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield, ArrowRight, CheckCircle2, Stethoscope, TrendingUp } from 'lucide-react';
import { TeaLeafIcon, TeaLeafBrand } from './TeaLeafLogo';

/**
 * SignInPage Component
 * Exactly replicates the layout, typography, colors, and dummy fields shown in "1.png".
 * 
 * Props:
 * - onSignIn: Function called when the user submits or clicks the "Sign In" button to navigate to the dashboard.
 */
export default function SignInPage({ onSignIn }) {
  // DUMMY DATA: Pre-populated credentials for seamless demonstration and testing
  const [email, setEmail] = useState('name@estate.example');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission and navigate to Dashboard
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate instantaneous or smooth verification before navigation
    setTimeout(() => {
      setIsLoading(false);
      if (onSignIn) {
        onSignIn();
      }
    }, 250);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* =========================================================================
          LEFT PANEL: Dark Forest Green Plantation Hero (matching 1.png)
         ========================================================================= */}
      <div className="relative w-full lg:w-[54%] bg-gradient-to-br from-[#1b4d2e] via-[#164227] to-[#102f1c] text-white p-8 md:p-14 lg:p-20 flex flex-col justify-between overflow-hidden min-h-[480px] lg:min-h-screen">
        {/* Subtle Tea Estate Topographic / Contour Lines Pattern Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 900">
            <path d="M-100,500 C150,420 350,600 600,480 C750,400 850,530 1000,470 L1000,1000 L-100,1000 Z" fill="#205936" fillOpacity="0.4" />
            <path d="M-100,580 C180,510 320,680 570,570 C720,490 820,620 1000,560 L1000,1000 L-100,1000 Z" fill="#276b41" fillOpacity="0.35" />
            <path d="M-100,660 C200,600 360,750 620,650 C770,580 870,700 1000,650 L1000,1000 L-100,1000 Z" fill="#2e7c4c" fillOpacity="0.3" />
            <path d="M-100,740 C170,690 390,820 650,730 C800,670 900,780 1000,730 L1000,1000 L-100,1000 Z" fill="#358e57" fillOpacity="0.25" />
            <path d="M-100,820 C220,770 410,890 690,810 C830,760 920,850 1000,820 L1000,1000 L-100,1000 Z" fill="#3ea063" fillOpacity="0.2" />
          </svg>
        </div>

        {/* Top Feature Pill Badge */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2.5 bg-white text-gray-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-shadow">
            <TeaLeafIcon className="w-4 h-4 text-[#236b3b]" strokeWidth={2.2} />
            <span>Field-to-expert crop health platform</span>
          </div>
        </div>

        {/* Center Hero Headline & Subtitle */}
        <div className="relative z-10 my-auto py-12 lg:py-0 max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.12] tracking-tight mb-6">
            Protecting Tea Health,<br />
            One Leaf at a Time
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 font-normal leading-relaxed max-w-lg mb-10">
            Evidence-based observation, review and expert diagnosis for every estate and division.
          </p>

          {/* Three Feature Highlights matching mockup */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
            <div className="flex items-center gap-2.5 text-white/95 text-xs sm:text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 stroke-[2.2]" />
              <span>Verified evidence</span>
            </div>
            
            <div className="flex items-center gap-2.5 text-white/95 text-xs sm:text-sm font-medium">
              <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 stroke-[2.2]" />
              <span>Expert diagnosis</span>
            </div>

            <div className="flex items-center gap-2.5 text-white/95 text-xs sm:text-sm font-medium">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 stroke-[2.2]" />
              <span>Estate analytics</span>
            </div>
          </div>
        </div>

        {/* Bottom spacer / aesthetic balance */}
        <div className="relative z-10 hidden lg:block text-xs text-emerald-200/40">
          TeaLeaf Field Scout Enterprise Edition
        </div>
      </div>

      {/* =========================================================================
          RIGHT PANEL: Sign In Card (matching 1.png)
         ========================================================================= */}
      <div className="w-full lg:w-[46%] bg-white flex flex-col justify-center items-center px-6 py-12 sm:px-12 lg:px-16 xl:px-20 min-h-screen">
        <div className="w-full max-w-[420px] mx-auto">
          {/* Logo Leaf Circular Badge */}
          <div className="w-16 h-16 rounded-full bg-[#eaf7ec] border border-emerald-100 flex items-center justify-center mx-auto mb-4 text-[#2e7d32] shadow-sm">
            <TeaLeafIcon className="w-8 h-8 text-[#2e7d32]" strokeWidth={1.75} />
          </div>

          {/* Brand Name */}
          <div className="flex justify-center mb-5">
            <TeaLeafBrand size="large" />
          </div>

          {/* Card Headers */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 mt-1.5">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field: Email or username */}
            <div>
              <label 
                htmlFor="email-input" 
                className="block text-xs font-semibold text-gray-800 mb-1.5"
              >
                Email or username
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="email-input"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@estate.example"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                />
              </div>
            </div>

            {/* Field: Password */}
            <div>
              <label 
                htmlFor="password-input" 
                className="block text-xs font-semibold text-gray-800 mb-1.5"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#236b3b] focus:ring-[#236b3b] accent-[#236b3b] cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-gray-700">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert("Password reset link sent to registered email")}
                className="text-xs sm:text-sm font-medium text-[#1e6b37] hover:text-[#144924] hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Primary Submit Button: Sign In -> */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#236b3b] hover:bg-[#1a552e] active:bg-[#154625] text-white font-medium text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition duration-150 cursor-pointer disabled:opacity-70 group"
              >
                <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>

          {/* Secure Access Information Callout Card */}
          <div className="mt-6 p-4 rounded-xl bg-[#f4f9f4] border border-[#e2efe5] flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#2e7d32] shrink-0 mt-0.5 stroke-[1.8]" />
            <div>
              <h4 className="text-xs font-bold text-gray-900 leading-tight">
                Secure access
              </h4>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                Your session is protected. Contact your estate administrator for access.
              </p>
            </div>
          </div>

          {/* Bottom Footnote Note */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Demonstration data · UI design only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
