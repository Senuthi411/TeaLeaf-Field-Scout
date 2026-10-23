// Pure domain entity. No React Native or Expo imports belong in this layer.

export const ObservationStatus = Object.freeze({
  DRAFT: 'DRAFT',
  READY_FOR_SUBMISSION: 'READY_FOR_SUBMISSION',
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  VERIFIED: 'VERIFIED',
  FLAGGED: 'FLAGGED',
});

// PENDING = saved on this device only. SYNCED may only be set by a real server sync,
// which does not exist yet. Only clearly-marked sample records use it.
export const SyncStatus = Object.freeze({
  PENDING: 'PENDING',
  SYNCED: 'SYNCED',
  FAILED: 'FAILED',
});

export const GpsStatus = Object.freeze({
  IDLE: 'IDLE', // not requested yet
  REQUESTING: 'REQUESTING',
  READY: 'READY', // a real fix was obtained
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  SERVICES_DISABLED: 'SERVICES_DISABLED',
  ERROR: 'ERROR',
  MANUAL: 'MANUAL', // user chose a manual location
});

export const PhotoSource = Object.freeze({ CAMERA: 'camera', GALLERY: 'gallery' });

export function generateUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    return (char === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
}

export function createEmptyGps() {
  return { status: GpsStatus.IDLE, latitude: null, longitude: null, accuracyMeters: null, isManual: false };
}

/**
 * Blank observation. Mirrors the Member 2 class diagram (Observation + SymptomDetail +
 * GPSLocation + ObservationImage) flattened into one aggregate.
 * photos[viewAngle] = { uri, fileName, width, height, capturedAt, source }
 */
export function createEmptyObservation({ workerId = null, location = {} } = {}) {
  const now = new Date().toISOString();
  return {
    uuid: generateUuid(),
    displayId: null,
    workerId,
    status: ObservationStatus.DRAFT,
    syncStatus: null,
    isSample: false,
    capturedAt: now,
    updatedAt: now,
    submittedAt: null,
    needsRetake: false,
    location: {
      estateId: '',
      estateName: '',
      divisionId: '',
      divisionName: '',
      blockId: '',
      blockName: '',
      landmark: '',
      gps: createEmptyGps(),
      ...location,
    },
    photos: {},
    symptoms: {
      suspectedDisease: '',
      severityLevel: '',
      lesionColour: '',
      lesionShape: '',
      flushParts: [],
      notes: '',
    },
  };
}

export const isDraft = (observation) => observation.status === ObservationStatus.DRAFT;

// Business rule: submitted records are immutable; only drafts can be edited.
export const isEditable = (observation) => isDraft(observation);

export const isPendingSync = (observation) =>
  !isDraft(observation) &&
  (observation.syncStatus === SyncStatus.PENDING || observation.syncStatus === SyncStatus.FAILED);

export function markSubmitted(observation, now = new Date()) {
  const timestamp = now.toISOString();
  return {
    ...observation,
    status: ObservationStatus.SUBMITTED,
    syncStatus: SyncStatus.PENDING,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
}

export function getNextDisplayId(existingObservations) {
  const highest = existingObservations.reduce((max, observation) => {
    const match = /(\d+)$/.exec(observation.displayId ?? '');
    return match ? Math.max(max, Number(match[1])) : max;
  }, 8900);
  return `#OBS-${highest + 1}`;
}

export function isSameLocalDay(isoString, referenceDate = new Date()) {
  const date = new Date(isoString);
  return (
    date.getFullYear() === referenceDate.getFullYear() &&
    date.getMonth() === referenceDate.getMonth() &&
    date.getDate() === referenceDate.getDate()
  );
}

// Filters used by the History screen.
export const ObservationFilter = Object.freeze({
  ALL: 'ALL',
  DRAFT: 'DRAFT',
  WAITING: 'WAITING',
  FAILED: 'FAILED',
  SYNCED: 'SYNCED',
});

export function matchesFilter(observation, filter) {
  switch (filter) {
    case ObservationFilter.DRAFT:
      return isDraft(observation);
    case ObservationFilter.WAITING:
      return !isDraft(observation) && observation.syncStatus === SyncStatus.PENDING;
    case ObservationFilter.FAILED:
      return !isDraft(observation) && observation.syncStatus === SyncStatus.FAILED;
    case ObservationFilter.SYNCED:
      return !isDraft(observation) && observation.syncStatus === SyncStatus.SYNCED;
    default:
      return true;
  }
}
