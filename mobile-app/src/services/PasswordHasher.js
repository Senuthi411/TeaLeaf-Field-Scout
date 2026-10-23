import * as Crypto from 'expo-crypto';
import { PasswordHasher } from '../domain/ports/PasswordHasher.js';
import { fromHex, pbkdf2Sha256, toHex, utf8Encode } from './pbkdf2Sha256.js';

/** Salted PBKDF2-HMAC-SHA256. The salt comes from the OS secure random source via expo-crypto. */
export class ExpoPasswordHasher extends PasswordHasher {
  createSalt() {
    return toHex(Crypto.getRandomBytes(16));
  }

  async hash(password, salt, iterations) {
    // Yield once so the "Signing in…" spinner can paint before the CPU-heavy loop starts.
    await new Promise((resolve) => setTimeout(resolve, 0));
    return toHex(pbkdf2Sha256(utf8Encode(password), fromHex(salt), iterations, 32));
  }
}
