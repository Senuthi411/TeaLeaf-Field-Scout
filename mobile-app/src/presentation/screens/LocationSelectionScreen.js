import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../components/AppText.js';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { locationHierarchy } from '../../container.js';
import { validateForSubmission } from '../../domain/validation/observationValidation.js';
import { colors } from '../../constants/theme.js';
import { spacing } from '../../constants/spacing.js';
import { useObservationForm } from '../state/ObservationFormContext.js';
import { useObservationActions } from '../state/useObservationActions.js';
import { useGpsCapture } from '../state/useGpsCapture.js';
import { useStepBack } from '../state/useStepBack.js';
import AppButton from '../components/AppButton.js';
import AppHeader from '../components/AppHeader.js';
import ConnectionBadge from '../components/ConnectionBadge.js';
import LocationSection from '../components/LocationSection.js';
import Notice from '../components/Notice.js';
import Screen from '../components/Screen.js';
import StepProgress from '../components/StepProgress.js';

const LOCATION_KEYS = ['estate', 'division', 'block', 'gps'];

/** Step 1: estate / division / block, optional landmark, GPS or manual location. */
export default function LocationSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { new: isNew } = useLocalSearchParams();
  const ctx = useObservationForm();
  const { observation, form } = ctx;
  const { gpsInfo, requestGps, useManualLocation } = useGpsCapture();
  const { busy, error, clearError, autosave } = useObservationActions();

  // A brand-new observation starts from a clean form; "Edit location" from review keeps it.
  useEffect(() => {
    if (isNew) ctx.startNew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew]);

  const goHome = () => router.navigate('/home');
  useStepBack('/observation/location', goHome);

  const errors = validateForSubmission(observation).errors;
  const locationErrors = Object.fromEntries(LOCATION_KEYS.filter((k) => errors[k]).map((k) => [k, errors[k]]));
  const ready = LOCATION_KEYS.every((k) => !errors[k]);

  const proceed = async () => {
    const result = await autosave(); // keep a draft so nothing is lost if the app closes
    if (!result.ok) return;
    const next = ctx.firstMissingAngle();
    router.replace(next ? { pathname: '/observation/camera', params: { angle: next } } : '/observation/gallery');
  };

  const footer = (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <AppButton icon="camera" title="Proceed to Camera Capture" onPress={proceed} disabled={!ready} loading={busy} />
      <Text style={styles.note}>
        {ready ? 'A draft is saved on this phone as you go.' : 'Select a block and get a GPS location (or use a manual location) to continue.'}
      </Text>
    </View>
  );

  return (
    <Screen header={<AppHeader title="Confirm location" onBack={goHome} right={<ConnectionBadge />} />} footer={footer} avoidKeyboard>
      <StepProgress step={1} detail={ready ? 'Location set' : 'Location needed'} />
      {error ? <Notice tone="danger" title={error.title} onDismiss={clearError}>{error.message}</Notice> : null}
      <View style={styles.card}>
        <LocationSection
          location={form.location}
          onChange={ctx.updateLocation}
          hierarchy={locationHierarchy}
          gpsInfo={gpsInfo}
          errors={locationErrors}
          onRequestGps={requestGps}
          onUseManual={useManualLocation}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { padding: spacing.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16 },
  footer: { gap: 8, paddingHorizontal: spacing.lg, paddingTop: 12, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  note: { fontSize: 12, color: colors.textMuted, textAlign: 'center' },
});
