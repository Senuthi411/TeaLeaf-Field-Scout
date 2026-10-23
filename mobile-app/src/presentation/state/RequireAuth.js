import { Redirect } from 'expo-router';
import { useAuth } from './AuthContext.js';

/** Wrap a protected route: signed-out users are sent to the login screen. */
export default function RequireAuth({ children }) {
  const { worker } = useAuth();
  if (!worker) return <Redirect href="/login" />;
  return children;
}
