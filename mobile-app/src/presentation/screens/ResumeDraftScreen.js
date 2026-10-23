import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { appServices, devices } from '../../container.js';
import { isEditable } from '../../domain/entities/Observation.js';
import { validateForSubmission } from '../../domain/validation/observationValidation.js';
import { colors } from '../../constants/theme.js';
import { useObservationForm } from '../state/ObservationFormContext.js';
import AppButton from '../components/AppButton.js';
import AppHeader from '../components/AppHeader.js';
import Notice from '../components/Notice.js';
import Screen from '../components/Screen.js';

/** Loads a saved draft and jumps to the first step that still needs work. */
export default function ResumeDraftScreen() {
  const router = useRouter();
  const { uuid } = useLocalSearchParams();
  const { loadDraft } = useObservationForm();
  const [problem, setProblem] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const draft = await appServices.getObservation.execute(String(uuid));
        if (cancelled) return;
        if (!draft) return setProblem('We could not find that draft on this phone.');
        if (!isEditable(draft)) return setProblem('That observation was already submitted and can no longer be edited.');
        loadDraft(draft);
        // Judge progress using only photos whose files still exist.
        const usablePhotos = Object.fromEntries(Object.entries(draft.photos).filter(([, p]) => devices.PhotoFileStore.exists(p.uri)));
        const { errors } = validateForSubmission({ ...draft, photos: usablePhotos });
        const locationBad = ['estate', 'division', 'block', 'gps'].some((k) => errors[k]);
        const photosBad = Object.keys(errors).some((k) => k.startsWith('photo_'));
        const symptomsBad = ['disease', 'severity', 'flushPart'].some((k) => errors[k]);
        router.replace(locationBad ? '/observation/location' : photosBad ? '/observation/gallery' : symptomsBad ? '/observation/symptoms' : '/observation/review');
      } catch {
        if (!cancelled) setProblem('The draft could not be loaded.');
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  return (
    <Screen header={<AppHeader title="Continue draft" onBack={() => router.navigate('/home')} />}>
      {problem ? (
        <>
          <Notice tone="danger" title="Cannot open this draft">{problem}</Notice>
          <AppButton title="Back to home" onPress={() => router.navigate('/home')} />
        </>
      ) : (
        <View style={styles.center}><ActivityIndicator color={colors.primary} /></View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({ center: { padding: 40, alignItems: 'center' } });
