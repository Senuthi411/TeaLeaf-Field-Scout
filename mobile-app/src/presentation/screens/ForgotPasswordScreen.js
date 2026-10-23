import { useState } from 'react';
import { useRouter } from 'expo-router';
import { appServices } from '../../container.js';
import AppButton from '../components/AppButton.js';
import AppHeader from '../components/AppHeader.js';
import ConnectionBadge from '../components/ConnectionBadge.js';
import Notice from '../components/Notice.js';
import Screen from '../components/Screen.js';
import TextField from '../components/TextField.js';

/** DEVELOPMENT MODE password reset (verifies the registered mobile number). Needs a server in production. */
export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [form, setForm] = useState({ workerCode: '', mobile: '', newPassword: '' });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const set = (key) => (value) => setForm((previous) => ({ ...previous, [key]: value }));
  const goLogin = () => (router.canGoBack() ? router.back() : router.replace('/login'));

  const submit = async () => {
    setBusy(true);
    setErrors({});
    const result = await appServices.resetLocalPassword.execute(form);
    setBusy(false);
    if (result.ok) setDone(true);
    else setErrors(result.errors);
  };

  return (
    <Screen header={<AppHeader title="Reset password" onBack={goLogin} right={<ConnectionBadge />} />} avoidKeyboard>
      <Notice tone="warning" title="Development-mode reset">
        A real reset needs the server or your supervisor, which is not available yet. Here the reset only checks the mobile number you registered with. This is not secure enough for production.
      </Notice>
      {done ? (
        <>
          <Notice tone="success" title="Password changed on this phone">You can now log in with the new password.</Notice>
          <AppButton title="Back to login" icon="log-in-outline" onPress={() => router.replace('/login')} />
        </>
      ) : (
        <>
          <TextField label="Worker ID" value={form.workerCode} onChangeText={set('workerCode')} placeholder="e.g. PED-8492" autoCapitalize="characters" error={errors.workerCode} />
          <TextField label="Registered mobile number" value={form.mobile} onChangeText={set('mobile')} placeholder="07X XXX XXXX" keyboardType="phone-pad" error={errors.mobile} />
          <TextField label="New password" value={form.newPassword} onChangeText={set('newPassword')} secure placeholder="At least 8 characters" error={errors.newPassword} />
          {errors._form ? <Notice tone="danger" title="Could not reset">{errors._form}</Notice> : null}
          <AppButton title="Reset password" icon="key-outline" onPress={submit} loading={busy} />
        </>
      )}
    </Screen>
  );
}
