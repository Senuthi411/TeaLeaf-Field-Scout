import { isDraft, SyncStatus, GpsStatus } from '../../domain/entities/Observation.js';
import {
  DISEASE_OPTIONS,
  FLUSH_PART_OPTIONS,
  LESION_COLOUR_OPTIONS,
  LESION_SHAPE_OPTIONS,
  SEVERITY_OPTIONS,
  SeverityLevel,
  labelFor,
} from '../../domain/entities/observationOptions.js';

export const diseaseLabel = (value) => labelFor(DISEASE_OPTIONS, value);
export const severityLabel = (value) => labelFor(SEVERITY_OPTIONS, value);
export const colourLabel = (value) => labelFor(LESION_COLOUR_OPTIONS, value);
export const shapeLabel = (value) => labelFor(LESION_SHAPE_OPTIONS, value);
export const flushPartsLabel = (values = []) =>
  values.map((value) => labelFor(FLUSH_PART_OPTIONS, value)).filter(Boolean).join(', ');

/** Severity is always shown with an icon and text, never colour alone. */
export function severityBadge(level) {
  switch (level) {
    case SeverityLevel.HIGH:
      return { tone: 'danger', icon: 'alert-circle', label: 'High risk' };
    case SeverityLevel.MODERATE:
      return { tone: 'warning', icon: 'warning', label: 'Moderate risk' };
    case SeverityLevel.LOW:
      return { tone: 'success', icon: 'checkmark-circle', label: 'Low risk' };
    default:
      return null;
  }
}

/** labelKey is translated by the caller. Synced is only ever shown for sample records today. */
export function syncBadge(observation) {
  if (isDraft(observation)) return { tone: 'neutral', icon: 'document-text', labelKey: 'status.draft' };
  switch (observation.syncStatus) {
    case SyncStatus.SYNCED:
      return { tone: 'success', icon: 'checkmark-circle', labelKey: 'status.synced' };
    case SyncStatus.FAILED:
      return { tone: 'danger', icon: 'alert-circle', labelKey: 'status.failed' };
    default:
      return { tone: 'warning', icon: 'cloud-offline', labelKey: 'status.waiting' };
  }
}

export function gpsSummary(gps) {
  if (!gps) return 'No location saved';
  if (gps.status === GpsStatus.MANUAL) return 'Manual location (approx. block centre)';
  if (gps.status === GpsStatus.READY) {
    return Number.isFinite(gps.accuracyMeters)
      ? `GPS fix saved (±${gps.accuracyMeters.toFixed(1)} m)`
      : 'GPS fix saved';
  }
  return 'No location saved';
}

/** Figma format: "Pedro // BLK-A2 (Lovers Leap)". */
export function locationLabel(location) {
  if (!location.blockId && !location.divisionName) return 'Location not set';
  const division = (location.divisionName ?? '').split(' ')[0];
  const place = (location.blockName ?? '').split('—')[1]?.trim();
  return `${division} // ${location.blockId || 'no block'}${place ? ` (${place})` : ''}`;
}
