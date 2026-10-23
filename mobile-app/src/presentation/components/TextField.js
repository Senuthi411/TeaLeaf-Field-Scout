import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TextInput } from './AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../../constants/theme.js';
import { CONTROL_HEIGHT } from '../../constants/spacing.js';
import FormField from './FormField.js';

/** Labelled text input with optional leading icon, show/hide for passwords, hint and error. */
export default function TextField({ label, value, onChangeText, error, hint, icon, secure, required, ...inputProps }) {
  const [hidden, setHidden] = useState(Boolean(secure));
  return (
    <FormField label={label} required={required} hint={hint} error={error}>
      <View style={[styles.box, error && styles.boxError]}>
        {icon ? <Ionicons name={icon} size={20} color={colors.textMuted} /> : null}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidden}
          placeholderTextColor={colors.textMuted}
          accessibilityLabel={label}
          autoCapitalize="none"
          autoCorrect={false}
          {...inputProps}
        />
        {secure ? (
          <Pressable onPress={() => setHidden((h) => !h)} accessibilityRole="button" accessibilityLabel={hidden ? 'Show password' : 'Hide password'} hitSlop={10}>
            <Ionicons name={hidden ? 'eye-outline' : 'eye-off-outline'} size={22} color={colors.textMuted} />
          </Pressable>
        ) : null}
      </View>
    </FormField>
  );
}

const styles = StyleSheet.create({
  box: { minHeight: CONTROL_HEIGHT, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12, borderWidth: 1.5, borderColor: colors.borderStrong, borderRadius: radius.control, backgroundColor: colors.surface },
  boxError: { borderColor: colors.dangerText },
  input: { flex: 1, fontSize: 16, color: colors.text, paddingVertical: 10 },
});
