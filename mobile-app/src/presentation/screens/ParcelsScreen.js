import { StyleSheet, View } from 'react-native';
import { Text } from '../components/AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../../constants/theme.js';
import { useApp } from '../state/AppContext.js';
import AppHeader from '../components/AppHeader.js';
import BottomNavigation from '../components/BottomNavigation.js';
import ConnectionBadge from '../components/ConnectionBadge.js';
import Screen from '../components/Screen.js';

/** Placeholder: parcel / block maps are not part of the initial scope. */
export default function ParcelsScreen() {
  const { t } = useApp();
  return (
    <Screen header={<AppHeader title={t('nav.parcels')} subtitle="Coming soon" right={<ConnectionBadge />} />} footer={<BottomNavigation active="parcels" />}>
      <View style={styles.card}>
        <Ionicons name="map-outline" size={44} color={colors.primary} />
        <Text style={styles.title}>Parcels are not built yet</Text>
        <Text style={styles.text}>
          This screen is reserved for your assigned divisions, blocks and boundaries. It needs the Member 1 master data
          (estates, divisions, blocks), which is not available without a backend.
        </Text>
        <Text style={styles.text}>For now, choose estate, division and block inside the observation form (sample data).</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', gap: 10, padding: 28, backgroundColor: colors.surface, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.borderStrong, borderRadius: radius.card },
  title: { fontSize: 18, fontWeight: '800', color: colors.text, textAlign: 'center' },
  text: { fontSize: 14, color: colors.textMuted, textAlign: 'center', lineHeight: 20 },
});
