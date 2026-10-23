import StatusBadge from './StatusBadge.js';
import { useApp } from '../state/AppContext.js';

export default function ConnectionBadge() {
  const { isOnline, t } = useApp();
  return (
    <StatusBadge tone={isOnline ? 'success' : 'warning'} icon={isOnline ? 'wifi' : 'cloud-offline'}>
      {isOnline ? t('status.online') : t('status.offline')}
    </StatusBadge>
  );
}
