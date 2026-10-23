import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../components/AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appServices } from '../../container.js';
import { countPhotos } from '../../domain/validation/observationValidation.js';
import { colors, radius, fonts } from '../../constants/theme.js';
import { spacing } from '../../constants/spacing.js';
import { useApp } from '../state/AppContext.js';
import { useStepBack } from '../state/useStepBack.js';
import AppButton from '../components/AppButton.js';
import AppHeader from '../components/AppHeader.js';
import ConnectionBadge from '../components/ConnectionBadge.js';
import Notice from '../components/Notice.js';
import Screen from '../components/Screen.js';
import StatusBadge from '../components/StatusBadge.js';

/** Confirmation after saving a draft or submitting to the local queue. */
export default function ObservationSavedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { uuid, kind } = useLocalSearchParams();
  const { isOnline, t } = useApp();
  const [observation, setObservation] = useState(null);
  const isDraft = kind === 'draft';

  useEffect(() => {
    appServices.getObservation.execute(String(uuid)).then(setObservation).catch(() => {});
  }, [uuid]);

  const home = () => router.navigate('/home');
  useStepBack('/observation/saved', home);

  const footer = (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <AppButton icon="sync" title="View offline queue" onPress={() => router.navigate('/sync')} />
      <AppButton variant="secondary" icon="add" title="Start new observation" onPress={() => router.replace('/observation/location?new=1')} />
      <AppButton variant="secondary" icon="home-outline" title="Back to home" onPress={home} />
    </View>
  );

  return (
    <Screen header={<AppHeader title="Observation saved" right={<ConnectionBadge />} />} footer={footer}>
      <View style={styles.hero}>
        <View style={styles.heroIcon}><Ionicons name="phone-portrait-outline" size={40} color={colors.warningText} /></View>
        <Text style={styles.title}>{isDraft ? 'Draft saved on this phone' : 'Saved on this phone'}</Text>
        <StatusBadge tone={isDraft ? 'neutral' : 'warning'} icon={isDraft ? 'document-text' : 'cloud-offline'}>
          {isDraft ? t('status.draft') : t('status.waiting')}
        </StatusBadge>
        <Text style={styles.text}>
          {isDraft
            ? 'You can continue this draft any time from Home. It has not been submitted.'
            : `${isOnline ? 'Real server synchronization is not implemented yet.' : 'You are offline.'} This observation is stored on your phone and has not been sent to a server.`}
        </Text>
      </View>

      {observation ? (
        <View style={styles.card}>
          {[
            ['Observation ID', observation.displayId],
            ['Location', [observation.location.divisionId, observation.location.blockId].filter(Boolean).join(' · ') || 'Not set'],
            ['Photos', `${countPhotos(observation.photos)} of 3 saved on phone`],
            ['Status', isDraft ? 'Draft' : 'Waiting to sync'],
          ].map(([label, value]) => (
            <View key={label} style={styles.row}>
              <Text style={styles.rowLabel}>{label}</Text>
              <Text style={styles.rowValue}>{value}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {!isDraft ? (
        <Notice tone="info" title="Nothing is lost if you close the app">
          Open the offline queue to see this record. When a backend exists, waiting records can be synchronized from there.
        </Notice>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', gap: 10, paddingVertical: 12 },
  heroIcon: { width: 84, height: 84, borderRadius: 42, backgroundColor: colors.warningBg, alignItems: 'center', justifyContent: 'center' },
  title: { fontFamily: fonts.heading, fontSize: 24, fontWeight: '800', color: colors.text, textAlign: 'center' },
  text: { fontSize: 14, lineHeight: 20, color: colors.textMuted, textAlign: 'center' },
  card: { padding: spacing.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 16, paddingVertical: 8 },
  rowLabel: { fontSize: 14, color: colors.textMuted },
  rowValue: { flex: 1, textAlign: 'right', fontSize: 14, fontWeight: '800', color: colors.text },
  footer: { gap: 10, paddingHorizontal: spacing.lg, paddingTop: 12, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
});
