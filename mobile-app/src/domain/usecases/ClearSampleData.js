/** Removes the illustrative sample records so statistics reflect real work only. */
export class ClearSampleData {
  constructor(repository) {
    this.repository = repository;
  }
  async execute() {
    await this.repository.deleteSamples();
  }
}
