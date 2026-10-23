import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from './AppText.js';
import { colors, radius } from '../../constants/theme.js';
import { useApp } from '../state/AppContext.js';

const SHORT = { en: 'EN', si: 'සිං', ta: 'தமிழ்' };
const FULL = { en: 'English', si: 'Sinhala', ta: 'Tamil' };

/** EN | සිං | தமிழ் switch used on the login screens. */
export default function LanguageSegmented() {
  const { language, setLanguage } = useApp();
  return (
    <View style={styles.row} accessibilityRole="radiogroup">
      {Object.keys(SHORT).map((code) => {
        const selected = code === language;
        return (
          <Pressable key={code} onPress={() => setLanguage(code)} accessibilityRole="radio" accessibilityLabel={FULL[code]} accessibilityState={{ selected }}
            style={[styles.segment, selected && styles.selected]}>
            <Text style={[styles.text, selected && styles.textSelected]}>{SHORT[code]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', borderRadius: radius.control, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, overflow: 'hidden' },
  segment: { minHeight: 40, minWidth: 52, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
  selected: { backgroundColor: colors.primary },
  text: { fontSize: 14, fontWeight: '700', color: colors.text },
  textSelected: { color: '#FFFFFF' },
});
