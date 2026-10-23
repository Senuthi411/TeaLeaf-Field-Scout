import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { Text } from './AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../../constants/theme.js';
import { CONTROL_HEIGHT } from '../../constants/spacing.js';

const VARIANTS = {
  primary: { bg: colors.primary, pressed: colors.primaryDark, text: '#FFFFFF', border: colors.primary },
  secondary: { bg: colors.surface, pressed: colors.primarySoft, text: colors.primaryDark, border: colors.primary },
  danger: { bg: colors.surface, pressed: colors.dangerBg, text: colors.dangerText, border: colors.dangerText },
};

export default function AppButton({ title, onPress, icon, variant = 'primary', disabled, loading, compact, style }) {
  const palette = VARIANTS[variant];
  const inactive = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive, busy: loading }}
      accessibilityLabel={title}
      onPress={onPress}
      disabled={inactive}
      android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
      style={({ pressed }) => [
        styles.button,
        compact && styles.compact,
        {
          backgroundColor: inactive ? colors.disabledBg : pressed ? palette.pressed : palette.bg,
          borderColor: inactive ? colors.disabledBg : palette.border,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.text} />
      ) : icon ? (
        <Ionicons name={icon} size={20} color={inactive ? colors.disabledText : palette.text} />
      ) : null}
      <Text style={[styles.title, { color: inactive ? colors.disabledText : palette.text }]} numberOfLines={2}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: CONTROL_HEIGHT,
    paddingHorizontal: 16,
    borderRadius: radius.control,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  compact: { minHeight: 44, paddingHorizontal: 12 },
  title: { fontSize: 15, fontWeight: '700', textAlign: 'center', flexShrink: 1 },
});
