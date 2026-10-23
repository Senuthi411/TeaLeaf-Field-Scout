// Field worker account (local, development-mode). Password hashes never leave the data layer
// except inside the auth use cases.
export const WorkerStatus = Object.freeze({
  ACTIVE: 'ACTIVE',
  PENDING_ACTIVATION: 'PENDING_ACTIVATION', // awaiting estate/supervisor approval (needs a backend)
  DISABLED: 'DISABLED',
});

/** Removes credential fields so a worker can be safely passed to the UI. */
export function toPublicWorker(worker) {
  const { passwordHash, passwordSalt, passwordIterations, failedAttempts, lockedUntil, ...publicFields } = worker;
  return publicFields;
}
