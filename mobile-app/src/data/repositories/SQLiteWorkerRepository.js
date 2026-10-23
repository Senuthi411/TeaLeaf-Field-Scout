import { WorkerRepository } from '../../domain/repositories/WorkerRepository.js';

const toWorker = (row) =>
  row && {
    id: row.id,
    workerCode: row.worker_code,
    name: row.full_name,
    mobile: row.mobile,
    scoutId: row.scout_id,
    divisionName: row.division_name,
    defaultEstateId: row.estate_id,
    defaultDivisionId: row.division_id,
    defaultBlockId: row.block_id || null,
    status: row.status,
    passwordHash: row.password_hash,
    passwordSalt: row.password_salt,
    passwordIterations: row.password_iterations,
    failedAttempts: row.failed_attempts,
    lockedUntil: row.locked_until,
    createdAt: row.created_at,
  };

/** Local account store (development mode). Only the data layer sees password hashes. */
export class SQLiteWorkerRepository extends WorkerRepository {
  constructor({ getDatabase }) {
    super();
    this.getDatabase = getDatabase;
  }

  async findByCode(workerCode) {
    const db = await this.getDatabase();
    return toWorker(await db.getFirstAsync('SELECT * FROM workers WHERE worker_code = ?', [workerCode]));
  }

  async findById(id) {
    const db = await this.getDatabase();
    return toWorker(await db.getFirstAsync('SELECT * FROM workers WHERE id = ?', [id]));
  }

  /** Inserts a worker; pass `id` to force one (used for the demo account so sample data lines up). */
  async create(w) {
    const db = await this.getDatabase();
    const columns = ['worker_code', 'full_name', 'mobile', 'scout_id', 'division_name', 'estate_id', 'division_id', 'block_id',
      'status', 'password_hash', 'password_salt', 'password_iterations', 'failed_attempts', 'locked_until', 'created_at'];
    const values = [w.workerCode, w.name, w.mobile ?? null, w.scoutId ?? null, w.divisionName ?? null, w.defaultEstateId ?? null,
      w.defaultDivisionId ?? null, w.defaultBlockId ?? null, w.status, w.passwordHash, w.passwordSalt, w.passwordIterations,
      w.failedAttempts ?? 0, w.lockedUntil ?? null, w.createdAt];
    if (w.id) {
      columns.unshift('id');
      values.unshift(w.id);
    }
    const result = await db.runAsync(
      `INSERT INTO workers (${columns.join(',')}) VALUES (${columns.map(() => '?').join(',')})`,
      values,
    );
    return this.findById(w.id ?? result.lastInsertRowId);
  }

  async update(w) {
    const db = await this.getDatabase();
    await db.runAsync(
      `UPDATE workers SET full_name=?, mobile=?, scout_id=?, division_name=?, estate_id=?, division_id=?, block_id=?, status=?,
         password_hash=?, password_salt=?, password_iterations=?, failed_attempts=?, locked_until=? WHERE id=?`,
      [w.name, w.mobile ?? null, w.scoutId ?? null, w.divisionName ?? null, w.defaultEstateId ?? null, w.defaultDivisionId ?? null,
        w.defaultBlockId ?? null, w.status, w.passwordHash, w.passwordSalt, w.passwordIterations, w.failedAttempts ?? 0,
        w.lockedUntil ?? null, w.id],
    );
    return w;
  }
}
