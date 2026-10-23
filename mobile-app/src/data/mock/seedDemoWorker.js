import { WorkerStatus } from '../../domain/entities/Worker.js';
import { demoWorkerProfile } from './worker.js';

const FLAG = 'demo_worker_seeded';

/** Creates the demo account once (hash computed here, never stored in plain text). */
export async function seedDemoWorker({ workerRepository, settingsRepository, passwordHasher, config }) {
  if (await settingsRepository.get(FLAG)) return;
  if (!(await workerRepository.findByCode(demoWorkerProfile.workerCode))) {
    const salt = passwordHasher.createSalt();
    const iterations = config.auth.pbkdf2Iterations;
    await workerRepository.create({
      ...demoWorkerProfile,
      status: WorkerStatus.ACTIVE,
      passwordSalt: salt,
      passwordIterations: iterations,
      passwordHash: await passwordHasher.hash(config.demoAccount.password, salt, iterations),
      failedAttempts: 0,
      lockedUntil: null,
      createdAt: new Date().toISOString(),
    });
  }
  await settingsRepository.set(FLAG, '1');
}
