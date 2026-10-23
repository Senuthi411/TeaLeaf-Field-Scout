import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../components/AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getReadinessWarnings, hasDraftContent, validateForSubmission } from '../../domain/validation/observationValidation.js';
import { colors, radius, tones, fonts } from '../../constants/theme.js';
import { spacing } from '../../constants/spacing.js';
import { useApp } from '../state/AppContext.js';
import { useObservationForm } from '../state/ObservationFormContext.js';
import { useObservationActions } from '../state/useObservationActions.js';
import { useStepBack } from '../state/useStepBack.js';
import AppButton from '../components/AppButton.js';
import AppHeader from '../components/AppHeader.js';
import ConnectionBadge from '../components/ConnectionBadge.js';
import Notice from '../components/Notice.js';
import ObservationSummary from '../components/ObservationSummary.js';
import Screen from '../components/Screen.js';
import StepProgress from '../components/StepProgress.js';

// Which screen fixes which checklist item.
const FIX_ROUTE = { location: '/observation/location', photos: '/observation/gallery', disease: '/observation/symptoms', severity: '/observation/symptoms', flushPart: '/observation/symptoms' };

/** Step 4: readiness checklist and review. Save as a draft, or submit to the local queue. */
export default function ObservationReviewScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useApp();
  const { observation } = useObservationForm();
  const { busy, error, clearError, saveDraftAndExit, confirmAndSubmit, confirmDeleteDraft } = useObservationActions();
  const validation = useMemo(() => validateForSubmission(observation), [observation]);
  const warnings = useMemo(() => getReadinessWarnings(observation), [observation]);

  const back = () => router.replace('/observation/symptoms');
  useStepBack('/observation/review', back);

  if (!hasDraftContent(observation)) {
    return (
      <Screen header={<AppHeader title="Review observation" onBack={() => router.navigate('/home')} />}>
        <Notice tone="info" title="Nothing to review">Start a new observation first.</Notice>
        <AppButton title="New Leaf Observation" onPress={() => router.replace('/observation/location?new=1')} />
      </Screen>
    );
  }

  const ready = validation.isValid;
  const palette = ready ? tones.success : tones.warning;

  const footer = (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <AppButton icon="send" title={t('form.submit')} onPress={confirmAndSubmit} disabled={!ready} loading={busy} />
      <View style={styles.row}>
        <AppButton variant="secondary" icon="save-outline" title={t('form.saveDraft')} onPress={saveDraftAndExit} disabled={busy} style={styles.half} />
        <AppButton variant="danger" icon="trash-outline" title="Delete draft" onPress={confirmDeleteDraft} disabled={busy} style={styles.half} />
      </View>
      <Text style={styles.note}>Saved on this phone first. Nothing is sent to a server in this version.</Text>
    </View>
  );

  return (
    <Screen header={<AppHeader title="Review observation" subtitle={observation.displayId ?? undefined} onBack={back} right={<ConnectionBadge />} />} footer={footer}>
      <StepProgress step={4} detail="Check everything" />
      {error ? <Notice tone="danger" title={error.title} onDismiss={clearError}>{error.message}</Notice> : null}

      {ready ? (
        <Notice tone="success" title="Ready to submit">All required items are complete. Submitting saves it on this phone as “Waiting to sync”.</Notice>
      ) : (
        <Notice tone="warning" title="Not ready to submit">Fix the items marked below, or save this as a draft and finish later.</Notice>
      )}
      {warnings.map((text) => <Notice key={text} tone="info">{text}</Notice>)}

      <View style={styles.card}>
        <View style={styles.cardHead}>
          <Text style={styles.cardTitle}>Required items</Text>
          <View style={[styles.count, { backgroundColor: palette.bg }]}>
            <Text style={[styles.countText, { color: palette.text }]}>{validation.completedCount} of {validation.totalCount}</Text>
          </View>
        </View>
        {validation.checklist.map((item) => (
          <View key={item.key} style={styles.checkRow} accessible accessibilityLabel={`${item.label}: ${item.detail || (item.done ? 'done' : 'missing')}`}>
            <Ionicons name={item.done ? 'checkmark-circle' : 'alert-circle'} size={20} color={item.done ? colors.successText : colors.dangerText} />
            <Text style={[styles.checkLabel, { color: item.done ? colors.successText : colors.dangerText }]}>{item.label}</Text>
            <Text style={[styles.checkState, { color: item.done ? colors.successText : colors.dangerText }]}>{item.detail || (item.done ? 'Done' : 'Missing')}</Text>
            <AppButton compact variant="secondary" title={item.done ? 'Edit' : 'Fix'} onPress={() => router.replace(FIX_ROUTE[item.key])} style={styles.fix} />
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <ObservationSummary observation={observation} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { gap: 8, padding: spacing.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card },
  cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardTitle: { fontFamily: fonts.heading, fontSize: 16, fontWeight: '800', color: colors.text },
  count: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999 },
  countText: { fontSize: 12, fontWeight: '800' },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  checkLabel: { flex: 1, fontSize: 14, fontWeight: '600' },
  checkState: { fontSize: 13, fontWeight: '800' },
  fix: { minWidth: 64 },
  footer: { gap: 10, paddingHorizontal: spacing.lg, paddingTop: 12, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  row: { flexDirection: 'row', gap: 10 },
  half: { flex: 1 },
  note: { fontSize: 12, color: colors.textMuted, textAlign: 'center' },
});
