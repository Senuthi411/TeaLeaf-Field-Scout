import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from './AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, shadows } from '../../constants/theme.js';
import { useApp } from '../state/AppContext.js';

const ITEMS = [
  { key: 'home', labelKey: 'nav.home', icon: 'home', path: '/home' },
  { key: 'history', labelKey: 'nav.history', icon: 'time', path: '/history' },
  { key: 'new', labelKey: 'nav.new', icon: 'add', path: '/observation/location?new=1', primary: true },
  { key: 'parcels', labelKey: 'nav.parcels', icon: 'map', path: '/parcels' },
  { key: 'sync', labelKey: 'nav.sync', icon: 'sync', path: '/sync' },
];

/** Home, History, New observation, Parcels and Sync. `active` is one of the item keys. */
export default function BottomNavigation({ active }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useApp();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]} accessibilityRole="tablist">
      {ITEMS.map((item) => {
        const isActive = item.key === active;
        const tint = isActive ? colors.primaryDark : colors.textMuted;
        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityLabel={t(item.labelKey)}
            accessibilityState={{ selected: isActive }}
            onPress={() => router.navigate(item.path)}
            style={styles.item}
          >
            {item.primary ? (
              <View style={styles.fab}>
                <Ionicons name={item.icon} size={30} color="#FFFFFF" />
              </View>
            ) : (
              <Ionicons name={isActive ? item.icon : `${item.icon}-outline`} size={24} color={tint} />
            )}
            <Text style={[styles.label, { color: item.primary ? colors.primaryDark : tint }, isActive && styles.labelActive]}>
              {t(item.labelKey)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 6,
  },
  item: { flex: 1, minHeight: 56, alignItems: 'center', justifyContent: 'center', gap: 2 },
  label: { fontSize: 12, fontWeight: '600' },
  labelActive: { fontWeight: '800' },
  fab: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginTop: -24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.raised,
  },
});
