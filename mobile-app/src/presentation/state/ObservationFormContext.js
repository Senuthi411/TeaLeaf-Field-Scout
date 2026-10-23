import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { devices, locationHierarchy } from '../../container.js';
import { REQUIRED_PHOTO_ANGLES } from '../../domain/entities/observationOptions.js';
import { applyLocationPatch, createInitialForm, formFromObservation, observationFromForm } from '../utils/observationFormMapper.js';
import { useAuth } from './AuthContext.js';

const FormContext = createContext(null);
const NO_WORKER = { id: null, defaultEstateId: '', defaultDivisionId: '', defaultBlockId: '' };
const uriSet = (photos) => new Set(Object.values(photos).map((photo) => photo.uri));

/**
 * Holds the in-progress observation across the flow screens (location → camera → quality → gallery →
 * symptoms → review). It also owns photo file housekeeping: files that were never saved are deleted when
 * replaced/removed/discarded; files a saved draft already references are deleted only after the next save.
 * `pendingCapture` is a photo that was just taken but not yet accepted on the quality screen.
 */
export function ObservationFormProvider({ children }) {
  const { worker } = useAuth();
  const workerRef = useRef(worker ?? NO_WORKER);
  workerRef.current = worker ?? NO_WORKER;

  const [form, setForm] = useState(() => createInitialForm(workerRef.current));
  const [missingAngles, setMissingAngles] = useState([]);
  const [pendingCapture, setPendingCapture] = useState(null);
  const savedUris = useRef(new Set());
  const pendingDeletes = useRef([]);
  const formRef = useRef(form);
  formRef.current = form;

  const releasePhoto = useCallback((photo) => {
    if (!photo) return;
    if (savedUris.current.has(photo.uri)) pendingDeletes.current.push(photo.uri);
    else devices.PhotoFileStore.remove(photo.uri);
  }, []);

  const discardUnsavedFiles = useCallback(() => {
    Object.values(formRef.current.photos).forEach((photo) => {
      if (!savedUris.current.has(photo.uri)) devices.PhotoFileStore.remove(photo.uri);
    });
    pendingDeletes.current = [];
  }, []);

  const startNew = useCallback(() => {
    discardUnsavedFiles();
    savedUris.current = new Set();
    setMissingAngles([]);
    setPendingCapture(null);
    setForm(createInitialForm(workerRef.current));
  }, [discardUnsavedFiles]);

  /** Loads a saved draft; photos whose files have disappeared are dropped and reported. */
  const loadDraft = useCallback(
    (observation) => {
      discardUnsavedFiles();
      const photos = {};
      const missing = [];
      Object.entries(observation.photos ?? {}).forEach(([angle, photo]) => {
        if (devices.PhotoFileStore.exists(photo.uri)) photos[angle] = photo;
        else missing.push(angle);
      });
      savedUris.current = uriSet(observation.photos ?? {});
      pendingDeletes.current = [];
      setMissingAngles(missing);
      setPendingCapture(null);
      setForm(formFromObservation(observation, photos));
    },
    [discardUnsavedFiles],
  );

  const updateLocation = useCallback((patch) => {
    setForm((previous) => ({ ...previous, location: applyLocationPatch(previous.location, patch, locationHierarchy) }));
  }, []);

  const updateSymptoms = useCallback((patch) => {
    setForm((previous) => ({ ...previous, symptoms: { ...previous.symptoms, ...patch } }));
  }, []);

  const setPhoto = useCallback(
    (angle, photo) => {
      releasePhoto(formRef.current.photos[angle]);
      setMissingAngles((previous) => previous.filter((a) => a !== angle));
      setForm((previous) => ({ ...previous, photos: { ...previous.photos, [angle]: photo } }));
    },
    [releasePhoto],
  );

  const removePhoto = useCallback(
    (angle) => {
      releasePhoto(formRef.current.photos[angle]);
      setForm((previous) => {
        const photos = { ...previous.photos };
        delete photos[angle];
        return { ...previous, photos };
      });
    },
    [releasePhoto],
  );

  /** Call after a draft/submission was stored: its photos are now the saved ones. */
  const markSaved = useCallback((observation) => {
    savedUris.current = uriSet(observation.photos ?? {});
    pendingDeletes.current.forEach((uri) => devices.PhotoFileStore.remove(uri));
    pendingDeletes.current = [];
    setForm((previous) => ({ ...previous, displayId: observation.displayId }));
  }, []);

  const observation = useMemo(
    () => observationFromForm(form, { worker: workerRef.current, hierarchy: locationHierarchy }),
    [form],
  );

  const buildObservation = useCallback(
    () => observationFromForm(formRef.current, { worker: workerRef.current, hierarchy: locationHierarchy }),
    [],
  );

  const firstMissingAngle = useCallback(
    () => REQUIRED_PHOTO_ANGLES.find(({ angle }) => !formRef.current.photos[angle])?.angle ?? null,
    [],
  );

  const value = useMemo(
    () => ({
      form, observation, missingAngles, pendingCapture, setPendingCapture,
      startNew, loadDraft, updateLocation, updateSymptoms, setPhoto, removePhoto,
      markSaved, buildObservation, discardUnsavedFiles, firstMissingAngle,
    }),
    [form, observation, missingAngles, pendingCapture, startNew, loadDraft, updateLocation, updateSymptoms, setPhoto, removePhoto, markSaved, buildObservation, discardUnsavedFiles, firstMissingAngle],
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export function useObservationForm() {
  const context = useContext(FormContext);
  if (!context) throw new Error('useObservationForm must be used inside ObservationFormProvider');
  return context;
}
