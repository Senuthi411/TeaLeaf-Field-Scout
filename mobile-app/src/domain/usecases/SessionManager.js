import { toPublicWorker } from '../entities/Worker.js';

/** Keeps the signed-in worker across app restarts (stores only the worker id, never a password). */
export class SessionManager {
  constructor({ workerRepository, settingsRepository }) {
    this.workers = workerRepository;
    this.settings = settingsRepository;
  }

  async restore() {
    const id = Number(await this.settings.get('session_worker_id'));
    if (!id) return null;
    const worker = await this.workers.findById(id);
    return worker && worker.status === 'ACTIVE' ? toPublicWorker(worker) : null;
  }

  async start(workerId) {
    await this.settings.set('session_worker_id', workerId);
  }

  async end() {
    await this.settings.set('session_worker_id', '');
  }
}
