import { getNextDisplayId, isEditable, markSubmitted } from '../entities/Observation.js';
import { validateForSubmission } from '../validation/observationValidation.js';

/**
 * Validates and submits an observation. "Submitted" means committed to the local queue with
 * sync status PENDING ("Waiting to sync"). Nothing is sent anywhere.
 */
export class CreateObservation {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(observation) {
    const validation = validateForSubmission(observation);
    if (!validation.isValid) return { ok: false, errors: validation.errors };

    try {
      const existing = await this.repository.findByUuid(observation.uuid);
      if (existing && !isEditable(existing)) {
        return { ok: false, errors: { _form: 'This observation was already submitted and can no longer be edited.' } };
      }
      const displayId =
        observation.displayId ?? existing?.displayId ?? getNextDisplayId(await this.repository.findAll());

      const saved = await this.repository.save(markSubmitted({ ...observation, displayId }));
      return { ok: true, observation: saved };
    } catch (error) {
      return { ok: false, errors: { _form: error.message || 'The observation could not be saved.' } };
    }
  }
}
