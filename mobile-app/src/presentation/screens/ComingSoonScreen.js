import { StyleSheet, View } from 'react-native';
import { Text } from '../components/AppText.js';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/theme.js';
import AppHeader from '../components/AppHeader.js';
import BottomNavigation from '../components/BottomNavigation.js';
import ConnectionBadge from '../components/ConnectionBadge.js';
import Screen from '../components/Screen.js';

/**
 * Blank placeholder for pages that are not part of the presentation (see config.presentationMode).
 * `tab` shows the bottom navigation; without it the page gets a back button.
 */
export default function ComingSoonScreen({ title, tab }) {
  const router = useRouter();
  const goBack = () => (router.canGoBack() ? router.back() : router.navigate('/home'));
  return (
    <Screen
      scroll={false}
      header={<AppHeader title={title} onBack={tab ? undefined : goBack} right={<ConnectionBadge />} />}
      footer={tab ? <BottomNavigation active={tab} /> : null}
    >
      <View style={styles.blank}>
        <Text style={styles.text}>Coming soon</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  blank: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 14, color: colors.textMuted },
});
