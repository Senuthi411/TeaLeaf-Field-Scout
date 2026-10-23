import { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Text } from './AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { ALL_PHOTO_ANGLES, REQUIRED_PHOTO_ANGLES } from '../../domain/entities/observationOptions.js';
import { colors, radius } from '../../constants/theme.js';
import PhotoViewerModal from './PhotoViewerModal.js';
import { colourLabel, diseaseLabel, flushPartsLabel, gpsSummary, severityLabel, shapeLabel } from '../utils/observationLabels.js';

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, !value && styles.muted]}>{value || 'Not provided'}</Text>
    </View>
  );
}

function PhotoTile({ label, photo, isSample, onOpen }) {
  const [failed, setFailed] = useState(false);
  let content;
  let state;
  if (photo && !failed) {
    content = <Image source={{ uri: photo.uri }} style={styles.photoImage} resizeMode="cover" onError={() => setFailed(true)} accessibilityLabel={`${label} photo`} />;
    state = 'Added';
  } else if (photo) {
    content = <Ionicons name="alert-circle" size={24} color={colors.dangerText} />;
    state = 'File missing';
  } else {
    content = <Ionicons name={isSample ? 'image-outline' : 'alert-circle'} size={24} color={isSample ? colors.textMuted : colors.dangerText} />;
    state = isSample ? 'Sample (none)' : 'Missing';
  }
  return (
    <Pressable style={styles.photoTile} onPress={photo ? onOpen : undefined} disabled={!photo} accessibilityRole={photo ? 'button' : undefined} accessibilityLabel={photo ? `Open ${label} photo` : `${label}: ${state}`}>
      <View style={[styles.photoFrame, !photo && !isSample && styles.photoMissing]}>{content}</View>
      <Text style={styles.photoLabel} numberOfLines={1}>{label}</Text>
      <Text style={styles.photoState}>{state}</Text>
    </Pressable>
  );
}

/** Read-only summary for the review and details screens. */
export default function ObservationSummary({ observation }) {
  const { location, symptoms, photos } = observation;
  const [viewing, setViewing] = useState(null);
  // Required angles always; optional angles only when a photo exists.
  const tiles = ALL_PHOTO_ANGLES.filter((a) => REQUIRED_PHOTO_ANGLES.includes(a) || photos?.[a.angle]);
  return (
    <View style={styles.summary}>
      <Text style={styles.heading}>LOCATION</Text>
      <View>
        <Row label="Estate" value={location.estateName} />
        <Row label="Division" value={location.divisionName ? `${location.divisionName} (${location.divisionId})` : ''} />
        <Row label="Block" value={location.blockName} />
        <Row label="Landmark" value={location.landmark} />
        <Row label="GPS" value={gpsSummary(location.gps)} />
      </View>

      <Text style={styles.heading}>PHOTOS</Text>
      <View style={styles.photos}>
        {tiles.map(({ angle, label }) => (
          <PhotoTile key={angle} label={label} photo={photos?.[angle]} isSample={observation.isSample} onOpen={() => setViewing({ photo: photos[angle], label })} />
        ))}
      </View>

      <Text style={styles.heading}>SYMPTOMS</Text>
      <View>
        <Row label="Suspected pathology" value={diseaseLabel(symptoms.suspectedDisease)} />
        <Row label="Severity" value={severityLabel(symptoms.severityLevel)} />
        <Row label="Flush part" value={flushPartsLabel(symptoms.flushParts)} />
        <Row label="Lesion colour" value={colourLabel(symptoms.lesionColour)} />
        <Row label="Lesion shape" value={shapeLabel(symptoms.lesionShape)} />
        <Row label="Field notes" value={symptoms.notes} />
      </View>
      <PhotoViewerModal photo={viewing?.photo} title={viewing?.label ?? ''} onClose={() => setViewing(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  summary: { gap: 8 },
  heading: { fontSize: 12, fontWeight: '800', letterSpacing: 0.8, color: colors.textMuted, marginTop: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 16, paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowLabel: { fontSize: 14, color: colors.textMuted },
  rowValue: { flex: 1, textAlign: 'right', fontSize: 14, fontWeight: '700', color: colors.text },
  muted: { color: colors.textMuted, fontWeight: '400' },
  photos: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  photoTile: { flexGrow: 1, flexBasis: '28%', maxWidth: '48%', alignItems: 'center', gap: 2 },
  photoFrame: { width: '100%', aspectRatio: 1, borderRadius: radius.control, backgroundColor: '#EEF2EE', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  photoMissing: { backgroundColor: colors.dangerBg },
  photoImage: { width: '100%', height: '100%' },
  photoLabel: { fontSize: 12, fontWeight: '700', color: colors.text },
  photoState: { fontSize: 12, color: colors.textMuted },
});
