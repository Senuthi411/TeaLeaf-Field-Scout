/**
 * Repository contract for observations. Use cases depend on this abstraction only;
 * SQLite, or a future REST API, implements it in the data layer.
 */
export class ObservationRepository {
  // eslint-disable-next-line no-unused-vars
  async save(observation) {
    throw new Error('ObservationRepository.save() is not implemented');
  }
  // eslint-disable-next-line no-unused-vars
  async findByUuid(observationUuid) {
    throw new Error('ObservationRepository.findByUuid() is not implemented');
  }
  async findAll() {
    throw new Error('ObservationRepository.findAll() is not implemented');
  }
  // eslint-disable-next-line no-unused-vars
  async findByWorker(workerId) {
    throw new Error('ObservationRepository.findByWorker() is not implemented');
  }
  async findUnsynced() {
    throw new Error('ObservationRepository.findUnsynced() is not implemented');
  }
  // eslint-disable-next-line no-unused-vars
  async delete(observationUuid) {
    throw new Error('ObservationRepository.delete() is not implemented');
  }
  async deleteSamples() {
    throw new Error('ObservationRepository.deleteSamples() is not implemented');
  }
  async seedIfEmpty() {
    // Optional hook: repositories that ship sample data may override.
  }
}
