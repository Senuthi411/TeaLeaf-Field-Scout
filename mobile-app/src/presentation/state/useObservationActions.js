import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { appServices, devices } from '../../container.js';
import { useApp } from './AppContext.js';
import { useObservationForm } from './ObservationFormContext.js';

/** Autosave, save-draft, submit and delete-draft flows shared by the observation screens. */
export function useObservationActions() {
  const router = useRouter();
  const { notifyDataChanged, showFlash } = useApp();
  const { buildObservation, markSaved, startNew, form } = useObservationForm();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => setError(null), []);

  /** Persists the current form as a draft without leaving the screen (so a crash loses nothing). */
  const autosave = useCallback(async () => {
    const result = await appServices.saveDraft.execute(buildObservation());
    if (result.ok) {
      markSaved(result.observation);
      notifyDataChanged();
    }
    return result;
  }, [buildObservation, markSaved, notifyDataChanged]);

  const showSaved = useCallback(
    (observation, kind) => router.replace({ pathname: '/observation/saved', params: { uuid: observation.uuid, kind } }),
    [router],
  );

  const saveDraftAndExit = useCallback(async () => {
    setBusy(true);
    setError(null);
    const result = await autosave();
    setBusy(false);
    if (!result.ok) {
      setError({ title: 'Draft not saved', message: result.errors._form ?? result.errors.notes ?? 'The draft could not be saved.' });
      return false;
    }
    showSaved(result.observation, 'draft');
    return true;
  }, [autosave, showSaved]);

  const submitNow = useCallback(async () => {
    setBusy(true);
    setError(null);
    const result = await appServices.createObservation.execute(buildObservation());
    setBusy(false);
    if (!result.ok) {
      setError({ title: 'Observation not submitted', message: result.errors._form ?? 'Some required items are still missing.' });
      return false;
    }
    markSaved(result.observation);
    notifyDataChanged();
    showSaved(result.observation, 'submitted');
    return true;
  }, [buildObservation, markSaved, notifyDataChanged, showSaved]);

  const confirmAndSubmit = useCallback(() => {
    Alert.alert(
      'Save this observation?',
      'After you submit, it can no longer be edited. It is saved on this phone as “Waiting to sync”. Nothing is sent to a server in this version.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes, submit', onPress: submitNow },
      ],
    );
  }, [submitNow]);

  const confirmDeleteDraft = useCallback(() => {
    Alert.alert('Delete this draft?', 'The draft and its photos will be removed from this phone. This cannot be undone.', [
      { text: 'Keep draft', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const result = await appServices.deleteDraft.execute(form.uuid);
          if (!result.ok) {
            setError({ title: 'Could not delete', message: result.error });
            return;
          }
          result.photoUris.forEach((uri) => devices.PhotoFileStore.remove(uri));
          startNew();
          notifyDataChanged();
          showFlash({ tone: 'info', title: 'Draft deleted', message: 'The draft was removed from this phone.' });
          router.navigate('/home');
        },
      },
    ]);
  }, [form.uuid, startNew, notifyDataChanged, showFlash, router]);

  return { busy, error, clearError, autosave, saveDraftAndExit, confirmAndSubmit, confirmDeleteDraft };
}
