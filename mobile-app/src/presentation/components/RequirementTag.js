import { StyleSheet, View } from 'react-native';
import { Text } from './AppText.js';
import { tones } from '../../constants/theme.js';

export default function RequirementTag({ required }) {
  const palette = required ? tones.warning : tones.neutral;
  return (
    <View style={[styles.tag, { backgroundColor: palette.bg }]}>
      <Text style={[styles.text, { color: palette.text }]}>{required ? 'Required' : 'Optional'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 },
  text: { fontSize: 11, fontWeight: '800' },
});
