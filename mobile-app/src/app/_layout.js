import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text } from '../presentation/components/AppText.js';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useApp } from '../presentation/state/AppContext.js';
import { AuthProvider, useAuth } from '../presentation/state/AuthContext.js';
import { ObservationFormProvider } from '../presentation/state/ObservationFormContext.js';
import AppButton from '../presentation/components/AppButton.js';
import { colors } from '../constants/theme.js';

SplashScreen.preventAutoHideAsync().catch(() => {});

function Gate() {
  const { ready, initError, retryInit } = useApp();
  const { restoring } = useAuth();
  // Inter (body) + Poppins (headings) from the shared design system. If a font fails to load we continue with the system font.
  const [fontsLoaded, fontError] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Poppins_600SemiBold, Poppins_700Bold });
  const loaded = ready && !restoring && (fontsLoaded || Boolean(fontError));

  useEffect(() => {
    if (loaded || initError) SplashScreen.hideAsync().catch(() => {});
  }, [loaded, initError]);

  if (initError) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>The local database could not be opened</Text>
        <Text style={styles.text}>{initError}</Text>
        <AppButton title="Try again" onPress={retryInit} />
      </View>
    );
  }
  if (!loaded) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }
  return <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AuthProvider>
          <ObservationFormProvider>
            <Gate />
          </ObservationFormProvider>
        </AuthProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24, backgroundColor: colors.background },
  title: { fontSize: 18, fontWeight: '800', color: colors.text, textAlign: 'center' },
  text: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
});
