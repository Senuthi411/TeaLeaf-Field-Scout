import { StyleSheet, View } from 'react-native';
import { Text } from './AppText.js';
import { colors } from '../../constants/theme.js';

const STEPS = ['Location', 'Photos', 'Symptoms', 'Review'];

/** "Step 2 of 4 · Photos" with a segmented bar. */
export default function StepProgress({ step, detail }) {
  return (
    <View style={styles.wrap} accessible accessibilityLabel={`Step ${step} of ${STEPS.length}, ${STEPS[step - 1]}${detail ? `, ${detail}` : ''}`}>
      <Text style={styles.label}>Step {step} of {STEPS.length} · {STEPS[step - 1]}{detail ? ` · ${detail}` : ''}</Text>
      <View style={styles.bar}>
        {STEPS.map((name, index) => (
          <View key={name} style={[styles.segment, index < step && styles.done]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  label: { fontSize: 13, fontWeight: '800', color: colors.primaryDark },
  bar: { flexDirection: 'row', gap: 6 },
  segment: { flex: 1, height: 6, borderRadius: 3, backgroundColor: '#CFD8CE' },
  done: { backgroundColor: colors.primary },
});
