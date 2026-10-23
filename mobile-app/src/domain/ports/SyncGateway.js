/**
 * Port for server synchronization. No backend exists yet, so the app wires UnavailableSyncGateway.
 * A real implementation must upload each observation (and its photo files) and return a per-record
 * result; only a confirmed server response may lead to the SYNCED status.
 *
 * results: [{ uuid, status: 'SYNCED' | 'FAILED', error?: string }]
 */
export class SyncGateway {
  /** @returns {Promise<{available: boolean, reason?: string}>} */
  async checkAvailability() {
    throw new Error('SyncGateway.checkAvailability() is not implemented');
  }
  // eslint-disable-next-line no-unused-vars
  async upload(observations) {
    throw new Error('SyncGateway.upload() is not implemented');
  }
}
