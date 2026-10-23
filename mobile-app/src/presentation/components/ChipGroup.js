import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from './AppText.js';
import { colors } from '../../constants/theme.js';
import FormField from './FormField.js';

/** Single- or multi-select chips. Selected state is shown by colour, a check mark and a11y state. */
export default function ChipGroup({
  label, hint, options, value, onChange, multiple = false, required, error, allowClear = false, onLayout,
}) {
  const selected = multiple ? value : value ? [value] : [];

  const toggle = (optionValue) => {
    if (multiple) {
      onChange(selected.includes(optionValue) ? selected.filter((v) => v !== optionValue) : [...selected, optionValue]);
    } else {
      onChange(optionValue);
    }
  };

  return (
    <FormField label={label} hint={hint} required={required} error={error} onLayout={onLayout}>
      <View style={styles.row}>
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          return (
            <Pressable
              key={option.value}
              onPress={() => toggle(option.value)}
              accessibilityRole={multiple ? 'checkbox' : 'radio'}
              accessibilityState={{ checked: isSelected, selected: isSelected }}
              accessibilityLabel={option.label}
              style={[styles.chip, isSelected && styles.chipSelected, error && !isSelected && styles.chipError]}
            >
              <Text style={[styles.text, isSelected && styles.textSelected]}>
                {isSelected ? '✓ ' : ''}
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {allowClear && selected.length > 0 ? (
        <Pressable onPress={() => onChange(multiple ? [] : '')} accessibilityRole="button" hitSlop={8}>
          <Text style={styles.clear}>Clear selection</Text>
        </Pressable>
      ) : null}
    </FormField>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  chipError: { borderColor: colors.dangerText },
  text: { fontSize: 15, fontWeight: '500', color: colors.text },
  textSelected: { fontWeight: '800', color: colors.primaryDark },
  clear: { fontSize: 14, fontWeight: '700', color: colors.primaryDark, textDecorationLine: 'underline' },
});
