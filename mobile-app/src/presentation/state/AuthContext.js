import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { appServices, config, demoWorkerId } from '../../container.js';
import { useApp } from './AppContext.js';

const AuthContext = createContext(null);

/** Holds the signed-in worker. Accounts are local to this phone (development mode, see constants/config.js). */
export function AuthProvider({ children }) {
  const { ready, isOnline } = useApp();
  const [worker, setWorker] = useState(null);
  const [restoring, setRestoring] = useState(true);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    (async () => {
      // Presentation mode: skip the login screen by starting a session for the demo worker.
      if (config.presentationMode) await appServices.session.start(demoWorkerId);
      return appServices.session.restore();
    })()
      .then((restored) => !cancelled && setWorker(restored))
      .catch(() => {})
      .finally(() => !cancelled && setRestoring(false));
    return () => {
      cancelled = true;
    };
  }, [ready]);

  const signIn = useCallback(
    async (workerCode, password) => {
      const result = await appServices.loginWorker.execute({ workerCode, password, isOnline });
      if (result.ok) setWorker(result.worker);
      return result;
    },
    [isOnline],
  );

  const signOut = useCallback(async () => {
    await appServices.session.end();
    setWorker(null);
  }, []);

  const value = useMemo(() => ({ worker, restoring, signIn, signOut }), [worker, restoring, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
