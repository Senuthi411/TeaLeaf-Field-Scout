import { Pressable, StyleSheet, View } from 'react-native';
import { Text, TextInput } from './AppText.js';
import { Ionicons } from '@expo/vector-icons';
import {
  DISEASE_OPTIONS, FLUSH_PART_OPTIONS, LESION_COLOUR_OPTIONS, LESION_SHAPE_OPTIONS, MAX_NOTES_LENGTH, SEVERITY_OPTIONS,
} from '../../domain/entities/observationOptions.js';
import { colors, radius, tones } from '../../constants/theme.js';
import ChipGroup from './ChipGroup.js';
import FormField from './FormField.js';

const SEVERITY_VIEW = {
  LOW: { icon: 'checkmark-circle', tone: 'success' },
  MODERATE: { icon: 'warning', tone: 'warning' },
  HIGH: { icon: 'alert-circle', tone: 'danger' },
};

export default function SymptomSection({ symptoms, onChange, errors, onFieldLayout }) {
  return (
    <View style={styles.section}>
      <ChipGroup label="Suspected pathology" hint="Your best guess in the field. This is not a confirmed diagnosis."
        options={DISEASE_OPTIONS} value={symptoms.suspectedDisease} onChange={(v) => onChange({ suspectedDisease: v })}
        required error={errors.disease} onLayout={onFieldLayout?.('disease')} />

      <FormField label="Severity" required error={errors.severity} onLayout={onFieldLayout?.('severity')}>
        <View style={styles.severityList} accessibilityRole="radiogroup">
          {SEVERITY_OPTIONS.map((option) => {
            const checked = symptoms.severityLevel === option.value;
            const view = SEVERITY_VIEW[option.value];
            const palette = tones[view.tone];
            return (
              <Pressable
                key={option.value}
                onPress={() => onChange({ severityLevel: option.value })}
                accessibilityRole="radio"
                accessibilityLabel={`${option.label}: ${option.description}`}
                accessibilityState={{ checked, selected: checked }}
                style={[styles.severity, checked && { backgroundColor: palette.bg, borderColor: palette.text }, errors.severity && !checked && styles.severityError]}
              >
                <View style={[styles.radio, checked && { borderColor: palette.text }]}>
                  {checked ? <View style={[styles.radioDot, { backgroundColor: palette.text }]} /> : null}
                </View>
                <View style={styles.severityCopy}>
                  <Text style={styles.severityName}>{option.label}</Text>
                  <Text style={styles.severityDesc}>{option.description}</Text>
                </View>
                <Ionicons name={view.icon} size={22} color={checked ? palette.text : colors.textMuted} />
              </Pressable>
            );
          })}
        </View>
      </FormField>

      <ChipGroup label="Affected flush part" hint="Select every part that shows symptoms."
        options={FLUSH_PART_OPTIONS} value={symptoms.flushParts} onChange={(v) => onChange({ flushParts: v })}
        multiple required error={errors.flushPart} onLayout={onFieldLayout?.('flushPart')} />

      <ChipGroup label="Lesion colour" options={LESION_COLOUR_OPTIONS} value={symptoms.lesionColour}
        onChange={(v) => onChange({ lesionColour: v })} required={false} allowClear />

      <ChipGroup label="Lesion shape / pattern" options={LESION_SHAPE_OPTIONS} value={symptoms.lesionShape}
        onChange={(v) => onChange({ lesionShape: v })} required={false} allowClear />

      <FormField label="Field notes" required={false} error={errors.notes} onLayout={onFieldLayout?.('notes')}>
        <TextInput
          style={styles.notes}
          value={symptoms.notes}
          onChangeText={(notes) => onChange({ notes })}
          placeholder="e.g. Spots mostly near the bud, after recent rain…"
          placeholderTextColor={colors.textMuted}
          multiline
          textAlignVertical="top"
          maxLength={MAX_NOTES_LENGTH}
          accessibilityLabel="Field notes"
        />
        <Text style={styles.count}>{symptoms.notes.length} / {MAX_NOTES_LENGTH}</Text>
      </FormField>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 20 },
  severityList: { gap: 8 },
  severity: { minHeight: 60, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.control, borderWidth: 1.5, borderColor: colors.borderStrong, backgroundColor: colors.surface },
  severityError: { borderColor: colors.dangerText },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.borderStrong, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
  severityCopy: { flex: 1 },
  severityName: { fontSize: 16, fontWeight: '800', color: colors.text },
  severityDesc: { fontSize: 13, color: colors.textMuted },
  notes: { minHeight: 110, padding: 12, fontSize: 16, color: colors.text, borderWidth: 1.5, borderColor: colors.borderStrong, borderRadius: radius.control, backgroundColor: colors.surface },
  count: { alignSelf: 'flex-end', fontSize: 12, color: colors.textMuted },
});
