import { StyleSheet, View } from 'react-native';
import { Text } from '../components/AppText.js';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { validateForSubmission } from '../../domain/validation/observationValidation.js';
import { colors, radius } from '../../constants/theme.js';
import { spacing } from '../../constants/spacing.js';
import { useObservationForm } from '../state/ObservationFormContext.js';
import { useObservationActions } from '../state/useObservationActions.js';
import { useStepBack } from '../state/useStepBack.js';
import AppButton from '../components/AppButton.js';
import AppHeader from '../components/AppHeader.js';
import ConnectionBadge from '../components/ConnectionBadge.js';
import Notice from '../components/Notice.js';
import Screen from '../components/Screen.js';
import StepProgress from '../components/StepProgress.js';
import SymptomSection from '../components/SymptomSection.js';

/** Step 3: structured symptom checklist. */
export default function SymptomChecklistScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { form, observation, updateSymptoms } = useObservationForm();
  const { autosave, saveDraftAndExit, busy, error, clearError } = useObservationActions();

  const back = () => router.replace('/observation/gallery');
  useStepBack('/observation/symptoms', back);

  const errors = validateForSubmission(observation).errors;
  const doneCount = ['disease', 'severity', 'flushPart'].filter((k) => !errors[k]).length;
  const complete = doneCount === 3;

  const review = async () => {
    const result = await autosave();
    if (result.ok) router.replace('/observation/review');
  };

  const footer = (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.row}>
        <AppButton variant="secondary" icon="save-outline" title="Save Draft" onPress={saveDraftAndExit} disabled={busy} style={styles.half} />
        <AppButton icon="eye-outline" title="Review Observation" onPress={review} disabled={!complete || busy} style={styles.half} />
      </View>
      <Text style={styles.note}>{complete ? 'All required symptom fields are done.' : `${doneCount} of 3 required fields complete`}</Text>
    </View>
  );

  return (
    <Screen header={<AppHeader title="Symptom checklist" subtitle={observation.displayId ?? undefined} onBack={back} right={<ConnectionBadge />} />} footer={footer} avoidKeyboard>
      <StepProgress step={3} detail={`${doneCount} of 3 required done`} />
      {error ? <Notice tone="danger" title={error.title} onDismiss={clearError}>{error.message}</Notice> : null}
      <View style={styles.card}>
        <SymptomSection symptoms={form.symptoms} onChange={updateSymptoms} errors={{}} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { padding: spacing.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card },
  footer: { gap: 8, paddingHorizontal: spacing.lg, paddingTop: 12, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  row: { flexDirection: 'row', gap: 10 },
  half: { flex: 1 },
  note: { fontSize: 12, color: colors.textMuted, textAlign: 'center' },
});
