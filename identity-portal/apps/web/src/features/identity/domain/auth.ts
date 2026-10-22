export interface Credentials { username: string; password: string; }
export interface Session {
  user: { id: string; name: string; role: 'Administrator' };
  permissions: string[];
  expiresAt: number;
}
export interface AuthPort {
  signIn(credentials: Credentials): Promise<Session>;
  restore(): Session | null;
  signOut(): void;
}
export class SignInError extends Error {
  constructor(message: string, public code: 'credentials' | 'offline' | 'locked') { super(message); }
}
