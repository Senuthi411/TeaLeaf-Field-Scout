/** Loads one observation, or null when not found. */
export class GetObservation {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(observationUuid) {
    return (await this.repository.findByUuid(observationUuid)) ?? null;
  }
}
