/**
 * Asks the SyncGateway to upload waiting records. With no backend the gateway reports "unavailable"
 * and NOTHING changes: no record is marked synced. When a real gateway exists, only records it confirms
 * are updated (statuses come from its results, never assumed).
 */
export class SyncPendingObservations {
  constructor({ repository, gateway }) {
    this.repository = repository;
    this.gateway = gateway;
  }

  async execute() {
    const pending = await this.repository.findUnsynced();
    const availability = await this.gateway.checkAvailability();
    if (!availability.available) {
      return { attempted: false, reason: availability.reason ?? 'Synchronization is not available.', waiting: pending.length };
    }
    const results = await this.gateway.upload(pending);
    const byUuid = new Map(results.map((r) => [r.uuid, r]));
    let synced = 0;
    let failed = 0;
    for (const observation of pending) {
      const result = byUuid.get(observation.uuid);
      if (!result) continue;
      const status = result.status === 'SYNCED' ? 'SYNCED' : 'FAILED';
      await this.repository.save({ ...observation, syncStatus: status });
      if (status === 'SYNCED') synced += 1;
      else failed += 1;
    }
    return { attempted: true, synced, failed, waiting: pending.length - synced };
  }
}
