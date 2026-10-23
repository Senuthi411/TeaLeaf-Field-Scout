import { ObservationFilter, matchesFilter } from '../entities/Observation.js';
import { DISEASE_OPTIONS, labelFor } from '../entities/observationOptions.js';

const searchText = (o) =>
  [o.displayId, labelFor(DISEASE_OPTIONS, o.symptoms.suspectedDisease), o.location.blockName, o.location.divisionName, o.location.landmark, o.symptoms.notes]
    .join(' ')
    .toLowerCase();

/** Lists a worker's observations, newest first, optionally filtered by status and free-text search. */
export class GetObservations {
  constructor(repository) {
    this.repository = repository;
  }

  async execute({ workerId, filter = ObservationFilter.ALL, query = '' }) {
    const needle = query.trim().toLowerCase();
    const all = await this.repository.findByWorker(workerId);
    return all
      .filter((o) => matchesFilter(o, filter))
      .filter((o) => !needle || searchText(o).includes(needle))
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }
}
