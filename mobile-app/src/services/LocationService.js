// Adapter around expo-location. Permission is requested ONLY inside requestCurrentPosition(),
// which the UI calls from a user tap. getStatusSnapshot() never prompts.
import * as Location from 'expo-location';
import { GpsStatus } from '../domain/entities/Observation.js';

const FIX_TIMEOUT_MS = 20000;

export const LocationService = {
  /** Reads permission / services state without prompting. Not a location fix. */
  async getStatusSnapshot() {
    try {
      const permission = await Location.getForegroundPermissionsAsync();
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      return { permissionGranted: permission.granted, canAskAgain: permission.canAskAgain, servicesEnabled };
    } catch {
      return { permissionGranted: false, canAskAgain: true, servicesEnabled: false };
    }
  },

  async requestCurrentPosition() {
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) return { status: GpsStatus.PERMISSION_DENIED, canAskAgain: permission.canAskAgain };
      if (!(await Location.hasServicesEnabledAsync())) return { status: GpsStatus.SERVICES_DISABLED };

      const position = await Promise.race([
        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('No GPS fix after 20 seconds.')), FIX_TIMEOUT_MS)),
      ]);
      return {
        status: GpsStatus.READY,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracyMeters: position.coords.accuracy ?? null,
      };
    } catch (error) {
      return { status: GpsStatus.ERROR, message: error?.message ?? 'Could not get a GPS fix.' };
    }
  },
};
