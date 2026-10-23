/** Port: salted, slow password hashing (implemented in src/services). */
export class PasswordHasher {
  /** @returns {string} a random salt (hex) */
  createSalt() {
    throw new Error('PasswordHasher.createSalt() is not implemented');
  }
  // eslint-disable-next-line no-unused-vars
  async hash(password, salt, iterations) {
    throw new Error('PasswordHasher.hash() is not implemented');
  }
}
