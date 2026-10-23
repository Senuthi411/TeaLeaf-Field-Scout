import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text } from '../components/AppText.js';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appServices } from '../../container.js';
import { SyncStatus, isDraft, isEditable } from '../../domain/entities/Observation.js';
import { colors, radius } from '../../constants/theme.js';
import { spacing } from '../../constants/spacing.js';
import { useApp } from '../state/AppContext.js';
import { useAuth } from '../state/AuthContext.js';
import { formatFullDateTime } from '../utils/formatTime.js';
import { diseaseLabel, severityBadge, syncBadge } from '../utils/observationLabels.js';
import AppButton from '../components/AppButton.js';
import AppHeader from '../components/AppHeader.js';
import Notice from '../components/Notice.js';
import ObservationSummary from '../components/ObservationSummary.js';
import Screen from '../components/Screen.js';
import StatusBadge from '../components/StatusBadge.js';

function StateNotice({ observation }) {
  if (observation.isSample) {
    return <Notice tone="info" title="Sample record">Illustrative data. It has no photo files and was never sent to a server, even if it says “Synced”.</Notice>;
  }
  if (isDraft(observation)) return <Notice tone="info" title="Draft — not submitted">Saved only on this phone. You can still change it.</Notice>;
  if (observation.syncStatus === SyncStatus.FAILED) return <Notice tone="danger" title="Sync failed">Still saved on this phone.</Notice>;
  return <Notice tone="warning" title="Waiting to sync">Saved on this phone. Real server synchronization is not implemented yet, so it has not been sent anywhere. Submitted records are read-only.</Notice>;
}

export default function ObservationDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const { t, dataVersion } = useApp();
  const { worker } = useAuth();
  const [observation, setObservation] = useState(undefined); // undefined = loading, null = not found
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    appServices.getObservation
      .execute(String(id))
      .then((result) => !cancelled && setObservation(result && result.workerId === worker.id ? result : null)) // only the owner can open it
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [id, dataVersion, worker.id]);

  const goBack = () => (router.canGoBack() ? router.back() : router.navigate('/home'));
  const header = <AppHeader title={observation?.displayId ?? 'Observation'} subtitle="Details" onBack={goBack} />;

  if (failed || observation === null) {
    return (
      <Screen header={header}>
        <Notice tone="danger" title="Observation not found">It may have been removed from this phone.</Notice>
        <AppButton title="Back" onPress={goBack} />
      </Screen>
    );
  }
  if (!observation) {
    return (
      <Screen header={header}>
        <View style={styles.center}><ActivityIndicator color={colors.primary} /></View>
      </Screen>
    );
  }

  const severity = severityBadge(observation.symptoms.severityLevel);
  const sync = syncBadge(observation);
  const footer = isEditable(observation) ? (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <AppButton icon="create-outline" title={t('form.continue')} onPress={() => router.push({ pathname: '/observation/resume', params: { uuid: observation.uuid } })} />
    </View>
  ) : null;

  return (
    <Screen header={header} footer={footer}>
      <View style={styles.card}>
        <Text style={styles.title}>{diseaseLabel(observation.symptoms.suspectedDisease) || 'Disease not chosen yet'}</Text>
        <Text style={styles.muted}>{formatFullDateTime(observation.submittedAt ?? observation.updatedAt)}</Text>
        <View style={styles.badges}>
          <StatusBadge tone={sync.tone} icon={sync.icon}>{t(sync.labelKey)}</StatusBadge>
          {severity ? <StatusBadge tone={severity.tone} icon={severity.icon}>{severity.label}</StatusBadge> : null}
          {observation.needsRetake ? <StatusBadge tone="danger" icon="refresh">Retake required</StatusBadge> : null}
          {observation.isSample ? <StatusBadge tone="info" icon="flask">{t('dash.sample')}</StatusBadge> : null}
        </View>
      </View>
      <StateNotice observation={observation} />
      <View style={styles.card}>
        <ObservationSummary observation={observation} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { padding: 32, alignItems: 'center' },
  card: { gap: 8, padding: spacing.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card },
  title: { fontSize: 20, fontWeight: '800', color: colors.text },
  muted: { fontSize: 13, color: colors.textMuted },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  footer: { paddingHorizontal: spacing.lg, paddingTop: 12, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
});
