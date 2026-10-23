// Logic tests for domain + SQLite repository. Runs in Node using node:sqlite behind a shim of the
// expo-sqlite async API, so the SQL/migrations are exercised for real. UI and device APIs are NOT covered.
// Run: npm run test:logic   (needs Node 22+)
import { DatabaseSync } from 'node:sqlite';
import { rmSync } from 'node:fs';

const root = new URL('../src/', import.meta.url).pathname;
const { migrate, MIGRATIONS } = await import(root + 'data/database/schema.js');
const { SQLiteWorkerRepository } = await import(root + 'data/repositories/SQLiteWorkerRepository.js');
const { pbkdf2Sha256, utf8Encode, fromHex, toHex, sha256 } = await import(root + 'services/pbkdf2Sha256.js');
const { PasswordHasher } = await import(root + 'domain/ports/PasswordHasher.js');
const { RegisterWorker } = await import(root + 'domain/usecases/RegisterWorker.js');
const { LoginWorker } = await import(root + 'domain/usecases/LoginWorker.js');
const { ResetLocalPassword } = await import(root + 'domain/usecases/ResetLocalPassword.js');
const { SessionManager } = await import(root + 'domain/usecases/SessionManager.js');
const { DeleteDraft } = await import(root + 'domain/usecases/DeleteDraft.js');
const { SyncPendingObservations } = await import(root + 'domain/usecases/SyncPendingObservations.js');
const { UnavailableSyncGateway } = await import(root + 'services/SyncService.js');
const { seedDemoWorker } = await import(root + 'data/mock/seedDemoWorker.js');
const { config } = await import(root + 'constants/config.js');
const { evaluateBasicQuality, decidePhotoQuality } = await import(root + 'domain/validation/imageQualityRules.js');
const { getReadinessWarnings } = await import(root + 'domain/validation/observationValidation.js');
const nodeCrypto = await import('node:crypto');
const { SQLiteObservationRepository } = await import(root + 'data/repositories/SQLiteObservationRepository.js');
const { SQLiteSettingsRepository } = await import(root + 'data/repositories/SQLiteSettingsRepository.js');
const { createSeedObservations } = await import(root + 'data/mock/observations.js');
const { CreateObservation } = await import(root + 'domain/usecases/CreateObservation.js');
const { SaveDraft } = await import(root + 'domain/usecases/SaveDraft.js');
const { GetDashboardSummary } = await import(root + 'domain/usecases/GetDashboardSummary.js');
const { GetObservations } = await import(root + 'domain/usecases/GetObservations.js');
const { ClearSampleData } = await import(root + 'domain/usecases/ClearSampleData.js');
const { LanguagePreference } = await import(root + 'domain/usecases/LanguagePreference.js');
const { createEmptyObservation, ObservationFilter } = await import(root + 'domain/entities/Observation.js');

const file = '/tmp/tealeaf-test.db';
rmSync(file, { force: true });

function openShim() {
  const raw = new DatabaseSync(file);
  raw.exec('PRAGMA foreign_keys = ON;');
  return {
    execAsync: async (sql) => raw.exec(sql),
    runAsync: async (sql, params = []) => {
      const r = raw.prepare(sql).run(...params); // expo-sqlite names it lastInsertRowId
      return { changes: r.changes, lastInsertRowId: Number(r.lastInsertRowid) };
    },
    getAllAsync: async (sql, params = []) => raw.prepare(sql).all(...params),
    getFirstAsync: async (sql, params = []) => raw.prepare(sql).get(...params),
    withTransactionAsync: async (fn) => {
      raw.exec('BEGIN');
      try { await fn(); raw.exec('COMMIT'); } catch (e) { raw.exec('ROLLBACK'); throw e; }
    },
    close: () => raw.close(),
  };
}

let failed = 0;
const check = (cond, msg) => { if (cond) console.log('ok  ', msg); else { failed++; console.error('FAIL', msg); } };

function boot() {
  const db = openShim();
  const getDatabase = async () => db;
  const repo = new SQLiteObservationRepository({ getDatabase, createSamples: () => createSeedObservations() });
  return { db, repo, getDatabase };
}

// ---- first launch ----
let { db, repo, getDatabase } = boot();
await migrate(db);
check((await db.getFirstAsync('PRAGMA user_version')).user_version === MIGRATIONS.length, 'migration sets user_version to latest');
await migrate(db);
check((await db.getFirstAsync('PRAGMA user_version')).user_version === MIGRATIONS.length, 'migration is idempotent');
await repo.seedIfEmpty();
await repo.seedIfEmpty();
let all = await repo.findAll();
check(all.length === 9 && all.every((o) => o.isSample), 'samples seeded once and flagged isSample');

const create = new CreateObservation(repo), saveDraft = new SaveDraft(repo);
const summary = new GetDashboardSummary(repo), list = new GetObservations(repo);

let s = await summary.execute({ workerId: 4 });
check(s.stats.waitingToSync === 3 && s.stats.retakesRequired === 1 && s.stats.drafts === 1, 'dashboard stats derived from DB');
check(s.queue.pending === 2 && s.queue.failed === 1, 'queue summary: 2 pending + 1 failed');

// ---- draft ----
let o = createEmptyObservation({ workerId: 4 });
check(!(await saveDraft.execute(o)).ok, 'empty draft rejected');
o.symptoms.suspectedDisease = 'GREY_BLIGHT';
o.photos.TOP_OF_LEAF = { uri: 'file:///data/photos/a.jpg', fileName: 'a.jpg', width: 800, height: 600, capturedAt: new Date().toISOString(), source: 'camera' };
let r = await saveDraft.execute(o);
check(r.ok && r.observation.displayId === '#OBS-8943', 'draft saved with next display id ' + r.observation?.displayId);

// ---- simulate app restart: new connection, new repo ----
db.close();
({ db, repo, getDatabase } = boot());
const reloaded = await repo.findByUuid(o.uuid);
check(reloaded?.status === 'DRAFT' && reloaded.photos.TOP_OF_LEAF.uri === 'file:///data/photos/a.jpg', 'draft + photo URI survive restart');
check(reloaded.photos.TOP_OF_LEAF.width === 800 && reloaded.photos.TOP_OF_LEAF.source === 'camera', 'photo metadata persisted');
await repo.seedIfEmpty();
check((await repo.findAll()).length === 10, 'sample data is not re-seeded after restart');

// ---- invalid / valid submit ----
const create2 = new CreateObservation(repo);
r = await create2.execute(reloaded);
check(!r.ok && r.errors.gps && r.errors.photo_LEAF_UNDERSIDE && r.errors.estate, 'incomplete submit rejected: ' + Object.keys(r.errors).join(','));

const ready = { ...reloaded };
ready.location = { ...ready.location, estateId: 'E', estateName: 'E', divisionId: 'D', divisionName: 'D', blockId: 'B', blockName: 'B',
  gps: { status: 'READY', latitude: 6.97, longitude: 80.77, accuracyMeters: 4.2, isManual: false } };
const ph = (n) => ({ uri: `file:///data/photos/${n}.jpg`, fileName: `${n}.jpg`, width: 1, height: 1, capturedAt: ready.capturedAt, source: 'gallery' });
ready.photos = { TOP_OF_LEAF: ph('t'), LEAF_UNDERSIDE: ph('u'), WIDER_VIEW: ph('w') };
ready.symptoms = { ...ready.symptoms, severityLevel: 'HIGH', flushParts: ['BUD', 'STEM'], notes: 'ශ්‍රී ලංකා ‑ தமிழ் notes ok' };
r = await new CreateObservation(repo).execute(ready);
check(r.ok && r.observation.status === 'SUBMITTED' && r.observation.syncStatus === 'PENDING', 'submit -> SUBMITTED / PENDING (Waiting to sync, never SYNCED)');
const stored = await repo.findByUuid(ready.uuid);
check(Object.keys(stored.photos).length === 3 && stored.symptoms.flushParts.join() === 'BUD,STEM', '3 photos + flush parts round-trip');
check(stored.symptoms.notes.includes('தமிழ்'), 'unicode (Sinhala/Tamil) notes round-trip');
check(!(await new SaveDraft(repo).execute(ready)).ok, 'submitted record cannot be edited back to a draft');

// ---- GPS gating ----
const idleGps = { ...ready, uuid: 'x1', location: { ...ready.location, gps: { status: 'IDLE', latitude: null, longitude: null, accuracyMeters: null, isManual: false } } };
check(!(await create2.execute(idleGps)).ok, 'GPS not requested -> cannot submit');
const deniedGps = { ...idleGps, location: { ...idleGps.location, gps: { status: 'PERMISSION_DENIED', latitude: 1, longitude: 1 } } };
check(!(await create2.execute(deniedGps)).ok, 'denied GPS never counts even with stray coordinates');

// ---- stats, lists, samples ----
s = await new GetDashboardSummary(repo).execute({ workerId: 4 });
check(s.stats.waitingToSync === 4, 'dashboard reflects new waiting record');
const waiting = await new GetObservations(repo).execute({ workerId: 4, filter: ObservationFilter.WAITING });
check(waiting.length === 3 && waiting[0].uuid === ready.uuid, 'history filter WAITING newest first');
await new ClearSampleData(repo).execute();
all = await repo.findAll();
check(all.length === 1 && all.every((x) => !x.isSample), 'clear sample data keeps real records');
check((await db.getAllAsync("SELECT * FROM observation_photos WHERE observation_uuid LIKE 'seed-%'")).length === 0, 'cascade leaves no orphan photo rows');

// ---- settings ----
const lang = new LanguagePreference(new SQLiteSettingsRepository({ getDatabase }));
check((await lang.get()) === 'en', 'language defaults to English');
await lang.set('si');
check((await lang.get()) === 'si', 'language persists');
let threw = false; try { await lang.set('fr'); } catch { threw = true; }
check(threw, 'unsupported language rejected');


// =====================  v2: auth, quality rules, sync gateway, upgrade  =====================
console.log('\n-- v2 --');

// PBKDF2 / SHA-256 correctness against Node crypto
for (const [pw, saltHex, iter] of [['Scout@2026', '00112233445566778899aabbccddeeff', 1000], ['ශ්‍රී ලංකා தமிழ் 🍃', 'a1'.repeat(16), 10], ['x', 'ff'.repeat(16), 1]]) {
  const mine = toHex(pbkdf2Sha256(utf8Encode(pw), fromHex(saltHex), iter, 32));
  const ref = nodeCrypto.pbkdf2Sync(Buffer.from(pw, 'utf8'), Buffer.from(saltHex, 'hex'), iter, 32, 'sha256').toString('hex');
  check(mine === ref, `PBKDF2 matches Node crypto (${iter} iter, ${JSON.stringify(pw).slice(0, 12)})`);
}
check(toHex(sha256(utf8Encode('abc'))) === nodeCrypto.createHash('sha256').update('abc').digest('hex'), 'SHA-256("abc") matches');
const big = 'a'.repeat(1000);
check(toHex(sha256(utf8Encode(big))) === nodeCrypto.createHash('sha256').update(big).digest('hex'), 'SHA-256 multi-block matches');
const t0 = Date.now(); pbkdf2Sha256(utf8Encode('pw'), fromHex('00'.repeat(16)), config.auth.pbkdf2Iterations, 32);
console.log(`     (info) ${config.auth.pbkdf2Iterations} iterations took ${Date.now() - t0} ms in Node/V8; Hermes will be slower`);

class NodeHasher extends PasswordHasher {
  createSalt() { return nodeCrypto.randomBytes(16).toString('hex'); }
  async hash(pw, salt, iter) { return toHex(pbkdf2Sha256(utf8Encode(pw), fromHex(salt), iter, 32)); }
}

// v1 -> v2 upgrade keeps existing data
rmSync(file, { force: true });
{
  const raw = new DatabaseSync(file);
  raw.exec(MIGRATIONS[0]); raw.exec('PRAGMA user_version = 1;');
  raw.prepare(`INSERT INTO observations (uuid, status, captured_at, updated_at, worker_id) VALUES ('old-1','DRAFT','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z',4)`).run();
  raw.prepare(`INSERT INTO observation_photos (observation_uuid, view_angle, file_uri) VALUES ('old-1','TOP_OF_LEAF','file:///old.jpg')`).run();
  raw.close();
}
let v2 = boot(); // reopens the same file
await migrate(v2.db);
check((await v2.db.getFirstAsync('PRAGMA user_version')).user_version === MIGRATIONS.length, 'v1 database upgrades to latest version');
const old = await v2.repo.findByUuid('old-1');
check(old?.photos.TOP_OF_LEAF.uri === 'file:///old.jpg' && old.photos.TOP_OF_LEAF.qualityStatus === null, 'pre-existing draft + photo survive the v2 upgrade');
v2.db.close();

// fresh DB for the remaining tests
rmSync(file, { force: true });
let ctx = boot();
await migrate(ctx.db);
const workerRepo = new SQLiteWorkerRepository({ getDatabase: ctx.getDatabase });
const settingsRepo = new SQLiteSettingsRepository({ getDatabase: ctx.getDatabase });
const hasher = new NodeHasher();
const fastAuth = { ...config.auth, pbkdf2Iterations: 50 };
const session = new SessionManager({ workerRepository: workerRepo, settingsRepository: settingsRepo });
let clock = new Date('2026-10-21T10:00:00Z');
const login = new LoginWorker({ workerRepository: workerRepo, passwordHasher: hasher, sessionStore: session, config: fastAuth, now: () => clock });
const register = new RegisterWorker({ workerRepository: workerRepo, passwordHasher: hasher, config: fastAuth });
const reset = new ResetLocalPassword({ workerRepository: workerRepo, passwordHasher: hasher, config: fastAuth });

// demo seed
await seedDemoWorker({ workerRepository: workerRepo, settingsRepository: settingsRepo, passwordHasher: hasher, config: { ...config, auth: fastAuth } });
const demo = await workerRepo.findById(4);
check(demo?.workerCode === 'PED-8492' && demo.passwordHash.length === 64 && !demo.passwordHash.includes('Scout'), 'demo worker seeded with id 4; password stored only as a hash');
check(!JSON.stringify(demo).includes(config.demoAccount.password), 'plain-text demo password appears nowhere in the stored row');

// registration
let r2 = await register.execute({ fullName: '', workerCode: 'bad', mobile: '1', password: 'short', confirmPassword: 'x' });
check(!r2.ok && r2.errors.fullName && r2.errors.workerCode && r2.errors.mobile && r2.errors.assignment && r2.errors.password, 'registration validation errors: ' + Object.keys(r2.errors).join(','));
const reg = { fullName: 'Nimal Perera', workerCode: ' ped-1234 ', mobile: '077 123 4568', estateId: 'EST-NEH', divisionId: 'DIV-02', divisionName: 'Labookellie Division', password: 'Tea#Leaf99', confirmPassword: 'Tea#Leaf99' };
r2 = await register.execute(reg);
check(r2.ok && r2.worker.workerCode === 'PED-1234' && r2.status === 'ACTIVE' && !('passwordHash' in r2.worker), 'registration normalises ID, activates in dev mode, returns no hash');
check(!(await register.execute(reg)).ok, 'duplicate Worker ID rejected');
const pending = await new RegisterWorker({ workerRepository: workerRepo, passwordHasher: hasher, config: { ...fastAuth, autoActivateRegistrations: false } })
  .execute({ ...reg, workerCode: 'PED-5555', mobile: '0771111111' });
check(pending.ok && pending.status === 'PENDING_ACTIVATION', 'with auto-activation off the account is PENDING_ACTIVATION');
check((await login.execute({ workerCode: 'PED-5555', password: 'Tea#Leaf99', isOnline: true })).code === 'NOT_ACTIVE', 'pending account cannot sign in');

// login
check((await login.execute({ workerCode: 'PED-0000', password: 'whatever1', isOnline: false })).code === 'NO_LOCAL_ACCOUNT', 'unknown ID offline -> NO_LOCAL_ACCOUNT');
check((await login.execute({ workerCode: 'nope', password: '' })).code === 'INVALID_INPUT', 'malformed input rejected before any lookup');
let l = await login.execute({ workerCode: 'PED-1234', password: 'wrongwrong', isOnline: false });
check(l.code === 'BAD_PASSWORD' && l.attemptsLeft === 4, 'wrong password -> 4 attempts left');
l = await login.execute({ workerCode: 'ped-1234', password: 'Tea#Leaf99', isOnline: false });
check(l.ok && l.worker.name === 'Nimal Perera' && !('passwordHash' in l.worker), 'correct password signs in (case-insensitive ID), no hash exposed');
check((await session.restore())?.workerCode === 'PED-1234', 'session restored after restart');
await session.end();
check((await session.restore()) === null, 'logout clears the session');
for (let i = 0; i < 4; i++) await login.execute({ workerCode: 'PED-1234', password: 'badbadbad', isOnline: true });
l = await login.execute({ workerCode: 'PED-1234', password: 'badbadbad', isOnline: true });
check(l.code === 'LOCKED', 'account locks after 5 failed attempts');
check((await login.execute({ workerCode: 'PED-1234', password: 'Tea#Leaf99', isOnline: true })).code === 'LOCKED', 'correct password still refused while locked');
clock = new Date(clock.getTime() + 16 * 60000);
check((await login.execute({ workerCode: 'PED-1234', password: 'Tea#Leaf99', isOnline: true })).ok, 'lock expires after 15 minutes');

// dev-mode reset
let rs = await reset.execute({ workerCode: 'PED-1234', mobile: '0000000000', newPassword: 'NewPass123' });
check(!rs.ok && rs.errors._form, 'reset refuses a wrong mobile number');
rs = await reset.execute({ workerCode: 'PED-1234', mobile: '077-123-4568', newPassword: 'NewPass123' });
check(rs.ok, 'reset succeeds with the registered mobile number');
check((await login.execute({ workerCode: 'PED-1234', password: 'NewPass123', isOnline: false })).ok, 'new password works after reset');
check((await login.execute({ workerCode: 'PED-1234', password: 'Tea#Leaf99', isOnline: false })).code === 'BAD_PASSWORD', 'old password no longer works');

// image quality rules
let q = evaluateBasicQuality({ width: 3000, height: 4000, sizeBytes: 2_500_000 });
check(!q.hasFailure && !q.hasWarning && !q.blocking, 'large photo passes metadata checks');
q = evaluateBasicQuality({ width: 300, height: 400, sizeBytes: 90_000 });
check(q.blocking && q.hasFailure, 'tiny resolution is a blocking failure');
q = evaluateBasicQuality({ width: 800, height: 600, sizeBytes: 60_000 });
check(!q.blocking && q.hasWarning, 'mid resolution/size is a non-blocking warning');
check(evaluateBasicQuality({ width: 3000, height: 4000, sizeBytes: 5_000 }).blocking, 'near-empty file is blocking');
check(evaluateBasicQuality({}).hasWarning && !evaluateBasicQuality({}).blocking, 'unreadable metadata is a warning, not a pass');
const good = evaluateBasicQuality({ width: 3000, height: 4000, sizeBytes: 2_500_000 });
check(decidePhotoQuality(good, {}).outcome === 'INCOMPLETE', 'worker must answer all self-checks');
check(decidePhotoQuality(good, { focus: true, glare: true, framing: true }).outcome === 'PASSED', 'all confirmed -> PASSED');
check(decidePhotoQuality(good, { focus: false, glare: true, framing: true }).outcome === 'RETAKE_RECOMMENDED', 'worker reports blur -> retake recommended');
check(decidePhotoQuality(evaluateBasicQuality({ width: 100, height: 100, sizeBytes: 9_000 }), { focus: true, glare: true, framing: true }).outcome === 'RETAKE_REQUIRED', 'blocking failure cannot be overridden');
check(getReadinessWarnings({ photos: { TOP_OF_LEAF: { qualityStatus: 'UNCERTAIN' } }, location: { gps: { status: 'MANUAL' } } }).length === 2, 'review warns about UNCERTAIN photos and manual pin');

// quality columns round-trip + delete draft + search + dashboard lists
const repo2 = new SQLiteObservationRepository({ getDatabase: ctx.getDatabase, createSamples: () => createSeedObservations() });
await repo2.seedIfEmpty();
const d = createEmptyObservation({ workerId: 7 });
d.symptoms.suspectedDisease = 'ALGAL_LEAF_SPOT'; d.symptoms.notes = 'near the Stream';
d.photos.TOP_OF_LEAF = { uri: 'file:///x.jpg', fileName: 'x.jpg', width: 3000, height: 4000, sizeBytes: 2500000, capturedAt: d.capturedAt, source: 'camera', qualityStatus: 'UNCERTAIN', qualityNotes: ['Worker reported a problem: sun glare.'] };
const saved = await new SaveDraft(repo2).execute(d);
const back = await repo2.findByUuid(d.uuid);
check(saved.ok && back.photos.TOP_OF_LEAF.qualityStatus === 'UNCERTAIN' && back.photos.TOP_OF_LEAF.qualityNotes[0].includes('glare') && back.photos.TOP_OF_LEAF.sizeBytes === 2500000, 'photo quality status, notes and size persist');
const search = new GetObservations(repo2);
check((await search.execute({ workerId: 7, query: 'stream' })).length === 1, 'search matches notes (case-insensitive)');
check((await search.execute({ workerId: 7, query: 'algal' })).length === 1 && (await search.execute({ workerId: 7, query: 'zzz' })).length === 0, 'search matches disease name; no match returns none');
check((await search.execute({ workerId: 4, query: '8941' })).length === 1, 'search matches observation id');
const sum = await new GetDashboardSummary(repo2).execute({ workerId: 4 });
check(sum.drafts.length === 1 && sum.pending.length === 3 && sum.recent.length === 5 && sum.recent.every((o) => o.status !== 'DRAFT'), 'dashboard returns drafts, pending and recent separately');
check((await new GetDashboardSummary(repo2).execute({ workerId: 99 })).total === 0, 'a new worker sees none of the demo worker\'s records');
const del = new DeleteDraft(repo2);
const dres = await del.execute(d.uuid);
check(dres.ok && dres.photoUris[0] === 'file:///x.jpg' && !(await repo2.findByUuid(d.uuid)), 'draft deleted and photo URIs returned for cleanup');
check(!(await del.execute('seed-8941')).ok && (await repo2.findByUuid('seed-8941')), 'submitted records cannot be deleted');

// sync honesty
const before = JSON.stringify((await repo2.findUnsynced()).map((o) => [o.uuid, o.syncStatus]));
const syncResult = await new SyncPendingObservations({ repository: repo2, gateway: new UnavailableSyncGateway() }).execute();
const after = JSON.stringify((await repo2.findUnsynced()).map((o) => [o.uuid, o.syncStatus]));
check(syncResult.attempted === false && syncResult.waiting === 3 && /not implemented/i.test(syncResult.reason), 'sync reports it is unavailable');
check(before === after, 'sync with no backend changes NO record status');
class FakeOkGateway { async checkAvailability() { return { available: true }; } async upload(items) { return items.slice(0, 1).map((o) => ({ uuid: o.uuid, status: 'SYNCED' })); } }
const real = await new SyncPendingObservations({ repository: repo2, gateway: new FakeOkGateway() }).execute();
check(real.attempted && real.synced === 1 && real.waiting === 2, 'a real gateway only marks records it confirms as SYNCED');
ctx.db.close();

rmSync(file, { force: true });
console.log(failed ? `\n${failed} FAILED` : '\nall logic tests passed');
process.exit(failed ? 1 : 0);
