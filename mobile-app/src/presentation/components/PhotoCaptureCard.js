import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { Text } from './AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../../constants/theme.js';
import AppButton from './AppButton.js';
import RequirementTag from './RequirementTag.js';

/**
 * One required photo category. Camera capture, gallery pick, replace and remove.
 * "Saving photo…" is a local copy into app storage. No upload happens (no backend yet).
 */
export default function PhotoCaptureCard({ index, label, hint, photo, busy, error, onTake, onPick, onRemove, onLayout }) {
  const [imageFailed, setImageFailed] = useState(false);
  useEffect(() => setImageFailed(false), [photo?.uri]);

  return (
    <View onLayout={onLayout} style={[styles.card, photo && styles.filled, error && styles.error]}>
      <View style={styles.header}>
        <View style={styles.index}>
          <Text style={styles.indexText}>{index}</Text>
        </View>
        <Text style={styles.title} accessibilityRole="header">
          {label}
        </Text>
        <RequirementTag required />
      </View>
      <Text style={styles.hint}>{hint}</Text>

      <View style={styles.preview}>
        {busy ? (
          <View style={styles.center}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.previewText}>Saving photo on this phone…</Text>
          </View>
        ) : photo && !imageFailed ? (
          <Image
            source={{ uri: photo.uri }}
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel={`Preview of the ${label.toLowerCase()} photo`}
            onError={() => setImageFailed(true)}
          />
        ) : photo ? (
          <View style={styles.center}>
            <Ionicons name="alert-circle" size={28} color={colors.dangerText} />
            <Text style={styles.previewText}>Photo file is missing. Retake or replace it.</Text>
          </View>
        ) : (
          <View style={styles.center}>
            <Ionicons name="image-outline" size={30} color={colors.textMuted} />
            <Text style={styles.previewText}>No photo added yet</Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <AppButton compact variant="secondary" icon={photo ? 'refresh' : 'camera'} title={photo ? 'Retake' : 'Take photo'} onPress={onTake} disabled={busy} style={styles.action} />
        <AppButton compact variant="secondary" icon="images-outline" title={photo ? 'Replace' : 'Gallery'} onPress={onPick} disabled={busy} style={styles.action} />
        {photo ? <AppButton compact variant="danger" icon="trash-outline" title="Remove" onPress={onRemove} disabled={busy} style={styles.action} /> : null}
      </View>

      {error ? <Text style={styles.errorText}>⚠ {error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: 10, padding: 14, borderRadius: radius.card, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.borderStrong, backgroundColor: '#FAFCFA' },
  filled: { borderStyle: 'solid', borderColor: colors.border, backgroundColor: colors.surface },
  error: { borderColor: colors.dangerText },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  index: { width: 26, height: 26, borderRadius: 13, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  indexText: { fontSize: 13, fontWeight: '800', color: colors.primaryDark },
  title: { flex: 1, fontSize: 16, fontWeight: '700', color: colors.text },
  hint: { fontSize: 13, color: colors.textMuted },
  preview: { height: 190, borderRadius: radius.control, overflow: 'hidden', backgroundColor: '#EEF2EE' },
  image: { width: '100%', height: '100%' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6, padding: 12 },
  previewText: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  action: { flexGrow: 1, flexBasis: 100 },
  errorText: { fontSize: 13, fontWeight: '700', color: colors.dangerText },
});
