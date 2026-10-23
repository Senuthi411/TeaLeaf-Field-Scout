import { GpsStatus } from '../entities/Observation.js';
import { MAX_NOTES_LENGTH, REQUIRED_PHOTO_ANGLES } from '../entities/observationOptions.js';

const hasText = (value) => typeof value === 'string' && value.trim().length > 0;

export function countPhotos(photos = {}) {
  return REQUIRED_PHOTO_ANGLES.filter(({ angle }) => Boolean(photos[angle])).length;
}

export function hasUsableCoordinates(gps) {
  return Number.isFinite(gps?.latitude) && Number.isFinite(gps?.longitude);
}

// Only a real fix or a deliberate manual location counts. IDLE/REQUESTING/DENIED/etc. never do.
export function isGpsAcceptable(gps) {
  if (!gps) return false;
  return (gps.status === GpsStatus.READY || gps.status === GpsStatus.MANUAL) && hasUsableCoordinates(gps);
}

function gpsMessage(gps) {
  switch (gps?.status) {
    case GpsStatus.MANUAL:
      return 'Choose a block so the manual location can be set.';
    case GpsStatus.PERMISSION_DENIED:
      return 'Location permission was denied. Allow it in Settings or use a manual location.';
    case GpsStatus.SERVICES_DISABLED:
      return 'Turn on device location or use a manual location.';
    case GpsStatus.REQUESTING:
      return 'Still waiting for a GPS fix.';
    default:
      return 'Get a GPS location or use a manual location.';
  }
}

/** Everything required for final submission. `errors` is flat, keyed by field. */
export function validateForSubmission(observation) {
  const { location, photos, symptoms } = observation;
  const errors = {};

  if (!hasText(location.estateId)) errors.estate = 'Select an estate.';
  if (!hasText(location.divisionId)) errors.division = 'Select a division.';
  if (!hasText(location.blockId)) errors.block = 'Select a block.';
  if (!isGpsAcceptable(location.gps)) errors.gps = gpsMessage(location.gps);

  REQUIRED_PHOTO_ANGLES.forEach(({ angle, label }) => {
    if (!photos[angle]) errors[`photo_${angle}`] = `Add the "${label}" photo.`;
  });

  if (!hasText(symptoms.suspectedDisease)) {
    errors.disease = 'Choose a suspected pathology. "Unknown / Other" is fine if you are unsure.';
  }
  if (!hasText(symptoms.severityLevel)) errors.severity = 'Select a severity level.';
  if (!symptoms.flushParts?.length) errors.flushPart = 'Select at least one affected flush part.';
  if ((symptoms.notes ?? '').length > MAX_NOTES_LENGTH) {
    errors.notes = `Notes must be ${MAX_NOTES_LENGTH} characters or fewer.`;
  }

  const photoCount = countPhotos(photos);
  const failed = (...keys) => keys.some((key) => errors[key]);
  const checklist = [
    { key: 'location', label: 'Location confirmed', detail: '', done: !failed('estate', 'division', 'block', 'gps') },
    {
      key: 'photos',
      label: 'Photos (3 angles)',
      detail: `${photoCount} of ${REQUIRED_PHOTO_ANGLES.length}`,
      done: photoCount === REQUIRED_PHOTO_ANGLES.length,
    },
    { key: 'disease', label: 'Suspected pathology', detail: '', done: !errors.disease },
    { key: 'severity', label: 'Severity', detail: '', done: !errors.severity },
    { key: 'flushPart', label: 'Affected flush part', detail: '', done: !errors.flushPart },
  ];

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    checklist,
    completedCount: checklist.filter((item) => item.done).length,
    totalCount: checklist.length,
  };
}

// A draft only needs something worth saving.
export function hasDraftContent(observation) {
  const { location, photos, symptoms } = observation;
  return (
    hasText(location.estateId) ||
    hasText(location.landmark) ||
    location.gps?.status === GpsStatus.READY ||
    location.gps?.status === GpsStatus.MANUAL ||
    countPhotos(photos) > 0 ||
    hasText(symptoms.suspectedDisease) ||
    hasText(symptoms.severityLevel) ||
    hasText(symptoms.lesionColour) ||
    hasText(symptoms.lesionShape) ||
    Boolean(symptoms.flushParts?.length) ||
    hasText(symptoms.notes)
  );
}

export function validateDraft(observation) {
  const errors = {};
  if (!hasDraftContent(observation)) errors._form = 'Add at least one detail before saving a draft.';
  if ((observation.symptoms.notes ?? '').length > MAX_NOTES_LENGTH) {
    errors.notes = `Notes must be ${MAX_NOTES_LENGTH} characters or fewer.`;
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}

/** Non-blocking notes shown on the review screen (e.g. photos the worker accepted as uncertain). */
export function getReadinessWarnings(observation) {
  const warnings = [];
  const uncertain = Object.entries(observation.photos ?? {}).filter(([, photo]) => photo.qualityStatus === 'UNCERTAIN');
  if (uncertain.length > 0) {
    warnings.push(
      `${uncertain.length} ${uncertain.length === 1 ? 'photo was' : 'photos were'} accepted with quality concerns. An expert should verify them.`,
    );
  }
  if (observation.location?.gps?.status === 'MANUAL') {
    warnings.push('The location is a manual pin, not a GPS fix.');
  }
  return warnings;
}
