import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from './AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../constants/theme.js';
import { spacing, TOUCH_TARGET } from '../../constants/spacing.js';
import Logo from './Logo.js';

/** Brand header (no onBack) or page header with a back button. `right` is any trailing element. */
export default function AppHeader({ title, subtitle, onBack, right }) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back" style={styles.back}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
      ) : (
        <Logo size={40} />
      )}
      <View style={styles.titles}>
        <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  back: { width: TOUCH_TARGET - 4, height: TOUCH_TARGET - 4, alignItems: 'center', justifyContent: 'center' },
  titles: { flex: 1 },
  title: { fontFamily: fonts.heading, fontSize: 18, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 12, color: colors.textMuted },
});
