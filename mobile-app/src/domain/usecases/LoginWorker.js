import { WorkerStatus, toPublicWorker } from '../entities/Worker.js';
import { normalizeWorkerCode, validateWorkerCode } from '../validation/credentialValidation.js';

const timingSafeEqual = (a, b) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

/**
 * Verifies credentials against the accounts stored on this phone (the "cached credentials" of the
 * offline login design). There is no server check. Result codes:
 * OK | INVALID_INPUT | NO_LOCAL_ACCOUNT | NOT_ACTIVE | LOCKED | BAD_PASSWORD
 */
export class LoginWorker {
  constructor({ workerRepository, passwordHasher, sessionStore, config, now = () => new Date() }) {
    this.workers = workerRepository;
    this.hasher = passwordHasher;
    this.session = sessionStore;
    this.config = config;
    this.now = now;
  }

  async execute({ workerCode, password, isOnline }) {
    const codeError = validateWorkerCode(workerCode);
    if (codeError || !password) {
      return { ok: false, code: 'INVALID_INPUT', errors: { workerCode: codeError, password: password ? null : 'Enter your password.' } };
    }

    const worker = await this.workers.findByCode(normalizeWorkerCode(workerCode));
    if (!worker) return { ok: false, code: 'NO_LOCAL_ACCOUNT', isOnline: Boolean(isOnline) };
    if (worker.status !== WorkerStatus.ACTIVE) return { ok: false, code: 'NOT_ACTIVE' };

    const now = this.now();
    if (worker.lockedUntil && new Date(worker.lockedUntil) > now) {
      return { ok: false, code: 'LOCKED', lockedUntil: worker.lockedUntil };
    }

    const candidate = await this.hasher.hash(password, worker.passwordSalt, worker.passwordIterations);
    if (!timingSafeEqual(candidate, worker.passwordHash)) {
      const failedAttempts = (worker.failedAttempts ?? 0) + 1;
      const lock = failedAttempts >= this.config.maxFailedAttempts;
      await this.workers.update({
        ...worker,
        failedAttempts: lock ? 0 : failedAttempts,
        lockedUntil: lock ? new Date(now.getTime() + this.config.lockMinutes * 60000).toISOString() : null,
      });
      return lock
        ? { ok: false, code: 'LOCKED', lockedUntil: new Date(now.getTime() + this.config.lockMinutes * 60000).toISOString() }
        : { ok: false, code: 'BAD_PASSWORD', attemptsLeft: this.config.maxFailedAttempts - failedAttempts };
    }

    await this.workers.update({ ...worker, failedAttempts: 0, lockedUntil: null });
    await this.session.start(worker.id);
    return { ok: true, code: 'OK', worker: toPublicWorker(worker) };
  }
}
