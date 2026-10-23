import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme.js';

// Icon-only logo placeholder, as in the Figma: leaf outline in a dashed green rounded square.
// Replace with the real logo asset when available.
export default function Logo({ size = 40 }) {
  return (
    <View
      accessible
      accessibilityLabel="TeaLeaf Field Scout logo (placeholder)"
      style={[styles.box, { width: size, height: size, borderRadius: size * 0.3 }]}
    >
      <Ionicons name="leaf-outline" size={size * 0.52} color={colors.primaryDark} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primarySoft, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.primary },
});
