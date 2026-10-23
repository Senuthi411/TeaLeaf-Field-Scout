import { StyleSheet, View } from 'react-native';
import { Text } from './AppText.js';
import { colors } from '../../constants/theme.js';
import RequirementTag from './RequirementTag.js';

/** Label row (with Required/Optional tag), hint, content and inline error. */
export default function FormField({ label, required, hint, error, children, onLayout }) {
  return (
    <View style={styles.field} onLayout={onLayout}>
      <View style={styles.labelRow}>
        <Text style={styles.label} accessibilityRole="header">
          {label}
        </Text>
        {required !== undefined ? <RequirementTag required={required} /> : null}
      </View>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      {children}
      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          ⚠ {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 8 },
  labelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  label: { flex: 1, fontSize: 16, fontWeight: '700', color: colors.text },
  hint: { fontSize: 13, color: colors.textMuted },
  error: { fontSize: 13, fontWeight: '700', color: colors.dangerText },
});
