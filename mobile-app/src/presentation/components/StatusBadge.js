import { StyleSheet, View } from 'react-native';
import { Text } from './AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { tones } from '../../constants/theme.js';

/** Pill with icon + text so status never relies on colour alone. */
export default function StatusBadge({ tone = 'neutral', icon, children, style }) {
  const palette = tones[tone];
  return (
    <View style={[styles.badge, { backgroundColor: palette.bg }, style]}>
      {icon ? <Ionicons name={icon} size={14} color={palette.text} /> : null}
      <Text style={[styles.text, { color: palette.text }]} numberOfLines={1}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  text: { fontSize: 12, fontWeight: '700' },
});
