import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Switch, View } from 'react-native';
import { Text } from '../components/AppText.js';
import { useRouter } from 'expo-router';
import { appServices } from '../../container.js';
import { colors, radius, fonts } from '../../constants/theme.js';
import { spacing } from '../../constants/spacing.js';
import { useApp } from '../state/AppContext.js';
import { useAuth } from '../state/AuthContext.js';
import { useSyncNow } from '../state/useSyncNow.js';
import AppButton from '../components/AppButton.js';
import AppHeader from '../components/AppHeader.js';
import BottomNavigation from '../components/BottomNavigation.js';
import ConnectionBadge from '../components/ConnectionBadge.js';
import Notice from '../components/Notice.js';
import ObservationCard from '../components/ObservationCard.js';
import Screen from '../components/Screen.js';
import StatCard from '../components/StatCard.js';

/** Offline queue and sync status. Honest: with no backend nothing can sync. */
export default function SyncScreen() {
  const router = useRouter();
  const { worker } = useAuth();
  const { t, dataVersion, isOnline, simulatedOffline, setSimulatedOffline, notifyDataChanged } = useApp();
  const [summary, setSummary] = useState(null);
  const [queue, setQueue] = useState([]);
  const [syncedCount, setSyncedCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [s, all] = await Promise.all([
          appServices.getDashboardSummary.execute({ workerId: worker.id }),
          appServices.getObservations.execute({ workerId: worker.id }),
        ]);
        if (cancelled) return;
        setSummary(s);
        setQueue(all.filter((o) => o.status !== 'DRAFT' && (o.syncStatus === 'PENDING' || o.syncStatus === 'FAILED')));
        setSyncedCount(all.filter((o) => o.status !== 'DRAFT' && o.syncStatus === 'SYNCED').length);
      } catch {
        // Keep previous values; counts show a dash until loaded.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [dataVersion, worker.id]);

  const waiting = summary?.stats.waitingToSync ?? 0;
  const sync = useSyncNow(waiting);

  const confirmClear = () =>
    Alert.alert('Remove sample data?', 'This deletes only the illustrative sample records.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: async () => { await appServices.clearSampleData.execute(); notifyDataChanged(); } },
    ]);

  return (
    <Screen header={<AppHeader title={t('nav.sync')} subtitle="Offline queue" right={<ConnectionBadge />} />} footer={<BottomNavigation active="sync" />}>
      {isOnline ? (
        <Notice tone="warning" title="Connected, but server sync is not available yet">
          There is no backend in this version. Submitted observations are stored safely on this phone as “Waiting to sync”. Nothing is uploaded.
        </Notice>
      ) : (
        <Notice tone="warning" title="You are offline">Records stay saved on this phone and have not been sent anywhere.</Notice>
      )}

      <View style={styles.stats}>
        <StatCard icon="cloud-offline" label="Waiting" value={summary?.queue.pending ?? '–'} caption="saved on phone" tone={summary?.queue.pending > 0 ? 'warning' : 'neutral'} />
        <StatCard icon="alert-circle" label="Failed" value={summary?.queue.failed ?? '–'} caption="to retry" tone={summary?.queue.failed > 0 ? 'danger' : 'neutral'} />
      </View>
      <View style={styles.stats}>
        <StatCard icon="document-text" label="Drafts" value={summary?.stats.drafts ?? '–'} caption="not submitted" />
        <StatCard icon="checkmark-circle" label="Synced" value={syncedCount} caption={summary?.stats.sampleCount ? 'sample records only' : 'confirmed by server'} />
      </View>

      <View style={styles.card}>
        <AppButton title={sync.label} icon="sync" onPress={sync.run} disabled={sync.disabled} loading={sync.running} />
        {sync.message ? <Notice tone="info">{sync.message}</Notice> : null}
        <View style={styles.switchRow}>
          <View style={styles.flex}>
            <Text style={styles.switchTitle}>Simulate offline (demo)</Text>
            <Text style={styles.muted}>Try the offline layout without changing your network.</Text>
          </View>
          <Switch value={simulatedOffline} onValueChange={setSimulatedOffline} trackColor={{ true: colors.primary, false: '#AAB4AA' }} thumbColor="#FFFFFF" accessibilityLabel="Simulate offline" />
        </View>
      </View>

      <Text style={styles.sectionTitle} accessibilityRole="header">Records waiting on this phone</Text>
      {queue.length === 0 ? <Text style={styles.muted}>Nothing is waiting.</Text> : null}
      {queue.map((o) => (
        <ObservationCard key={o.uuid} observation={o} onViewDetails={(x) => router.push(`/observation/${x.uuid}`)} onContinueDraft={() => {}} />
      ))}

      {summary?.stats.sampleCount > 0 ? <AppButton variant="secondary" icon="trash-outline" title="Remove sample data" onPress={confirmClear} /> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  stats: { flexDirection: 'row', gap: 10 },
  card: { gap: 12, padding: spacing.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card },
  muted: { fontSize: 13, color: colors.textMuted },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border },
  switchTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  sectionTitle: { fontFamily: fonts.heading, fontSize: 18, fontWeight: '800', color: colors.text },
});
