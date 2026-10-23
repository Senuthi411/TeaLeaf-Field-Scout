import { useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { Text } from '../components/AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OPTIONAL_PHOTO_ANGLES, REQUIRED_PHOTO_ANGLES } from '../../domain/entities/observationOptions.js';
import { countPhotos } from '../../domain/validation/observationValidation.js';
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
import StatusBadge from '../components/StatusBadge.js';
import StepProgress from '../components/StepProgress.js';

function Thumb({ photo }) {
  const [failed, setFailed] = useState(false);
  return (
    <View style={styles.thumb}>
      {photo && !failed ? (
        <Image source={{ uri: photo.uri }} style={styles.thumbImage} resizeMode="cover" onError={() => setFailed(true)} accessibilityLabel="Photo preview" />
      ) : (
        <Ionicons name={photo ? 'alert-circle' : 'image-outline'} size={26} color={photo ? colors.dangerText : colors.textMuted} />
      )}
    </View>
  );
}

function Slot({ item, photo, required, onCapture, onRetake, onDelete }) {
  return (
    <View style={[styles.slot, !photo && required && styles.slotMissing]}>
      <View style={styles.slotRow}>
        <Thumb photo={photo} />
        <View style={styles.flex}>
          <View style={styles.slotHead}>
            <Text style={styles.slotTitle}>{item.label}</Text>
            <Text style={required ? styles.req : styles.opt}>{required ? 'REQUIRED' : 'OPTIONAL'}</Text>
          </View>
          {photo ? (
            <View style={styles.badges}>
              <StatusBadge tone="success" icon="phone-portrait-outline">Saved on this phone</StatusBadge>
              {photo.qualityStatus === 'UNCERTAIN' ? <StatusBadge tone="warning" icon="help-circle">Uncertain quality</StatusBadge> : null}
            </View>
          ) : (
            <Text style={styles.muted}>{item.hint}</Text>
          )}
        </View>
      </View>
      {photo ? (
        <View style={styles.actions}>
          <AppButton compact variant="secondary" icon="refresh" title="Retake" onPress={onRetake} style={styles.action} />
          <AppButton compact variant="danger" icon="trash-outline" title="Delete" onPress={onDelete} style={styles.action} />
        </View>
      ) : (
        <AppButton compact icon="camera" title={`Capture ${item.label.toLowerCase()}`} onPress={onCapture} />
      )}
    </View>
  );
}

/** Step 2c: all angles at a glance. Add, retake, delete, then continue. */
export default function CaptureGalleryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { form, observation, missingAngles, removePhoto } = useObservationForm();
  const { autosave, error, clearError } = useObservationActions();
  const count = countPhotos(form.photos);
  const complete = count === REQUIRED_PHOTO_ANGLES.length;
  const nextMissing = REQUIRED_PHOTO_ANGLES.find((a) => !form.photos[a.angle]);

  const back = () => router.replace('/observation/location');
  useStepBack('/observation/gallery', back);

  const capture = (angle) => router.replace({ pathname: '/observation/camera', params: { angle } });
  const confirmDelete = (item) =>
    Alert.alert(`Delete the ${item.label.toLowerCase()} photo?`, 'It will be removed from this observation.', [
      { text: 'Keep', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => { removePhoto(item.angle); setTimeout(autosave, 0); } },
    ]);
  const next = async () => {
    const result = await autosave();
    if (result.ok) router.replace('/observation/symptoms');
  };

  const footer = (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <AppButton icon="arrow-forward" title="Continue to Checklist" onPress={next} disabled={!complete} />
      <Text style={styles.note}>{complete ? 'All 3 required photos are saved on this phone.' : `${count} of 3 saved · ${nextMissing?.label} needed`}</Text>
    </View>
  );

  return (
    <Screen header={<AppHeader title="Capture gallery" subtitle={observation.displayId ?? undefined} onBack={back} right={<ConnectionBadge />} />} footer={footer}>
      <StepProgress step={2} detail={`${count} of 3 photos saved`} />
      <Text style={styles.muted}>Capture all 3 angles: top of leaf, underside and wider view.</Text>
      {error ? <Notice tone="danger" title={error.title} onDismiss={clearError}>{error.message}</Notice> : null}
      {missingAngles.length > 0 ? (
        <Notice tone="warning" title="Some saved photos are missing">
          {`The file for ${missingAngles.length === 1 ? 'one photo' : `${missingAngles.length} photos`} could not be found on this phone (app data may have been cleared). Please capture ${missingAngles.length === 1 ? 'it' : 'them'} again.`}
        </Notice>
      ) : null}
      {REQUIRED_PHOTO_ANGLES.map((item) => (
        <Slot key={item.angle} item={item} required photo={form.photos[item.angle]} onCapture={() => capture(item.angle)} onRetake={() => capture(item.angle)} onDelete={() => confirmDelete(item)} />
      ))}
      {OPTIONAL_PHOTO_ANGLES.map((item) => (
        <Slot key={item.angle} item={item} required={false} photo={form.photos[item.angle]} onCapture={() => capture(item.angle)} onRetake={() => capture(item.angle)} onDelete={() => confirmDelete(item)} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  muted: { fontSize: 13, color: colors.textMuted },
  slot: { gap: 12, padding: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card },
  slotMissing: { borderStyle: 'dashed', borderColor: '#E0A93B', borderWidth: 1.5 },
  slotRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  slotHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 4 },
  slotTitle: { flex: 1, fontSize: 16, fontWeight: '800', color: colors.text },
  req: { fontSize: 11, fontWeight: '800', color: colors.warningText },
  opt: { fontSize: 11, fontWeight: '800', color: colors.neutralText },
  badges: { gap: 6 },
  thumb: { width: 76, height: 76, borderRadius: radius.control, backgroundColor: '#EEF2EE', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  thumbImage: { width: '100%', height: '100%' },
  actions: { flexDirection: 'row', gap: 8 },
  action: { flex: 1 },
  footer: { gap: 8, paddingHorizontal: spacing.lg, paddingTop: 12, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  note: { fontSize: 12, color: colors.textMuted, textAlign: 'center' },
});
