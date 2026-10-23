import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../components/AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { config } from '../../container.js';
import { colors, fonts } from '../../constants/theme.js';
import { useApp } from '../state/AppContext.js';
import { useAuth } from '../state/AuthContext.js';
import AppButton from '../components/AppButton.js';
import ConnectionBadge from '../components/ConnectionBadge.js';
import LanguageSegmented from '../components/LanguageSegmented.js';
import Logo from '../components/Logo.js';
import Notice from '../components/Notice.js';
import Screen from '../components/Screen.js';
import TextField from '../components/TextField.js';

function describeFailure(result) {
  switch (result.code) {
    case 'NO_LOCAL_ACCOUNT':
      return {
        tone: 'warning',
        title: result.isOnline ? 'No account on this phone' : 'Online sign-in needed',
        message: result.isOnline
          ? 'Server sign-in is not available yet (development mode), so only accounts created on this phone can sign in. Register on this phone first.'
          : 'No saved credentials for this Worker ID on this phone. Server sign-in is not available yet; register on this phone in development mode.',
      };
    case 'NOT_ACTIVE':
      return { tone: 'warning', title: 'Account not active', message: 'This account is waiting for approval from your estate or supervisor.' };
    case 'LOCKED':
      return { tone: 'danger', title: 'Account locked', message: `Too many wrong passwords. Try again after ${new Date(result.lockedUntil).toLocaleTimeString()}.` };
    case 'BAD_PASSWORD':
      return { tone: 'danger', title: 'Incorrect password', message: `${result.attemptsLeft} ${result.attemptsLeft === 1 ? 'attempt' : 'attempts'} left. Try again.` };
    default:
      return null;
  }
}

/** Figma layout: language switch + status, logo, fields, forgot link, login, offline note, register, footer. */
export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, isOnline } = useApp();
  const { signIn } = useAuth();
  const [workerCode, setWorkerCode] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [failure, setFailure] = useState(null);

  const submit = async () => {
    setBusy(true);
    setFailure(null);
    setFieldErrors({});
    try {
      const result = await signIn(workerCode, password);
      if (result.ok) {
        router.replace('/home');
        return;
      }
      if (result.code === 'INVALID_INPUT') setFieldErrors(result.errors);
      else setFailure(describeFailure(result));
    } catch (error) {
      setFailure({ tone: 'danger', title: 'Could not sign in', message: error?.message ?? 'Unexpected error.' });
    } finally {
      setBusy(false);
    }
  };

  const footer = (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <View style={styles.footerItem}>
        <Ionicons name="construct-outline" size={16} color={colors.textMuted} />
        <Text style={styles.footerText}>Development mode</Text>
      </View>
      <View style={styles.footerItem}>
        <Ionicons name="server-outline" size={16} color={colors.textMuted} />
        <Text style={styles.footerText}>Local database on this phone</Text>
      </View>
    </View>
  );

  return (
    <Screen header={<View />} footer={footer} avoidKeyboard contentStyle={styles.content}>
      <View style={styles.top}>
        <LanguageSegmented />
        <ConnectionBadge />
      </View>

      <View style={styles.brand}>
        <Logo size={62} />
        <Text style={styles.title} accessibilityRole="header">{t('app.name')}</Text>
        <Text style={styles.subtitle}>{t('login.subtitle')}</Text>
      </View>

      {failure ? <Notice tone={failure.tone} title={failure.title}>{failure.message}</Notice> : null}

      <TextField label={t('login.workerId')} value={workerCode} onChangeText={setWorkerCode} icon="person-outline" placeholder="e.g. PED-8492"
        autoCapitalize="characters" error={fieldErrors.workerCode} returnKeyType="next" />
      <TextField label={t('login.password')} value={password} onChangeText={setPassword} icon="lock-closed-outline" secure placeholder="Enter your password"
        error={fieldErrors.password} returnKeyType="go" onSubmitEditing={submit} />

      <Pressable onPress={() => router.push('/forgot-password')} accessibilityRole="button" hitSlop={8} style={styles.forgot} disabled={busy}>
        <Text style={styles.forgotText}>{t('login.forgot')}</Text>
      </Pressable>

      <AppButton icon="log-in-outline" title={isOnline ? t('login.submit') : `${t('login.submit')} (offline)`} onPress={submit} loading={busy} />

      <Notice tone="info" title="Offline login">
        Works with accounts saved on this phone. No internet is needed, and there is no login server yet.
      </Notice>

      <Text style={styles.noAccount}>{t('login.noAccount')}</Text>
      <AppButton variant="secondary" icon="person-outline" title={t('login.register')} onPress={() => router.push('/register')} disabled={busy} />

      <Pressable
        onPress={() => { setWorkerCode(config.demoAccount.workerCode); setPassword(config.demoAccount.password); }}
        accessibilityRole="button"
        accessibilityLabel="Fill in the demo account"
        disabled={busy}
        style={styles.demo}
      >
        <Text style={styles.demoText}>Demo account (sample data): {config.demoAccount.workerCode} · <Text style={styles.demoLink}>Fill in</Text></Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 12, gap: 14 },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { alignItems: 'center', gap: 8, paddingVertical: 4 },
  title: { fontFamily: fonts.heading, fontSize: 24, fontWeight: '600', color: colors.text, textAlign: 'center' },
  subtitle: { fontSize: 15, color: colors.textMuted, textAlign: 'center' },
  forgot: { alignSelf: 'flex-end', minHeight: 36, justifyContent: 'center' },
  forgotText: { fontSize: 15, fontWeight: '700', color: colors.primaryDark },
  noAccount: { textAlign: 'center', fontSize: 15, color: colors.textMuted },
  demo: { alignSelf: 'center', minHeight: 40, justifyContent: 'center' },
  demoText: { fontSize: 12, color: colors.textMuted, textAlign: 'center' },
  demoLink: { fontWeight: '700', color: colors.primaryDark, textDecorationLine: 'underline' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingHorizontal: 16, paddingTop: 10, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerText: { fontSize: 12, color: colors.textMuted },
});
