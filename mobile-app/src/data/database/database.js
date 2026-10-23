import * as SQLite from 'expo-sqlite';
import { migrate } from './schema.js';

const DATABASE_NAME = 'tealeaf-field-scout.db';
let databasePromise = null;

async function openAndMigrate() {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  await db.execAsync('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
  await migrate(db);
  return db;
}

/** Opens the database once and runs migrations. Retries on the next call if opening failed. */
export function getDatabase() {
  if (!databasePromise) {
    databasePromise = openAndMigrate().catch((error) => {
      databasePromise = null;
      throw error;
    });
  }
  return databasePromise;
}
