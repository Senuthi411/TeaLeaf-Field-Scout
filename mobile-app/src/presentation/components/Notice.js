import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from './AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { radius, tones } from '../../constants/theme.js';

const ICONS = { success: 'checkmark-circle', warning: 'warning', danger: 'alert-circle', info: 'information-circle' };

/** Inline banner for success, error, warning and info feedback. */
export default function Notice({ tone = 'info', title, children, onDismiss, style }) {
  const palette = tones[tone];
  return (
    <View
      accessibilityRole={tone === 'danger' ? 'alert' : undefined}
      accessibilityLiveRegion={tone === 'danger' ? 'assertive' : 'polite'}
      style={[styles.notice, { backgroundColor: palette.bg, borderColor: palette.border }, style]}
    >
      <Ionicons name={ICONS[tone]} size={20} color={palette.text} style={styles.icon} />
      <View style={styles.body}>
        {title ? <Text style={[styles.title, { color: palette.text }]}>{title}</Text> : null}
        {typeof children === 'string' ? <Text style={[styles.text, { color: palette.text }]}>{children}</Text> : children}
      </View>
      {onDismiss ? (
        <Pressable onPress={onDismiss} accessibilityRole="button" accessibilityLabel="Dismiss message" hitSlop={12}>
          <Ionicons name="close" size={20} color={palette.text} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  notice: { flexDirection: 'row', gap: 12, padding: 14, borderRadius: radius.control, borderWidth: 1 },
  icon: { marginTop: 1 },
  body: { flex: 1, gap: 2 },
  title: { fontSize: 15, fontWeight: '800' },
  text: { fontSize: 14, lineHeight: 20 },
});
