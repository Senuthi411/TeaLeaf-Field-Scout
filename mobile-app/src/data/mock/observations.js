import { ObservationStatus, SyncStatus } from '../../domain/entities/Observation.js';

const minutesAgo = (now, minutes) => new Date(now.getTime() - minutes * 60 * 1000).toISOString();

const NEH = { estateId: 'EST-NEH', estateName: 'Nuwara Eliya Highlands' };
const PEDRO = { ...NEH, divisionId: 'DIV-04', divisionName: 'Pedro Division' };

const readyGps = (latitude, longitude, accuracyMeters) => ({
  status: 'READY',
  latitude,
  longitude,
  accuracyMeters,
  isManual: false,
});

const BLOCKS = {
  A1: { blockId: 'BLK-A1', blockName: 'Block A1 — Upper Ridge' },
  A2: { blockId: 'BLK-A2', blockName: 'Block A2 — Lovers Leap' },
  C1: { blockId: 'BLK-C1', blockName: 'Block C1 — Peak View' },
};

/**
 * ILLUSTRATIVE seed records (isSample = true; no real photos or server records), created relative to "now" so the dashboard's
 * "today" statistics make sense. Only used the first time the app runs.
 */
export function createSeedObservations(now = new Date()) {
  const make = (id, minutes, overrides) => {
    const iso = minutesAgo(now, minutes);
    return {
      uuid: `seed-${id}`,
      displayId: `#OBS-${id}`,
      workerId: 4,
      status: ObservationStatus.SUBMITTED,
      syncStatus: SyncStatus.SYNCED,
      capturedAt: iso,
      updatedAt: iso,
      submittedAt: iso,
      needsRetake: false,
      photos: {},
      isSample: true,
      ...overrides,
    };
  };

  return [
    make(8941, 25, {
      syncStatus: SyncStatus.PENDING,
      location: { ...PEDRO, ...BLOCKS.A2, landmark: 'Row 14, near water tank', gps: readyGps(6.9709, 80.7668, 2.4) },
      symptoms: {
        suspectedDisease: 'BLISTER_BLIGHT',
        severityLevel: 'HIGH',
        lesionColour: 'PALE_GREEN',
        lesionShape: 'RAISED_BLISTERS',
        flushParts: ['BUD', 'FIRST_LEAF'],
        notes: 'Blisters spreading on the young shoots after recent rain.',
      },
    }),
    make(8940, 70, {
      location: { ...PEDRO, ...BLOCKS.C1, landmark: '', gps: readyGps(6.9684, 80.7731, 3.1) },
      symptoms: {
        suspectedDisease: 'GREY_BLIGHT',
        severityLevel: 'MODERATE',
        lesionColour: 'GREY',
        lesionShape: 'CONCENTRIC_RINGS',
        flushParts: ['THIRD_LEAF'],
        notes: '',
      },
    }),
    make(8939, 125, {
      location: { ...PEDRO, ...BLOCKS.A1, landmark: 'Upper boundary fence', gps: readyGps(6.9731, 80.7702, 2.8) },
      symptoms: {
        suspectedDisease: 'ALGAL_LEAF_SPOT',
        severityLevel: 'LOW',
        lesionColour: 'YELLOW',
        lesionShape: 'CIRCULAR_SPOTS',
        flushParts: ['SECOND_LEAF'],
        notes: '',
      },
    }),
    make(8938, 190, {
      syncStatus: SyncStatus.PENDING,
      location: { ...PEDRO, ...BLOCKS.A2, landmark: '', gps: readyGps(6.9711, 80.7671, 4.5) },
      symptoms: {
        suspectedDisease: 'BLACK_BLIGHT',
        severityLevel: 'MODERATE',
        lesionColour: 'BLACK',
        lesionShape: 'IRREGULAR_PATCHES',
        flushParts: ['FIRST_LEAF', 'SECOND_LEAF'],
        notes: 'Dark patches on mature leaves near the stream side.',
      },
    }),
    make(8937, 260, {
      status: ObservationStatus.FLAGGED,
      needsRetake: true,
      location: { ...PEDRO, ...BLOCKS.C1, landmark: '', gps: readyGps(6.9686, 80.7729, 6.0) },
      symptoms: {
        suspectedDisease: 'UNKNOWN',
        severityLevel: 'LOW',
        lesionColour: '',
        lesionShape: '',
        flushParts: ['STEM'],
        notes: 'Underside photo was blurry. Supervisor asked for a retake.',
      },
    }),
    make(8936, 1600, {
      location: { ...PEDRO, ...BLOCKS.A1, landmark: '', gps: readyGps(6.973, 80.7699, 3.6) },
      symptoms: {
        suspectedDisease: 'SPIDER_MITE',
        severityLevel: 'LOW',
        lesionColour: 'BROWN',
        lesionShape: 'MARGIN_SCORCH',
        flushParts: ['SECOND_LEAF'],
        notes: '',
      },
    }),
    make(8935, 3000, {
      location: { ...PEDRO, ...BLOCKS.A2, landmark: '', gps: readyGps(6.9708, 80.7667, 2.2) },
      symptoms: {
        suspectedDisease: 'BLISTER_BLIGHT',
        severityLevel: 'MODERATE',
        lesionColour: 'PALE_GREEN',
        lesionShape: 'RAISED_BLISTERS',
        flushParts: ['BUD'],
        notes: '',
      },
    }),
    make(8934, 5000, {
      syncStatus: SyncStatus.FAILED,
      location: { ...PEDRO, ...BLOCKS.C1, landmark: '', gps: readyGps(6.9683, 80.773, 5.2) },
      symptoms: {
        suspectedDisease: 'GREY_BLIGHT',
        severityLevel: 'LOW',
        lesionColour: 'GREY',
        lesionShape: 'IRREGULAR_PATCHES',
        flushParts: ['THIRD_LEAF'],
        notes: '',
      },
    }),
    // One partly completed draft so "Continue draft" can be tried straight away.
    {
      uuid: 'seed-8942',
      displayId: '#OBS-8942',
      workerId: 4,
      status: ObservationStatus.DRAFT,
      syncStatus: null,
      capturedAt: minutesAgo(now, 15),
      updatedAt: minutesAgo(now, 15),
      submittedAt: null,
      needsRetake: false,
      photos: {},
      isSample: true,
      location: {
        ...PEDRO,
        ...BLOCKS.C1,
        landmark: '',
        gps: { status: 'IDLE', latitude: null, longitude: null, accuracyMeters: null, isManual: false },
      },
      symptoms: {
        suspectedDisease: 'GREY_BLIGHT',
        severityLevel: '',
        lesionColour: '',
        lesionShape: '',
        flushParts: [],
        notes: '',
      },
    },
  ];
}
