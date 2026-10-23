import { StyleSheet, View } from 'react-native';
import { Text } from './AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, fonts } from '../../constants/theme.js';

/** Figma stat tile: icon + small caps label, big number, caption. Stays white; only the number is tinted. */
export default function StatCard({ icon, label, value, caption, tone = 'neutral' }) {
  const valueColor = tone === 'danger' ? colors.dangerText : tone === 'warning' ? colors.warningText : colors.text;
  return (
    <View accessible accessibilityLabel={`${label}: ${value} ${caption}`} style={styles.card}>
      <View style={styles.labelRow}>
        <Ionicons name={icon} size={14} color={colors.textMuted} />
        <Text style={styles.label} numberOfLines={1}>{label}</Text>
      </View>
      <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
      <Text style={styles.caption} numberOfLines={1}>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, padding: 12, gap: 2, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  label: { fontSize: 11, fontWeight: '600', letterSpacing: 0.6, textTransform: 'uppercase', color: colors.textMuted, flexShrink: 1 },
  value: { fontFamily: fonts.heading, fontSize: 26, fontWeight: '700' },
  caption: { fontSize: 13, color: colors.textMuted },
});
