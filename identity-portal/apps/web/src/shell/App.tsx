import { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '../features/identity/application/AuthProvider';
import { MockAuthAdapter } from '../features/identity/infrastructure/mock/auth';
import { LoginPage } from '../features/identity/presentation/LoginPage';
import { PortalPage } from '../features/identity/presentation/PortalPage';
import { identityRoutes } from '../features/identity/routes.manifest';
import type { ReactNode } from 'react';

const authAdapter = new MockAuthAdapter();
function Protected({ permission, children }: { permission: string | null; children: ReactNode }) {
  const { session, signOut } = useAuth();
  const location = useLocation();
  useEffect(()=>{if(!session)return;const timer=setTimeout(signOut,Math.max(0,session.expiresAt-Date.now()));return()=>clearTimeout(timer);},[session,signOut]);
  if(!session || session.expiresAt<=Date.now())return <Navigate to="/login" replace state={{from:location.pathname+location.search}} />;
  if(permission&&!session.permissions.includes(permission))return <main className="route-message"><h1>Access denied</h1><p>Your role does not have permission to view this page.</p><a href="/admin">Return to dashboard</a></main>;
  return children;
}
function AppRoutes(){return <Routes><Route path="/login" element={<LoginPage />} /><Route path="/" element={<Navigate to="/login" replace />} />{identityRoutes.map(route=><Route key={route.key} path={route.path} element={<Protected permission={route.permission}><PortalPage key={route.key} screen={route.key} /></Protected>} />)}<Route path="*" element={<main className="route-message"><h1>Page not found</h1><a href="/login">Return to sign in</a></main>} /></Routes>;}
export function App(){return <AuthProvider adapter={authAdapter}><BrowserRouter><Suspense fallback={<main className="route-message" role="status">Loading TeaLeaf…</main>}><AppRoutes /></Suspense></BrowserRouter></AuthProvider>;}
