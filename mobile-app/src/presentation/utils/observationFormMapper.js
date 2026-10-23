import { GpsStatus, createEmptyGps, createEmptyObservation } from '../../domain/entities/Observation.js';
import { findBlock, findDivision, findEstate } from './locationOptions.js';

/**
 * Form state: the observation's editable parts. Photos are already in app storage
 * ({ uri, fileName, width, height, capturedAt, source }); gps follows the domain shape.
 */
export function createInitialForm(worker) {
  const base = createEmptyObservation({ workerId: worker.id });
  return {
    uuid: base.uuid,
    displayId: null,
    capturedAt: base.capturedAt,
    location: {
      estateId: worker.defaultEstateId,
      divisionId: worker.defaultDivisionId,
      blockId: worker.defaultBlockId,
      landmark: '',
      gps: createEmptyGps(),
    },
    photos: {},
    symptoms: { ...base.symptoms },
  };
}

export function formFromObservation(observation, photos) {
  return {
    uuid: observation.uuid,
    displayId: observation.displayId,
    capturedAt: observation.capturedAt,
    location: {
      estateId: observation.location.estateId,
      divisionId: observation.location.divisionId,
      blockId: observation.location.blockId,
      landmark: observation.location.landmark ?? '',
      gps: { ...observation.location.gps },
    },
    photos,
    symptoms: { ...observation.symptoms, flushParts: [...(observation.symptoms.flushParts ?? [])] },
  };
}

/** A manual location is the approximate centre of the chosen block (sample data), or null if no block. */
export function manualGpsForBlock(block) {
  return {
    status: GpsStatus.MANUAL,
    latitude: block?.latitude ?? null,
    longitude: block?.longitude ?? null,
    accuracyMeters: null,
    isManual: true,
  };
}

/** Applies a location patch and keeps a manual pin in step with the selected block. */
export function applyLocationPatch(location, patch, hierarchy) {
  const next = { ...location, ...patch };
  if (next.gps.status === GpsStatus.MANUAL) {
    next.gps = manualGpsForBlock(findBlock(hierarchy, next.estateId, next.divisionId, next.blockId));
  }
  return next;
}

export function observationFromForm(form, { worker, hierarchy }) {
  const { location } = form;
  const estate = findEstate(hierarchy, location.estateId);
  const division = findDivision(hierarchy, location.estateId, location.divisionId);
  const block = findBlock(hierarchy, location.estateId, location.divisionId, location.blockId);
  const now = new Date().toISOString();

  return {
    uuid: form.uuid,
    displayId: form.displayId,
    workerId: worker.id,
    status: 'DRAFT',
    syncStatus: null,
    isSample: false,
    capturedAt: form.capturedAt,
    updatedAt: now,
    submittedAt: null,
    needsRetake: false,
    location: {
      estateId: location.estateId,
      estateName: estate?.name ?? '',
      divisionId: location.divisionId,
      divisionName: division?.name ?? '',
      blockId: location.blockId,
      blockName: block?.name ?? '',
      landmark: location.landmark.trim(),
      gps: { ...location.gps },
    },
    photos: { ...form.photos },
    symptoms: { ...form.symptoms, notes: form.symptoms.notes.trim() },
  };
}
