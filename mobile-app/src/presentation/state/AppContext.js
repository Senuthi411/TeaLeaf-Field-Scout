import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { appServices, devices } from '../../container.js';
import { translate } from '../i18n/translations.js';

const AppContext = createContext(null);

/**
 * App-wide state: database readiness, language, connectivity, and a data version counter that
 * screens watch so lists and statistics refresh after a save.
 */
export function AppProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [initError, setInitError] = useState(null);
  const [language, setLanguageState] = useState('en');
  const [networkAvailable, setNetworkAvailable] = useState(true);
  const [simulatedOffline, setSimulatedOffline] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [flash, setFlash] = useState(null); // one-off message shown on the dashboard

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setInitError(null);
        await appServices.initialize();
        const stored = await appServices.languagePreference.get();
        if (!cancelled) {
          setLanguageState(stored);
          setReady(true);
        }
      } catch (error) {
        if (!cancelled) setInitError(error?.message ?? 'The local database could not be opened.');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  useEffect(() => devices.ConnectivityService.subscribe(setNetworkAvailable), []);

  const setLanguage = useCallback(async (code) => {
    setLanguageState(code);
    try {
      await appServices.languagePreference.set(code);
    } catch {
      // The choice still applies for this session even if it could not be saved.
    }
  }, []);

  const notifyDataChanged = useCallback(() => setDataVersion((version) => version + 1), []);
  const retryInit = useCallback(() => setAttempt((count) => count + 1), []);

  const value = useMemo(
    () => ({
      ready,
      initError,
      retryInit,
      language,
      setLanguage,
      t: (key) => translate(language, key),
      isOnline: networkAvailable && !simulatedOffline,
      simulatedOffline,
      setSimulatedOffline,
      dataVersion,
      notifyDataChanged,
      flash,
      showFlash: setFlash,
      clearFlash: () => setFlash(null),
    }),
    [ready, initError, retryInit, language, setLanguage, networkAvailable, simulatedOffline, dataVersion, notifyDataChanged, flash],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}
