import { WorkerStatus, toPublicWorker } from '../entities/Worker.js';
import { normalizeMobile, normalizeWorkerCode, validateRegistration } from '../validation/credentialValidation.js';

/**
 * DEVELOPMENT MODE registration: the account is stored only on this phone. With
 * `autoActivate` false the account stays PENDING_ACTIVATION, as it would until an estate approves it.
 */
export class RegisterWorker {
  constructor({ workerRepository, passwordHasher, config }) {
    this.workers = workerRepository;
    this.hasher = passwordHasher;
    this.config = config;
  }

  async execute(input) {
    const check = validateRegistration(input, { minPasswordLength: this.config.minPasswordLength });
    if (!check.isValid) return { ok: false, errors: check.errors };

    const workerCode = normalizeWorkerCode(input.workerCode);
    try {
      if (await this.workers.findByCode(workerCode)) {
        return { ok: false, errors: { workerCode: 'This Worker ID is already registered on this phone.' } };
      }
      const salt = this.hasher.createSalt();
      const iterations = this.config.pbkdf2Iterations;
      const passwordHash = await this.hasher.hash(input.password, salt, iterations);
      const status = this.config.autoActivateRegistrations ? WorkerStatus.ACTIVE : WorkerStatus.PENDING_ACTIVATION;
      const created = await this.workers.create({
        workerCode,
        name: input.fullName.trim(),
        mobile: normalizeMobile(input.mobile),
        scoutId: `#${workerCode.slice(-2)}`,
        divisionName: input.divisionName ?? '',
        defaultEstateId: input.estateId,
        defaultDivisionId: input.divisionId,
        defaultBlockId: null,
        status,
        passwordHash,
        passwordSalt: salt,
        passwordIterations: iterations,
        failedAttempts: 0,
        lockedUntil: null,
        createdAt: new Date().toISOString(),
      });
      return { ok: true, worker: toPublicWorker(created), status };
    } catch (error) {
      return { ok: false, errors: { _form: error?.message ?? 'The account could not be saved on this phone.' } };
    }
  }
}
