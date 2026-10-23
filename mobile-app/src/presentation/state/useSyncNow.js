import { useCallback, useState } from 'react';
import { appServices } from '../../container.js';
import { useApp } from './AppContext.js';

/**
 * "Sync now" asks the SyncGateway to upload. Today the gateway reports that no backend exists, so
 * nothing changes and the user is told so. Once a real gateway is wired in, this hook needs no change.
 */
export function useSyncNow(waitingCount) {
  const { isOnline, notifyDataChanged } = useApp();
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState('');

  const run = useCallback(async () => {
    if (!isOnline || running) return;
    setRunning(true);
    setMessage('');
    try {
      const result = await appServices.syncPending.execute();
      if (result.attempted) {
        setMessage(`${result.synced} synced, ${result.failed} failed, ${result.waiting} still waiting.`);
        notifyDataChanged();
      } else {
        setMessage(`${result.reason} (${result.waiting} ${result.waiting === 1 ? 'record' : 'records'} waiting.)`);
      }
    } catch (error) {
      setMessage(`Sync could not run: ${error?.message ?? 'unknown error'}`);
    } finally {
      setRunning(false);
    }
  }, [isOnline, running, notifyDataChanged]);

  const label = running ? 'Checking…' : !isOnline ? 'Offline — sync paused' : waitingCount === 0 ? 'Nothing to sync' : `Sync now (${waitingCount})`;
  return { run, running, message, label, disabled: !isOnline || running || waitingCount === 0 };
}
