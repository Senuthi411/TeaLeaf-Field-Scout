import { SignInError, type AuthPort, type Credentials, type Session } from '../../domain/auth';

export const DEMO_ACCOUNT = { username: 'admin@tealeaf.test', password: 'TeaLeaf@2026' };
const SESSION_KEY = 'tealeaf.demo-session';
// Only a synthetic session marker is persisted. Passwords and real tokens are never stored.
export class MockAuthAdapter implements AuthPort {
  async signIn({ username, password }: Credentials): Promise<Session> {
    await new Promise(resolve => setTimeout(resolve, 350));
    if (username.trim().toLowerCase() !== DEMO_ACCOUNT.username && username.trim().toLowerCase() !== 'admin') {
      throw new SignInError('The email or password is incorrect. Please try again.', 'credentials');
    }
    if (password !== DEMO_ACCOUNT.password) throw new SignInError('The email or password is incorrect. Please try again.', 'credentials');
    const session: Session = { user: { id: 'USR-001', name: 'Anika Perera', role: 'Administrator' }, permissions: ['identity.users.admin', 'identity.scopes.admin', 'identity.estates.admin', 'identity.divisions.admin', 'identity.devices.admin'], expiresAt: Date.now() + 60 * 60 * 1000 };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }
  restore(): Session | null {
    try { const session = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null') as Session | null; if (session?.user?.id === 'USR-001' && session.expiresAt > Date.now()) return session; } catch { /* Invalid demo state is treated as signed out. */ }
    this.signOut(); return null;
  }
  signOut() { sessionStorage.removeItem(SESSION_KEY); }
}
