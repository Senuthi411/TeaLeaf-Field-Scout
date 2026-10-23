// Composition root (kept outside src/app so Expo Router does not treat it as a route).
import { config } from './constants/config.js';
import { getDatabase } from './data/database/database.js';
import { SQLiteObservationRepository } from './data/repositories/SQLiteObservationRepository.js';
import { SQLiteSettingsRepository } from './data/repositories/SQLiteSettingsRepository.js';
import { SQLiteWorkerRepository } from './data/repositories/SQLiteWorkerRepository.js';
import { createSeedObservations } from './data/mock/observations.js';
import { seedDemoWorker } from './data/mock/seedDemoWorker.js';
import { locationHierarchy } from './data/mock/locations.js';
import { demoWorkerProfile } from './data/mock/worker.js';
import { PhotoFileStore } from './services/PhotoFileStore.js';
import { CameraGalleryService } from './services/CameraGalleryService.js';
import { LocationService } from './services/LocationService.js';
import { ConnectivityService } from './services/ConnectivityService.js';
import { ExpoPasswordHasher } from './services/PasswordHasher.js';
import { UnavailableSyncGateway } from './services/SyncService.js';
import { CreateObservation } from './domain/usecases/CreateObservation.js';
import { SaveDraft } from './domain/usecases/SaveDraft.js';
import { DeleteDraft } from './domain/usecases/DeleteDraft.js';
import { GetDashboardSummary } from './domain/usecases/GetDashboardSummary.js';
import { GetObservations } from './domain/usecases/GetObservations.js';
import { GetObservation } from './domain/usecases/GetObservation.js';
import { ClearSampleData } from './domain/usecases/ClearSampleData.js';
import { LanguagePreference } from './domain/usecases/LanguagePreference.js';
import { RegisterWorker } from './domain/usecases/RegisterWorker.js';
import { LoginWorker } from './domain/usecases/LoginWorker.js';
import { ResetLocalPassword } from './domain/usecases/ResetLocalPassword.js';
import { SessionManager } from './domain/usecases/SessionManager.js';
import { SyncPendingObservations } from './domain/usecases/SyncPendingObservations.js';

const observationRepository = new SQLiteObservationRepository({
  getDatabase,
  createSamples: () => createSeedObservations(),
});
const settingsRepository = new SQLiteSettingsRepository({ getDatabase });
const workerRepository = new SQLiteWorkerRepository({ getDatabase });
const passwordHasher = new ExpoPasswordHasher();
const syncGateway = new UnavailableSyncGateway(); // swap for a real gateway when a backend exists
const session = new SessionManager({ workerRepository, settingsRepository });

export const appServices = {
  createObservation: new CreateObservation(observationRepository),
  saveDraft: new SaveDraft(observationRepository),
  deleteDraft: new DeleteDraft(observationRepository),
  getDashboardSummary: new GetDashboardSummary(observationRepository),
  getObservations: new GetObservations(observationRepository),
  getObservation: new GetObservation(observationRepository),
  clearSampleData: new ClearSampleData(observationRepository),
  syncPending: new SyncPendingObservations({ repository: observationRepository, gateway: syncGateway }),
  languagePreference: new LanguagePreference(settingsRepository),
  registerWorker: new RegisterWorker({ workerRepository, passwordHasher, config: config.auth }),
  loginWorker: new LoginWorker({ workerRepository, passwordHasher, sessionStore: session, config: config.auth }),
  resetLocalPassword: new ResetLocalPassword({ workerRepository, passwordHasher, config: config.auth }),
  session,
  /** Runs once at start-up: opens/migrates the DB, seeds sample data and the demo account (first launch). */
  initialize: async () => {
    await observationRepository.seedIfEmpty();
    await seedDemoWorker({ workerRepository, settingsRepository, passwordHasher, config });
  },
};

export const devices = { PhotoFileStore, CameraGalleryService, LocationService, ConnectivityService };

export const demoWorkerId = demoWorkerProfile.id;

export { locationHierarchy, config };
