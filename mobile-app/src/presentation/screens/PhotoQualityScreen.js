import { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../components/AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { devices } from '../../container.js';
import { ALL_PHOTO_ANGLES, PhotoQualityStatus } from '../../domain/entities/observationOptions.js';
import { SELF_CHECKS, decidePhotoQuality, evaluateBasicQuality } from '../../domain/validation/imageQualityRules.js';
import { colors, radius, tones } from '../../constants/theme.js';
import { spacing } from '../../constants/spacing.js';
import { useObservationForm } from '../state/ObservationFormContext.js';
import { useObservationActions } from '../state/useObservationActions.js';
import { useStepBack } from '../state/useStepBack.js';
import AppButton from '../components/AppButton.js';
import AppHeader from '../components/AppHeader.js';
import ConnectionBadge from '../components/ConnectionBadge.js';
import Notice from '../components/Notice.js';
import Screen from '../components/Screen.js';
import StatusBadge from '../components/StatusBadge.js';

const CHECK_BADGE = {
  passed: { tone: 'success', icon: 'checkmark-circle', label: 'PASSED' },
  warning: { tone: 'warning', icon: 'warning', label: 'WARNING' },
  failed: { tone: 'danger', icon: 'alert-circle', label: 'FAILED' },
};

const OUTCOME = {
  INCOMPLETE: { tone: 'info', title: 'Check your photo', text: 'Look at the preview and answer the three questions.' },
  PASSED: { tone: 'success', title: 'Photo looks good', text: 'The automatic checks passed and you confirmed the photo is clear.' },
  RETAKE_RECOMMENDED: { tone: 'danger', title: 'This photo may not be clear enough', text: 'Retaking it gives the supervisor and expert a better chance to identify the problem.' },
  RETAKE_REQUIRED: { tone: 'danger', title: 'This photo cannot be used', text: 'It is too small to inspect for disease. Please retake it.' },
};

/**
 * Step 2b: photo quality check. Only file metadata (resolution, size) is measured automatically.
 * Blur, glare and framing are NOT analysed by the app, so the worker answers them from the preview.
 */
export default function PhotoQualityScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { pendingCapture, setPendingCapture, setPhoto, form } = useObservationForm();
  const { autosave } = useObservationActions();
  const [answers, setAnswers] = useState({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pendingCapture) router.replace('/observation/gallery');
  }, [pendingCapture, router]);

  const basic = useMemo(() => (pendingCapture ? evaluateBasicQuality(pendingCapture) : null), [pendingCapture]);
  const decision = useMemo(() => (basic ? decidePhotoQuality(basic, answers) : null), [basic, answers]);

  const retake = () => {
    const angle = pendingCapture?.angle;
    setPendingCapture(null);
    router.replace({ pathname: '/observation/camera', params: { angle } });
  };
  useStepBack('/observation/quality', retake);

  if (!pendingCapture || !basic || !decision) return <Screen header={<AppHeader title="Photo quality check" />}><View /></Screen>;

  const label = ALL_PHOTO_ANGLES.find((a) => a.angle === pendingCapture.angle)?.label ?? 'Photo';
  const outcome = OUTCOME[decision.outcome];
  const palette = tones[outcome.tone];

  const accept = async (qualityStatus) => {
    setBusy(true);
    setError(null);
    try {
      const uri = await devices.PhotoFileStore.persist(pendingCapture.uri, { observationUuid: form.uuid, angle: pendingCapture.angle });
      setPhoto(pendingCapture.angle, {
        uri,
        fileName: uri.split('/').pop(),
        width: pendingCapture.width,
        height: pendingCapture.height,
        sizeBytes: pendingCapture.sizeBytes,
        capturedAt: new Date().toISOString(),
        source: pendingCapture.source,
        qualityStatus,
        qualityNotes: decision.issues,
      });
      setPendingCapture(null);
      await autosave();
      router.replace('/observation/gallery');
    } catch (e) {
      setError(`The photo could not be saved on this phone. ${e?.message ?? ''}`.trim());
    } finally {
      setBusy(false);
    }
  };

  const footer = (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {decision.outcome === 'PASSED' ? (
        <AppButton icon="arrow-forward" title="Continue" onPress={() => accept(PhotoQualityStatus.PASSED)} loading={busy} />
      ) : (
        <>
          <AppButton icon="refresh" title="Retake photo" onPress={retake} disabled={busy} />
          {decision.outcome === 'RETAKE_RECOMMENDED' ? (
            <AppButton variant="secondary" title="Proceed anyway" onPress={() => accept(PhotoQualityStatus.UNCERTAIN)} loading={busy} />
          ) : null}
        </>
      )}
      <Text style={styles.note}>
        {decision.outcome === 'RETAKE_RECOMMENDED'
          ? 'If you proceed, this photo is tagged UNCERTAIN and an expert should verify it.'
          : decision.outcome === 'RETAKE_REQUIRED'
            ? 'Proceeding is not allowed for this photo. Retake it to continue.'
            : decision.outcome === 'INCOMPLETE'
              ? 'Answer all three questions to continue.'
              : 'The photo is copied into app storage when you continue.'}
      </Text>
    </View>
  );

  return (
    <Screen header={<AppHeader title="Photo quality check" onBack={retake} right={<ConnectionBadge />} />} footer={footer}>
      <View style={[styles.preview, { borderColor: palette.text }]}>
        <Image source={{ uri: pendingCapture.uri }} style={styles.image} resizeMode="contain" accessibilityLabel={`Preview of the ${label.toLowerCase()} photo`} />
        <View style={styles.previewTag}><Text style={styles.previewTagText}>{label}</Text></View>
      </View>

      <Notice tone={outcome.tone} title={outcome.title}>{outcome.text}</Notice>

      <View style={styles.card}>
        <View style={styles.cardHead}>
          <Text style={styles.cardTitle}>Automatic checks</Text>
          <Text style={styles.muted}>file details only</Text>
        </View>
        {basic.checks.map((check) => {
          const badge = CHECK_BADGE[check.status];
          return (
            <View key={check.key} style={styles.checkRow}>
              <View style={styles.flex}>
                <Text style={styles.checkTitle}>{check.title}</Text>
                <Text style={styles.muted}>{check.message}</Text>
              </View>
              <StatusBadge tone={badge.tone} icon={badge.icon}>{badge.label}</StatusBadge>
            </View>
          );
        })}
        <Text style={styles.caption}>Blur, lighting and framing are not analysed by the app. Please judge them below.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your check</Text>
        {SELF_CHECKS.map((item) => {
          const answer = answers[item.key];
          return (
            <View key={item.key} style={styles.selfRow}>
              <Text style={styles.checkTitle}>{item.question}</Text>
              <View style={styles.yesNo} accessibilityRole="radiogroup">
                {[true, false].map((value) => {
                  const selected = answer === value;
                  return (
                    <Pressable key={String(value)} onPress={() => setAnswers((a) => ({ ...a, [item.key]: value }))} accessibilityRole="radio"
                      accessibilityLabel={`${item.title}: ${value ? 'yes' : 'no'}`} accessibilityState={{ checked: selected }}
                      style={[styles.choice, selected && (value ? styles.yes : styles.no)]}>
                      <Text style={[styles.choiceText, selected && styles.choiceTextOn]}>{selected ? '✓ ' : ''}{value ? 'Yes' : 'No'}</Text>
                    </Pressable>
                  );
                })}
              </View>
              {answer === false ? <Text style={styles.tip}><Ionicons name="bulb-outline" size={13} /> {item.tip}</Text> : null}
            </View>
          );
        })}
      </View>

      {error ? <Notice tone="danger" title="Could not save the photo">{error}</Notice> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  preview: { height: 260, borderRadius: radius.card, borderWidth: 3, overflow: 'hidden', backgroundColor: '#0E1710' },
  image: { width: '100%', height: '100%' },
  previewTag: { position: 'absolute', left: 10, top: 10, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: 'rgba(0,0,0,0.65)' },
  previewTagText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  card: { gap: 10, padding: spacing.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card },
  cardHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '800', color: colors.text },
  muted: { fontSize: 13, color: colors.textMuted },
  caption: { fontSize: 12, color: colors.textMuted },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  selfRow: { gap: 8, paddingTop: 6 },
  yesNo: { flexDirection: 'row', gap: 8 },
  choice: { flex: 1, minHeight: 44, borderRadius: radius.control, borderWidth: 1.5, borderColor: colors.borderStrong, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  yes: { backgroundColor: colors.successBg, borderColor: colors.successText },
  no: { backgroundColor: colors.dangerBg, borderColor: colors.dangerText },
  choiceText: { fontSize: 15, fontWeight: '700', color: colors.text },
  choiceTextOn: { fontWeight: '800' },
  tip: { fontSize: 13, color: colors.warningText },
  footer: { gap: 10, paddingHorizontal: spacing.lg, paddingTop: 12, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  note: { fontSize: 12, color: colors.textMuted, textAlign: 'center' },
});
