import { normalizeMobile, normalizeWorkerCode, validatePassword, validateWorkerCode } from '../validation/credentialValidation.js';

/**
 * DEVELOPMENT MODE ONLY. Real password reset needs the server. Here, knowing the registered mobile
 * number is accepted as proof, which is NOT secure and must be replaced before production.
 */
export class ResetLocalPassword {
  constructor({ workerRepository, passwordHasher, config }) {
    this.workers = workerRepository;
    this.hasher = passwordHasher;
    this.config = config;
  }

  async execute({ workerCode, mobile, newPassword }) {
    const errors = {};
    const codeError = validateWorkerCode(workerCode);
    if (codeError) errors.workerCode = codeError;
    if (!normalizeMobile(mobile)) errors.mobile = 'Enter the mobile number you registered with.';
    const passwordError = validatePassword(newPassword, this.config.minPasswordLength);
    if (passwordError) errors.newPassword = passwordError;
    if (Object.keys(errors).length) return { ok: false, errors };

    const worker = await this.workers.findByCode(normalizeWorkerCode(workerCode));
    // Same message for "no account" and "wrong number" so IDs cannot be probed.
    if (!worker || worker.mobile !== normalizeMobile(mobile)) {
      return { ok: false, errors: { _form: 'The Worker ID and mobile number do not match an account on this phone.' } };
    }
    const salt = this.hasher.createSalt();
    const iterations = this.config.pbkdf2Iterations;
    await this.workers.update({
      ...worker,
      passwordSalt: salt,
      passwordIterations: iterations,
      passwordHash: await this.hasher.hash(newPassword, salt, iterations),
      failedAttempts: 0,
      lockedUntil: null,
    });
    return { ok: true };
  }
}
