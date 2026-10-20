export function readJSON(key, fallback, storage = localStorage) {
  try {
    return JSON.parse(storage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}
export function writeJSON(key, value, storage = localStorage) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    throw new Error(
      "Browser storage is unavailable. Enable site storage and try again.",
    );
  }
}
export function removeStored(key, storage = localStorage) {
  try {
    storage.removeItem(key);
  } catch {
    /* No stored session to remove. */
  }
}
