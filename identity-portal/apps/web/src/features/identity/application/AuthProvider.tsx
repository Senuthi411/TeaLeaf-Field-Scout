import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AuthPort, Credentials, Session } from '../domain/auth';
interface AuthContextValue { session: Session | null; signIn(credentials: Credentials): Promise<void>; signOut(): void; }
const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ adapter, children }: { adapter: AuthPort; children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => adapter.restore());
  const value: AuthContextValue = {
    session,
    async signIn(credentials) { setSession(await adapter.signIn(credentials)); },
    signOut() { adapter.signOut(); setSession(null); },
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('AuthProvider is required'); return context; }
