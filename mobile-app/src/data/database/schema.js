// Pure SQL + migration runner. No Expo imports, so it can be tested in Node.
// Tables mirror the Member 2 class diagram: Observation, SymptomDetail, GPSLocation (flattened
// into `observations`) and ObservationImage (`observation_photos`, weak entity keyed by angle).
// Image files live on disk; only their file URIs and metadata are stored here (never base64).

export const MIGRATIONS = [
  `
  CREATE TABLE observations (
    uuid TEXT PRIMARY KEY NOT NULL,
    display_id TEXT,
    worker_id INTEGER,
    status TEXT NOT NULL,
    sync_status TEXT,
    is_sample INTEGER NOT NULL DEFAULT 0,
    captured_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    submitted_at TEXT,
    needs_retake INTEGER NOT NULL DEFAULT 0,
    estate_id TEXT, estate_name TEXT,
    division_id TEXT, division_name TEXT,
    block_id TEXT, block_name TEXT,
    landmark TEXT,
    gps_status TEXT NOT NULL DEFAULT 'IDLE',
    latitude REAL, longitude REAL, accuracy_m REAL,
    gps_is_manual INTEGER NOT NULL DEFAULT 0,
    suspected_disease TEXT, severity_level TEXT,
    lesion_colour TEXT, lesion_shape TEXT,
    flush_parts TEXT NOT NULL DEFAULT '[]',
    notes TEXT
  );
  CREATE INDEX idx_observations_worker ON observations(worker_id, updated_at);
  CREATE TABLE observation_photos (
    observation_uuid TEXT NOT NULL,
    view_angle TEXT NOT NULL,
    file_uri TEXT NOT NULL,
    file_name TEXT,
    width INTEGER, height INTEGER,
    captured_at TEXT,
    source TEXT,
    PRIMARY KEY (observation_uuid, view_angle),
    FOREIGN KEY (observation_uuid) REFERENCES observations(uuid) ON DELETE CASCADE
  );
  CREATE TABLE app_settings (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT
  );
  `,
  // v2: local worker accounts (development-mode auth) + photo quality metadata.
  `
  ALTER TABLE observation_photos ADD COLUMN file_size_bytes INTEGER;
  ALTER TABLE observation_photos ADD COLUMN quality_status TEXT;
  ALTER TABLE observation_photos ADD COLUMN quality_notes TEXT;
  CREATE TABLE workers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    worker_code TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    mobile TEXT,
    scout_id TEXT,
    division_name TEXT,
    estate_id TEXT, division_id TEXT, block_id TEXT,
    status TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    password_iterations INTEGER NOT NULL,
    failed_attempts INTEGER NOT NULL DEFAULT 0,
    locked_until TEXT,
    created_at TEXT NOT NULL
  );
  `,
];

/** Applies pending migrations using PRAGMA user_version. */
export async function migrate(db) {
  const row = await db.getFirstAsync('PRAGMA user_version');
  const current = row?.user_version ?? 0;
  for (let version = current; version < MIGRATIONS.length; version += 1) {
    await db.withTransactionAsync(async () => {
      await db.execAsync(MIGRATIONS[version]);
      await db.execAsync(`PRAGMA user_version = ${version + 1}`);
    });
  }
}
