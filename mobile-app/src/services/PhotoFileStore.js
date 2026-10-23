// Adapter around expo-file-system (new File/Directory API, default since SDK 54).
// Keep all file-system calls here so an API change only touches this file.
import { Directory, File, Paths } from 'expo-file-system';

const photosDirectory = () => new Directory(Paths.document, 'observation-photos');

function extensionFor(uri) {
  const match = /\.([a-zA-Z0-9]{3,4})(?:\?|$)/.exec(uri ?? '');
  return match ? match[1].toLowerCase() : 'jpg';
}

export const PhotoFileStore = {
  /** Copies a picked/captured image into app-managed storage and returns its permanent URI. */
  async persist(sourceUri, { observationUuid, angle }) {
    const directory = photosDirectory();
    if (!directory.exists) directory.create({ intermediates: true, idempotent: true });
    const target = new File(directory, `${observationUuid}-${angle}-${Date.now()}.${extensionFor(sourceUri)}`);
    await new File(sourceUri).copy(target);
    return target.uri;
  },

  /** Returns { exists, sizeBytes } for any file URI (cache or app storage). Never throws. */
  info(uri) {
    try {
      const file = new File(uri);
      return { exists: Boolean(file.exists), sizeBytes: file.exists ? file.size : null };
    } catch {
      return { exists: false, sizeBytes: null };
    }
  },

  /** True when the file is still present (it can vanish if app data is cleared). */
  exists(uri) {
    try {
      return Boolean(uri) && new File(uri).exists;
    } catch {
      return false;
    }
  },

  /** Deletes a photo, but only inside our own photo directory. Never throws. */
  async remove(uri) {
    try {
      if (!uri || !uri.startsWith(photosDirectory().uri)) return;
      const file = new File(uri);
      if (file.exists) file.delete();
    } catch {
      // Best effort cleanup.
    }
  },
};
