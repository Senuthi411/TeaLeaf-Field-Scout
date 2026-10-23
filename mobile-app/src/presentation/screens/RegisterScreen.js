import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../components/AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { appServices, config, locationHierarchy } from '../../container.js';
import { colors, fonts } from '../../constants/theme.js';
import AppButton from '../components/AppButton.js';
import AppHeader from '../components/AppHeader.js';
import ConnectionBadge from '../components/ConnectionBadge.js';
import Notice from '../components/Notice.js';
import Screen from '../components/Screen.js';
import SelectField from '../components/SelectField.js';
import TextField from '../components/TextField.js';

export default function RegisterScreen() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: '', workerCode: '', mobile: '', assignment: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);

  // One list of "Estate — Division" choices (the real list comes from the Member 1 master data).
  const assignments = useMemo(
    () =>
      locationHierarchy.flatMap((estate) =>
        estate.divisions.map((division) => ({ id: `${estate.id}|${division.id}`, name: `${estate.name} — ${division.name}`, estate, division })),
      ),
    [],
  );
  const set = (key) => (value) => setForm((previous) => ({ ...previous, [key]: value }));
  const goLogin = () => (router.canGoBack() ? router.back() : router.replace('/login'));

  const submit = async () => {
    const chosen = assignments.find((a) => a.id === form.assignment);
    setBusy(true);
    setErrors({});
    const outcome = await appServices.registerWorker.execute({
      fullName: form.fullName,
      workerCode: form.workerCode,
      mobile: form.mobile,
      estateId: chosen?.estate.id,
      divisionId: chosen?.division.id,
      divisionName: chosen?.division.name,
      password: form.password,
      confirmPassword: form.confirmPassword,
    });
    setBusy(false);
    if (outcome.ok) setResult(outcome);
    else setErrors(outcome.errors);
  };

  if (result) {
    const active = result.status === 'ACTIVE';
    return (
      <Screen header={<AppHeader title="Registration" onBack={goLogin} right={<ConnectionBadge />} />}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}><Ionicons name={active ? 'checkmark' : 'time'} size={36} color={colors.infoText} /></View>
          <Text style={styles.heroTitle}>Details saved on this phone</Text>
          <Text style={styles.muted}>{active ? 'Your account is active on this phone (development mode).' : 'Your registration is not active yet.'}</Text>
        </View>
        <Notice tone="warning" title="Not a server confirmation">
          This account is stored only on this phone. Your estate has not been notified and nothing was sent to a server.
        </Notice>
        <AppButton icon="log-in-outline" title="Back to login" onPress={() => router.replace('/login')} />
      </Screen>
    );
  }

  return (
    <Screen header={<AppHeader title="Register" onBack={goLogin} right={<ConnectionBadge />} />} avoidKeyboard>
      <Notice tone="info" title="Development mode">
        {config.auth.autoActivateRegistrations
          ? 'No server approves accounts yet. Your account is created and activated on this phone only.'
          : 'Your account will wait for approval from your estate or supervisor.'}
      </Notice>
      <TextField label="Full name" value={form.fullName} onChangeText={set('fullName')} placeholder="Your full name" autoCapitalize="words" error={errors.fullName} />
      <TextField label="Worker ID" value={form.workerCode} onChangeText={set('workerCode')} placeholder="e.g. PED-8492" autoCapitalize="characters" error={errors.workerCode} />
      <TextField label="Mobile number" value={form.mobile} onChangeText={set('mobile')} placeholder="07X XXX XXXX" keyboardType="phone-pad" error={errors.mobile} />
      <SelectField label="Estate and division" value={form.assignment} placeholder="Select estate and division" options={assignments} onChange={set('assignment')} error={errors.assignment} />
      <TextField label="Password" value={form.password} onChangeText={set('password')} secure placeholder="At least 8 characters" error={errors.password} />
      <TextField label="Confirm password" value={form.confirmPassword} onChangeText={set('confirmPassword')} secure placeholder="Repeat password" error={errors.confirmPassword} />
      {errors._form ? <Notice tone="danger" title="Could not create account">{errors._form}</Notice> : null}
      <AppButton icon="checkmark" title="Create account" onPress={submit} loading={busy} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', gap: 8, paddingVertical: 12 },
  heroIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.infoBg, alignItems: 'center', justifyContent: 'center' },
  heroTitle: { fontFamily: fonts.heading, fontSize: 22, fontWeight: '800', color: colors.text, textAlign: 'center' },
  muted: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
});
