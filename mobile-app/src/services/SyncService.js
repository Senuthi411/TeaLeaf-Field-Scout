import { SyncGateway } from '../domain/ports/SyncGateway.js';

/**
 * The only SyncGateway today. There is no backend, so it never uploads and never reports success.
 * To integrate a real server, implement SyncGateway (checkAvailability + upload) and swap this
 * class in src/container.js. No other code needs to change.
 */
export class UnavailableSyncGateway extends SyncGateway {
  async checkAvailability() {
    return {
      available: false,
      reason: 'Real server synchronization is not implemented yet. Records stay safely on this phone as “Waiting to sync”.',
    };
  }

  async upload() {
    throw new Error('No sync backend is configured.');
  }
}
