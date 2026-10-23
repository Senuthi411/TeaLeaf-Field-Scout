import { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, View } from 'react-native';
import { Text } from './AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius } from '../../constants/theme.js';
import { CONTROL_HEIGHT } from '../../constants/spacing.js';
import FormField from './FormField.js';

/** Dropdown built on a bottom-sheet Modal (no extra picker package). options: [{ id, name }] */
export default function SelectField({ label, value, placeholder, options, onChange, error, disabled, required = true, onLayout }) {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const selected = options.find((option) => option.id === value);

  return (
    <FormField label={label} required={required} error={error} onLayout={onLayout}>
      <Pressable
        onPress={() => setOpen(true)}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${selected ? selected.name : placeholder}`}
        accessibilityState={{ disabled }}
        style={[styles.control, disabled && styles.disabled, error && styles.controlError]}
      >
        <Text style={[styles.value, !selected && styles.placeholder]} numberOfLines={1}>
          {selected ? selected.name : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
      </Pressable>

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)} statusBarTranslucent>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)} accessibilityLabel="Close list" />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 8 }]}>
          <Text style={styles.sheetTitle}>{label}</Text>
          <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isSelected = item.id === value;
              return (
                <Pressable
                  onPress={() => {
                    onChange(item.id);
                    setOpen(false);
                  }}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  style={[styles.option, isSelected && styles.optionSelected]}
                >
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{item.name}</Text>
                  {isSelected ? <Ionicons name="checkmark" size={20} color={colors.primaryDark} /> : null}
                </Pressable>
              );
            }}
          />
        </View>
      </Modal>
    </FormField>
  );
}

const styles = StyleSheet.create({
  control: {
    minHeight: CONTROL_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    borderRadius: radius.control,
    backgroundColor: colors.surface,
  },
  controlError: { borderColor: colors.dangerText },
  disabled: { backgroundColor: '#F1F3F1', opacity: 0.7 },
  value: { flex: 1, fontSize: 16, color: colors.text },
  placeholder: { color: colors.textMuted },
  backdrop: { flex: 1, backgroundColor: colors.overlay },
  sheet: {
    maxHeight: '70%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.card,
    borderTopRightRadius: radius.card,
    paddingTop: 16,
  },
  sheetTitle: { fontSize: 18, fontWeight: '700', paddingHorizontal: 20, paddingBottom: 8, color: colors.text },
  option: { minHeight: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  optionSelected: { backgroundColor: colors.primarySoft },
  optionText: { fontSize: 16, color: colors.text, flex: 1 },
  optionTextSelected: { fontWeight: '800', color: colors.primaryDark },
});
