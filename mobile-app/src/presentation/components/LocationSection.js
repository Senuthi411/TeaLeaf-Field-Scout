import { ActivityIndicator, Linking, StyleSheet, View } from 'react-native';
import { Text, TextInput } from './AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { GpsStatus } from '../../domain/entities/Observation.js';
import { GPS_WEAK_ACCURACY_METERS } from '../../domain/entities/observationOptions.js';
import { colors, radius, tones } from '../../constants/theme.js';
import { CONTROL_HEIGHT } from '../../constants/spacing.js';
import { findBlock, findDivision, findEstate } from '../utils/locationOptions.js';
import AppButton from './AppButton.js';
import FormField from './FormField.js';
import SelectField from './SelectField.js';
import StatusBadge from './StatusBadge.js';

function describeGps(gps, info, hasBlock) {
  switch (gps.status) {
    case GpsStatus.REQUESTING:
      return { tone: 'info', icon: 'locate', title: 'Getting your location…', text: 'This can take up to 20 seconds. Stay outdoors with a clear sky.', badge: 'Searching' };
    case GpsStatus.READY: {
      const weak = gps.accuracyMeters > GPS_WEAK_ACCURACY_METERS;
      return {
        tone: weak ? 'warning' : 'success',
        icon: 'locate',
        title: weak ? 'GPS signal is weak' : 'GPS fix received',
        text: `Accuracy ±${gps.accuracyMeters?.toFixed(1) ?? '?'} m${weak ? '. Consider moving or using a manual location.' : ''}`,
        badge: weak ? 'Weak' : 'Ready',
      };
    }
    case GpsStatus.PERMISSION_DENIED:
      return {
        tone: 'danger', icon: 'alert-circle', title: 'Location permission denied',
        text: info.canAskAgain === false ? 'Allow location for this app in Android Settings, or use a manual location.' : 'Allow location access to use GPS, or use a manual location.',
        badge: 'Denied',
      };
    case GpsStatus.SERVICES_DISABLED:
      return { tone: 'danger', icon: 'alert-circle', title: 'Device location is off', text: 'Turn on Location in your phone’s quick settings, then try again. Or use a manual location.', badge: 'Off' };
    case GpsStatus.ERROR:
      return { tone: 'danger', icon: 'alert-circle', title: 'GPS unavailable', text: info.message || 'No location could be read. Try again or use a manual location.', badge: 'Unavailable' };
    case GpsStatus.MANUAL:
      return {
        tone: 'warning', icon: 'pin', title: 'Manual location',
        text: hasBlock ? 'The pin is the approximate centre of the selected block (sample coordinates). No GPS fix is saved.' : 'Choose a block above so the pin can be placed.',
        badge: 'Manual',
      };
    default:
      return { tone: 'neutral', icon: 'locate-outline', title: 'GPS not requested yet', text: 'Tap “Get GPS location”. The app asks for permission only when you do.', badge: 'Not started' };
  }
}

function GpsCard({ gps, info, hasBlock, error, onRequestGps, onUseManual, onLayout }) {
  const view = describeGps(gps, info, hasBlock);
  const palette = tones[view.tone];
  const requesting = gps.status === GpsStatus.REQUESTING;
  const isManual = gps.status === GpsStatus.MANUAL;
  const idle = gps.status === GpsStatus.IDLE;

  return (
    <View onLayout={onLayout} style={[styles.gps, { backgroundColor: palette.bg, borderColor: error ? colors.dangerText : palette.border }]}>
      <View style={styles.gpsHead}>
        {requesting ? <ActivityIndicator color={palette.text} /> : <Ionicons name={view.icon} size={22} color={palette.text} />}
        <View style={styles.gpsCopy}>
          <Text style={[styles.gpsTitle, { color: palette.text }]}>{view.title}</Text>
          <Text style={[styles.gpsText, { color: palette.text }]}>{view.text}</Text>
        </View>
        <StatusBadge tone={view.tone}>{view.badge}</StatusBadge>
      </View>

      <View style={styles.gpsActions}>
        <AppButton
          compact variant="secondary"
          icon="locate"
          title={isManual ? 'Use GPS instead' : idle ? 'Get GPS location' : gps.status === GpsStatus.READY ? 'Refresh GPS' : 'Try again'}
          onPress={onRequestGps}
          disabled={requesting}
          style={styles.gpsAction}
        />
        {!isManual ? <AppButton compact variant="secondary" icon="pin" title="Use manual location" onPress={onUseManual} disabled={requesting} style={styles.gpsAction} /> : null}
        {gps.status === GpsStatus.PERMISSION_DENIED && info.canAskAgain === false ? (
          <AppButton compact variant="secondary" icon="settings-outline" title="Open Settings" onPress={() => Linking.openSettings()} style={styles.gpsAction} />
        ) : null}
      </View>
      {error ? <Text style={styles.error}>⚠ {error}</Text> : null}
    </View>
  );
}

export default function LocationSection({ location, onChange, hierarchy, gpsInfo, errors, onRequestGps, onUseManual, onFieldLayout }) {
  const estate = findEstate(hierarchy, location.estateId);
  const division = findDivision(hierarchy, location.estateId, location.divisionId);
  const block = findBlock(hierarchy, location.estateId, location.divisionId, location.blockId);

  return (
    <View style={styles.section}>
      <SelectField label="Estate" value={location.estateId} placeholder="Select estate" options={hierarchy} error={errors.estate}
        onLayout={onFieldLayout?.('estate')} onChange={(estateId) => onChange({ estateId, divisionId: '', blockId: '' })} />
      <SelectField label="Division" value={location.divisionId} placeholder="Select division" options={estate?.divisions ?? []} disabled={!estate} error={errors.division}
        onLayout={onFieldLayout?.('division')} onChange={(divisionId) => onChange({ divisionId, blockId: '' })} />
      <SelectField label="Block" value={location.blockId} placeholder="Select block" options={division?.blocks ?? []} disabled={!division} error={errors.block}
        onLayout={onFieldLayout?.('block')} onChange={(blockId) => onChange({ blockId })} />

      <FormField label="Row / plant tag or landmark" required={false}>
        <TextInput
          style={styles.input}
          value={location.landmark}
          onChangeText={(landmark) => onChange({ landmark })}
          placeholder="e.g. Row 14, near the stream"
          placeholderTextColor={colors.textMuted}
          maxLength={80}
          accessibilityLabel="Row, plant tag or landmark"
        />
      </FormField>

      {estate && division && block ? (
        <View style={styles.selected} accessible accessibilityLabel={`Selected location: ${estate.name}, ${division.name}, ${block.name}`}>
          <Text style={styles.selectedLabel}>SELECTED LOCATION</Text>
          <Text style={styles.selectedText}>{estate.name} › {division.name} ({division.id}) › {block.name}</Text>
        </View>
      ) : null}

      <GpsCard gps={location.gps} info={gpsInfo} hasBlock={Boolean(block)} error={errors.gps}
        onRequestGps={onRequestGps} onUseManual={onUseManual} onLayout={onFieldLayout?.('gps')} />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 16 },
  input: { minHeight: CONTROL_HEIGHT, paddingHorizontal: 12, fontSize: 16, color: colors.text, borderWidth: 1.5, borderColor: colors.borderStrong, borderRadius: radius.control, backgroundColor: colors.surface },
  selected: { padding: 12, borderRadius: radius.control, backgroundColor: colors.primarySoft, borderWidth: 1, borderColor: colors.successBorder, gap: 2 },
  selectedLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 0.6, color: colors.primaryDark },
  selectedText: { fontSize: 14, fontWeight: '700', color: colors.primaryDark },
  gps: { gap: 12, padding: 14, borderRadius: radius.control, borderWidth: 1.5 },
  gpsHead: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  gpsCopy: { flex: 1, gap: 2 },
  gpsTitle: { fontSize: 15, fontWeight: '800' },
  gpsText: { fontSize: 13, lineHeight: 18 },
  gpsActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  gpsAction: { flexGrow: 1, flexBasis: 140 },
  error: { fontSize: 13, fontWeight: '700', color: colors.dangerText },
});
