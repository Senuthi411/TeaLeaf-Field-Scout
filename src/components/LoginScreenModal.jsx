import React, { useState } from 'react';
import { Lock, CheckCircle2, ArrowRight, ShieldCheck, X } from 'lucide-react';

export const LoginScreenModal = ({ isOpen, onClose, onSignIn }) => {
  const [username, setUsername] = useState('Dr Tara Wijesinghe');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[520px]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Green Banner matching Image 3 */}
        <div className="md:w-1/2 bg-gradient-to-br from-[#0d3826] via-[#09291b] to-[#05170f] p-8 md:p-10 text-white flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center rounded-full bg-emerald-900/80 px-3 py-1 text-[10.5px] font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
              Field-to-expert crop health platform
            </span>

            <h1 className="text-3xl font-extrabold tracking-tight text-white mt-6 leading-tight">
              Protecting Tea Health,<br />One Leaf at a Time
            </h1>

            <p className="mt-4 text-xs text-emerald-100/80 leading-relaxed max-w-sm">
              Evidence-based observation, review and expert diagnosis for every estate and division.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-emerald-900/60">
            <div className="flex flex-wrap gap-3 text-xs text-emerald-200">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Verified evidence</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Expert diagnosis</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Estate analytics</span>
              </span>
            </div>

            <div className="text-[10px] text-emerald-400/50">
              Ceylon Highlands Camellia sinensis monitoring network
            </div>
          </div>
        </div>

        {/* Right Form matching Image 3 */}
        <div className="md:w-1/2 p-8 md:p-10 bg-white flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center space-x-2.5 text-emerald-800">
              <img
                src="/logo.png"
                alt="TeaLeaf Logo"
                className="h-9 w-9 rounded-full object-contain shrink-0"
              />
              <span className="font-extrabold text-sm tracking-tight text-slate-900">
                TeaLeaf <span className="text-emerald-700">Field Scout</span>
              </span>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Welcome Back
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Sign in to access your dashboard
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSignIn();
              }}
              className="mt-6 space-y-4 text-xs"
            >
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Email or username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <label className="flex items-center space-x-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="text-emerald-800 font-semibold hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center space-x-2 rounded-xl bg-[#0d3826] py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#09281a] active:scale-[0.98] transition cursor-pointer"
              >
                <span>Sign In</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 text-[11px] text-slate-600 flex items-start space-x-2.5">
              <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 font-semibold">Secure access:</strong> Your session is protected. Contact your estate administrator for access.
              </div>
            </div>

            <div className="mt-2 text-[9px] text-slate-400 text-center leading-tight">
              DEMONSTRATION DATA • Prototype v2.0 baseline • Remember me / Forgot password pending functional approval
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
