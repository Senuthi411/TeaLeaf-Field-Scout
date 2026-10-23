import { useState } from 'react';
import { devices } from '../../container.js';
import { GpsStatus } from '../../domain/entities/Observation.js';
import { useObservationForm } from './ObservationFormContext.js';

/** GPS actions for the location step. Permission is requested only from these (user-initiated) calls. */
export function useGpsCapture() {
  const { form, updateLocation } = useObservationForm();
  const [gpsInfo, setGpsInfo] = useState({});

  const requestGps = async () => {
    updateLocation({ gps: { ...form.location.gps, status: GpsStatus.REQUESTING, isManual: false } });
    const result = await devices.LocationService.requestCurrentPosition();
    setGpsInfo({ canAskAgain: result.canAskAgain, message: result.message });
    updateLocation({
      gps: {
        status: result.status,
        latitude: result.latitude ?? null,
        longitude: result.longitude ?? null,
        accuracyMeters: result.accuracyMeters ?? null,
        isManual: false,
      },
    });
  };

  const useManualLocation = () =>
    updateLocation({ gps: { status: GpsStatus.MANUAL, latitude: null, longitude: null, accuracyMeters: null, isManual: true } });

  return { gpsInfo, requestGps, useManualLocation };
}
