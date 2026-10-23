import { SettingsRepository } from '../../domain/repositories/SettingsRepository.js';

export class SQLiteSettingsRepository extends SettingsRepository {
  constructor({ getDatabase }) {
    super();
    this.getDatabase = getDatabase;
  }

  async get(key) {
    const db = await this.getDatabase();
    const row = await db.getFirstAsync('SELECT value FROM app_settings WHERE key = ?', [key]);
    return row?.value ?? null;
  }

  async set(key, value) {
    const db = await this.getDatabase();
    await db.runAsync('INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)', [key, String(value)]);
  }
}
