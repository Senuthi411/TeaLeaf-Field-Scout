import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Text } from './AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { isEditable } from '../../domain/entities/Observation.js';
import { colors, radius, fonts } from '../../constants/theme.js';
import { useApp } from '../state/AppContext.js';
import { formatFullDateTime, formatRelativeTime } from '../utils/formatTime.js';
import { diseaseLabel, locationLabel, severityBadge, syncBadge } from '../utils/observationLabels.js';
import AppButton from './AppButton.js';
import StatusBadge from './StatusBadge.js';

function Thumb({ observation }) {
  const photo = observation.photos?.TOP_OF_LEAF ?? Object.values(observation.photos ?? {})[0];
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [photo?.uri]);
  return (
    <View style={styles.thumb}>
      {photo && !failed ? (
        <Image source={{ uri: photo.uri }} style={styles.thumbImage} resizeMode="cover" onError={() => setFailed(true)} accessibilityLabel="Leaf photo" />
      ) : (
        <Ionicons name="image-outline" size={24} color={colors.textMuted} />
      )}
    </View>
  );
}

/**
 * Figma submission card: location line, thumbnail, disease + risk badge, time and sync badge.
 * variant "compact" (Home): the whole card opens details. variant "detailed" (History): adds a date and a Details button.
 */
export default function ObservationCard({ observation, onViewDetails, onContinueDraft, variant = 'compact' }) {
  const { t } = useApp();
  const severity = severityBadge(observation.symptoms.severityLevel);
  const sync = syncBadge(observation);
  const title = diseaseLabel(observation.symptoms.suspectedDisease) || 'Disease not chosen';
  const timestamp = observation.submittedAt ?? observation.updatedAt;
  const detailed = variant === 'detailed';

  return (
    <Pressable
      onPress={() => onViewDetails(observation)}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${locationLabel(observation.location)}. View details`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={14} color={colors.textMuted} />
        <Text style={styles.location} numberOfLines={1}>{locationLabel(observation.location)}</Text>
        {detailed ? <Text style={styles.id}>{observation.displayId}</Text> : null}
      </View>

      <View style={styles.body}>
        <Thumb observation={observation} />
        <View style={styles.main}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            {severity ? <StatusBadge tone={severity.tone} icon={severity.icon}>{severity.label}</StatusBadge> : null}
          </View>
          <View style={styles.metaRow}>
            <View style={styles.time}>
              <Ionicons name="time-outline" size={14} color={colors.textMuted} />
              <Text style={styles.timeText}>{detailed ? formatFullDateTime(timestamp) : formatRelativeTime(timestamp)}</Text>
            </View>
            <StatusBadge tone={sync.tone} icon={sync.icon}>{t(sync.labelKey)}</StatusBadge>
          </View>
        </View>
      </View>

      {observation.needsRetake || observation.isSample ? (
        <View style={styles.extras}>
          {observation.needsRetake ? <StatusBadge tone="danger" icon="refresh">Retake required</StatusBadge> : null}
          {observation.isSample ? <StatusBadge tone="info" icon="flask">{t('dash.sample')}</StatusBadge> : null}
        </View>
      ) : null}

      {isEditable(observation) || detailed ? (
        <View style={styles.actions}>
          {detailed ? <AppButton compact variant="secondary" icon="chevron-forward" title="Details" onPress={() => onViewDetails(observation)} style={styles.action} /> : null}
          {isEditable(observation) ? <AppButton compact icon="create-outline" title="Continue draft" onPress={() => onContinueDraft(observation)} style={styles.action} /> : null}
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { gap: 10, padding: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card },
  pressed: { backgroundColor: '#F4F7F4' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  location: { flex: 1, fontSize: 13, color: colors.textMuted },
  id: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  body: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  thumb: { width: 64, height: 64, borderRadius: radius.control, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.borderStrong, backgroundColor: '#EEF1F4', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  thumbImage: { width: '100%', height: '100%' },
  main: { flex: 1, gap: 8 },
  titleRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
  title: { fontFamily: fonts.heading, fontSize: 17, fontWeight: '600', color: colors.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' },
  time: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  timeText: { fontSize: 13, color: colors.textMuted },
  extras: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  actions: { flexDirection: 'row', gap: 8 },
  action: { flex: 1 },
});
