import { isEditable } from '../entities/Observation.js';

/** Deletes a draft (never a submitted record). Returns the removed photo URIs so files can be cleaned up. */
export class DeleteDraft {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(observationUuid) {
    const existing = await this.repository.findByUuid(observationUuid);
    if (!existing) return { ok: true, photoUris: [] };
    if (!isEditable(existing)) return { ok: false, error: 'Submitted observations cannot be deleted.' };
    await this.repository.delete(observationUuid);
    return { ok: true, photoUris: Object.values(existing.photos).map((p) => p.uri) };
  }
}
