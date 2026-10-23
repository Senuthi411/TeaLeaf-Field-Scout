import { ObservationStatus, getNextDisplayId, isEditable } from '../entities/Observation.js';
import { validateDraft } from '../validation/observationValidation.js';

/** Saves an incomplete observation as a local draft. */
export class SaveDraft {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(observation) {
    const check = validateDraft(observation);
    if (!check.isValid) return { ok: false, errors: check.errors };

    try {
      const existing = await this.repository.findByUuid(observation.uuid);
      if (existing && !isEditable(existing)) {
        return { ok: false, errors: { _form: 'This observation was already submitted and can no longer be edited.' } };
      }
      const displayId =
        observation.displayId ?? existing?.displayId ?? getNextDisplayId(await this.repository.findAll());

      const saved = await this.repository.save({
        ...observation,
        displayId,
        status: ObservationStatus.DRAFT,
        syncStatus: null,
        submittedAt: null,
        updatedAt: new Date().toISOString(),
      });
      return { ok: true, observation: saved };
    } catch (error) {
      return { ok: false, errors: { _form: error.message || 'The draft could not be saved.' } };
    }
  }
}
