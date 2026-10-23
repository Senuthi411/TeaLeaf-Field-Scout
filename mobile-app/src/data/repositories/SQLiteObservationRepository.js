import { ObservationRepository } from '../../domain/repositories/ObservationRepository.js';
import { isPendingSync } from '../../domain/entities/Observation.js';

const SAMPLE_FLAG = 'sample_data_seeded';

const INSERT_OBSERVATION = `
  INSERT OR REPLACE INTO observations (
    uuid, display_id, worker_id, status, sync_status, is_sample,
    captured_at, updated_at, submitted_at, needs_retake,
    estate_id, estate_name, division_id, division_name, block_id, block_name, landmark,
    gps_status, latitude, longitude, accuracy_m, gps_is_manual,
    suspected_disease, severity_level, lesion_colour, lesion_shape, flush_parts, notes
  ) VALUES (?,?,?,?,?,?, ?,?,?,?, ?,?,?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?,?)`;

const INSERT_PHOTO = `
  INSERT INTO observation_photos
    (observation_uuid, view_angle, file_uri, file_name, width, height, captured_at, source,
     file_size_bytes, quality_status, quality_notes)
  VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

function toRowValues(o) {
  const { location: l, symptoms: s } = o;
  const gps = l.gps ?? {};
  return [
    o.uuid, o.displayId ?? null, o.workerId ?? null, o.status, o.syncStatus ?? null, o.isSample ? 1 : 0,
    o.capturedAt, o.updatedAt, o.submittedAt ?? null, o.needsRetake ? 1 : 0,
    l.estateId ?? '', l.estateName ?? '', l.divisionId ?? '', l.divisionName ?? '', l.blockId ?? '', l.blockName ?? '',
    l.landmark ?? '',
    gps.status ?? 'IDLE', gps.latitude ?? null, gps.longitude ?? null, gps.accuracyMeters ?? null, gps.isManual ? 1 : 0,
    s.suspectedDisease ?? '', s.severityLevel ?? '', s.lesionColour ?? '', s.lesionShape ?? '',
    JSON.stringify(s.flushParts ?? []), s.notes ?? '',
  ];
}

function parseList(raw) {
  try {
    const parsed = JSON.parse(raw ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
const parseFlushParts = parseList;

function rowToObservation(row, photoRows) {
  const photos = {};
  photoRows.forEach((p) => {
    photos[p.view_angle] = {
      uri: p.file_uri,
      fileName: p.file_name,
      width: p.width,
      height: p.height,
      capturedAt: p.captured_at,
      source: p.source,
      sizeBytes: p.file_size_bytes,
      qualityStatus: p.quality_status,
      qualityNotes: parseList(p.quality_notes),
    };
  });
  return {
    uuid: row.uuid,
    displayId: row.display_id,
    workerId: row.worker_id,
    status: row.status,
    syncStatus: row.sync_status,
    isSample: row.is_sample === 1,
    capturedAt: row.captured_at,
    updatedAt: row.updated_at,
    submittedAt: row.submitted_at,
    needsRetake: row.needs_retake === 1,
    location: {
      estateId: row.estate_id ?? '',
      estateName: row.estate_name ?? '',
      divisionId: row.division_id ?? '',
      divisionName: row.division_name ?? '',
      blockId: row.block_id ?? '',
      blockName: row.block_name ?? '',
      landmark: row.landmark ?? '',
      gps: {
        status: row.gps_status,
        latitude: row.latitude,
        longitude: row.longitude,
        accuracyMeters: row.accuracy_m,
        isManual: row.gps_is_manual === 1,
      },
    },
    photos,
    symptoms: {
      suspectedDisease: row.suspected_disease ?? '',
      severityLevel: row.severity_level ?? '',
      lesionColour: row.lesion_colour ?? '',
      lesionShape: row.lesion_shape ?? '',
      flushParts: parseFlushParts(row.flush_parts),
      notes: row.notes ?? '',
    },
  };
}

/**
 * SQLite-backed ObservationRepository. The only place that knows table and column names.
 * `getDatabase` is injected (expo-sqlite in the app, a shim in tests).
 */
export class SQLiteObservationRepository extends ObservationRepository {
  constructor({ getDatabase, createSamples = () => [] }) {
    super();
    this.getDatabase = getDatabase;
    this.createSamples = createSamples;
  }

  async #hydrate(rows, db) {
    if (rows.length === 0) return [];
    const photoRows = await db.getAllAsync('SELECT * FROM observation_photos');
    const byObservation = new Map();
    photoRows.forEach((p) => {
      if (!byObservation.has(p.observation_uuid)) byObservation.set(p.observation_uuid, []);
      byObservation.get(p.observation_uuid).push(p);
    });
    return rows.map((row) => rowToObservation(row, byObservation.get(row.uuid) ?? []));
  }

  async save(observation) {
    const db = await this.getDatabase();
    await db.withTransactionAsync(async () => {
      await db.runAsync(INSERT_OBSERVATION, toRowValues(observation));
      await db.runAsync('DELETE FROM observation_photos WHERE observation_uuid = ?', [observation.uuid]);
      for (const [angle, photo] of Object.entries(observation.photos ?? {})) {
        await db.runAsync(INSERT_PHOTO, [
          observation.uuid, angle, photo.uri, photo.fileName ?? null, photo.width ?? null, photo.height ?? null,
          photo.capturedAt ?? null, photo.source ?? null,
          photo.sizeBytes ?? null, photo.qualityStatus ?? null, JSON.stringify(photo.qualityNotes ?? []),
        ]);
      }
    });
    return observation;
  }

  async findByUuid(observationUuid) {
    const db = await this.getDatabase();
    const row = await db.getFirstAsync('SELECT * FROM observations WHERE uuid = ?', [observationUuid]);
    if (!row) return undefined;
    const photoRows = await db.getAllAsync('SELECT * FROM observation_photos WHERE observation_uuid = ?', [
      observationUuid,
    ]);
    return rowToObservation(row, photoRows);
  }

  async findAll() {
    const db = await this.getDatabase();
    return this.#hydrate(await db.getAllAsync('SELECT * FROM observations ORDER BY updated_at DESC'), db);
  }

  async findByWorker(workerId) {
    const db = await this.getDatabase();
    const rows = await db.getAllAsync('SELECT * FROM observations WHERE worker_id = ? ORDER BY updated_at DESC', [
      workerId,
    ]);
    return this.#hydrate(rows, db);
  }

  async findUnsynced() {
    return (await this.findAll()).filter(isPendingSync);
  }

  async delete(observationUuid) {
    const db = await this.getDatabase();
    await db.runAsync('DELETE FROM observations WHERE uuid = ?', [observationUuid]);
  }

  async deleteSamples() {
    const db = await this.getDatabase();
    await db.runAsync('DELETE FROM observations WHERE is_sample = 1');
  }

  /** Inserts the illustrative sample records exactly once (first launch). */
  async seedIfEmpty() {
    const db = await this.getDatabase();
    const flag = await db.getFirstAsync('SELECT value FROM app_settings WHERE key = ?', [SAMPLE_FLAG]);
    if (flag) return;
    for (const sample of this.createSamples()) await this.save(sample);
    await db.runAsync('INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)', [SAMPLE_FLAG, '1']);
  }
}
