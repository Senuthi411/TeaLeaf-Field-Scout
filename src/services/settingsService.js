import { appConfig } from "./config";
import { apiRequest } from "./api/client";
import { readJSON, writeJSON } from "../utils/storage";
export const defaultSettings = {
  requireMfa: true,
  allowFido: true,
  sessionTimeout: 30,
  pinLength: 6,
  failedAttempts: 5,
  syncInterval: 5,
  packRefresh: "02:00",
  conflictResolution: "Prompt worker",
  photoRetention: 24,
  auditRetention: 7,
  deletedRetention: 90,
  emailNotifications: true,
  pushNotifications: true,
  escalationEmail: "",
  offlineMode: true,
};
const key = "tealeaf:admin:settings:v1";
export const settingsService = {
  async get() {
    if (!(appConfig.isDevelopment && appConfig.authMode === "mock")) {
      const data = await apiRequest("/settings");
      return { ...defaultSettings, ...data.settings };
    }
    const saved = readJSON(key, null);
    if (saved) return { ...defaultSettings, ...saved };
    const legacy = readJSON("tealeaf:saved:/settings", []),
      timeout = legacy.find((item) => item.id === "121:593")?.value;
    return {
      ...defaultSettings,
      ...(timeout && Number.parseInt(timeout)
        ? { sessionTimeout: Number.parseInt(timeout) }
        : {}),
    };
  },
  async save(settings) {
    if (!(appConfig.isDevelopment && appConfig.authMode === "mock")) {
      const data = await apiRequest("/settings", {
        method: "PATCH",
        body: settings,
      });
      return { ...defaultSettings, ...data.settings };
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
    writeJSON(key, settings);
    return settings;
  },
};
