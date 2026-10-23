import { isDraft, isPendingSync, isSameLocalDay } from '../entities/Observation.js';

/** Derives dashboard statistics, drafts, pending submissions and recent activity from stored data. */
export class GetDashboardSummary {
  constructor(repository) {
    this.repository = repository;
  }

  async execute({ workerId, now = new Date() }) {
    const all = await this.repository.findByWorker(workerId);
    const newestFirst = [...all].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    const drafts = newestFirst.filter(isDraft);
    const submitted = newestFirst.filter((o) => !isDraft(o));
    const waiting = newestFirst.filter(isPendingSync);

    return {
      stats: {
        scansToday: submitted.filter((o) => isSameLocalDay(o.capturedAt, now)).length,
        waitingToSync: waiting.length,
        retakesRequired: all.filter((o) => o.needsRetake).length,
        drafts: drafts.length,
        sampleCount: all.filter((o) => o.isSample).length,
      },
      queue: {
        pending: waiting.filter((o) => o.syncStatus === 'PENDING').length,
        failed: waiting.filter((o) => o.syncStatus === 'FAILED').length,
      },
      drafts: drafts.slice(0, 3),
      pending: waiting.slice(0, 3),
      recent: submitted.slice(0, 5),
      total: all.length,
    };
  }
}
