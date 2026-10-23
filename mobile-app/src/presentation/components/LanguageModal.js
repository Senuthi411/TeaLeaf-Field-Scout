import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Text } from './AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius } from '../../constants/theme.js';
import { LANGUAGES } from '../i18n/translations.js';
import { useApp } from '../state/AppContext.js';

/** Bottom-sheet language chooser (English, Sinhala, Tamil). */
export default function LanguageModal({ visible, onClose }) {
  const { language, setLanguage, t } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel={t('common.close')} />
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        <Text style={styles.title} accessibilityRole="header">{t('lang.choose')}</Text>
        {LANGUAGES.map((item) => {
          const selected = item.code === language;
          return (
            <Pressable
              key={item.code}
              onPress={() => { setLanguage(item.code); onClose(); }}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={`${item.label} ${item.nativeLabel}`}
              style={[styles.option, selected && styles.selected]}
            >
              <View>
                <Text style={styles.native}>{item.nativeLabel}</Text>
                <Text style={styles.english}>{item.label}</Text>
              </View>
              {selected ? <Ionicons name="checkmark-circle" size={24} color={colors.primary} /> : null}
            </Pressable>
          );
        })}
        <Text style={styles.note}>Only navigation, the dashboard and main form buttons are translated so far.</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: colors.overlay },
  sheet: { backgroundColor: colors.surface, borderTopLeftRadius: radius.card, borderTopRightRadius: radius.card, padding: 20, gap: 10 },
  title: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 4 },
  option: { minHeight: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderRadius: radius.control, borderWidth: 1.5, borderColor: colors.borderStrong },
  selected: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  native: { fontSize: 18, fontWeight: '700', color: colors.text },
  english: { fontSize: 13, color: colors.textMuted },
  note: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
});
