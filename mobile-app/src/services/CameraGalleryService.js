// Adapter around expo-image-picker. Always resolves; never throws.
// Result: { status: 'ok', asset } | 'cancelled' | 'denied' | 'blocked' | 'error' (+ message)
import * as ImagePicker from 'expo-image-picker';

const PICKER_OPTIONS = { mediaTypes: ['images'], quality: 0.8, allowsEditing: false };

function toResult(result) {
  if (result.canceled) return { status: 'cancelled' };
  const asset = result.assets?.[0];
  if (!asset?.uri) return { status: 'error', message: 'No image was returned.' };
  return {
    status: 'ok',
    asset: { uri: asset.uri, fileName: asset.fileName ?? null, width: asset.width ?? null, height: asset.height ?? null },
  };
}

export const CameraGalleryService = {
  async takePhoto() {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) return { status: permission.canAskAgain ? 'denied' : 'blocked' };
      return toResult(await ImagePicker.launchCameraAsync(PICKER_OPTIONS));
    } catch (error) {
      return { status: 'error', message: error?.message ?? 'The camera is not available on this device.' };
    }
  },

  // The Android photo picker needs no runtime permission.
  async pickFromGallery() {
    try {
      return toResult(await ImagePicker.launchImageLibraryAsync({ ...PICKER_OPTIONS, allowsMultipleSelection: false }));
    } catch (error) {
      return { status: 'error', message: error?.message ?? 'The gallery could not be opened.' };
    }
  },
};
