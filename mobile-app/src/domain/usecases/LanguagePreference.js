const KEY = 'language';
export const SUPPORTED_LANGUAGES = ['en', 'si', 'ta'];

export class LanguagePreference {
  constructor(settingsRepository) {
    this.settings = settingsRepository;
  }
  async get() {
    const value = await this.settings.get(KEY);
    return SUPPORTED_LANGUAGES.includes(value) ? value : 'en';
  }
  async set(language) {
    if (!SUPPORTED_LANGUAGES.includes(language)) throw new Error(`Unsupported language: ${language}`);
    await this.settings.set(KEY, language);
  }
}
