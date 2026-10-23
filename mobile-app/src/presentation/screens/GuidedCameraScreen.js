import { useRef, useState } from 'react';
import { ActivityIndicator, Linking, Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../components/AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { devices } from '../../container.js';
import { PhotoSource } from '../../domain/entities/Observation.js';
import { ALL_PHOTO_ANGLES, OPTIONAL_PHOTO_ANGLES, REQUIRED_PHOTO_ANGLES } from '../../domain/entities/observationOptions.js';
import { countPhotos } from '../../domain/validation/observationValidation.js';
import { useObservationForm } from '../state/ObservationFormContext.js';
import { useStepBack } from '../state/useStepBack.js';
import AppButton from '../components/AppButton.js';
import ConnectionBadge from '../components/ConnectionBadge.js';
import Notice from '../components/Notice.js';

const DARK = '#0E1710';

/** Step 2a: live camera with an outline guide and instructions for the chosen angle. */
export default function GuidedCameraScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const { form, observation, setPendingCapture, firstMissingAngle } = useObservationForm();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const initial = ALL_PHOTO_ANGLES.some((a) => a.angle === params.angle) ? params.angle : firstMissingAngle() ?? REQUIRED_PHOTO_ANGLES[0].angle;
  const [angle, setAngle] = useState(initial);
  const [torch, setTorch] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const current = ALL_PHOTO_ANGLES.find((a) => a.angle === angle);
  const isExtra = OPTIONAL_PHOTO_ANGLES.some((a) => a.angle === angle);
  const tabs = isExtra ? [...REQUIRED_PHOTO_ANGLES, current] : REQUIRED_PHOTO_ANGLES;
  const photoCount = countPhotos(form.photos);
  const index = REQUIRED_PHOTO_ANGLES.findIndex((a) => a.angle === angle) + 1;

  const back = () => router.replace(photoCount > 0 ? '/observation/gallery' : '/observation/location');
  useStepBack('/observation/camera', back);

  const goToQuality = (capture) => {
    setPendingCapture({ ...capture, angle });
    router.replace('/observation/quality');
  };

  const capture = async () => {
    if (!cameraRef.current || busy) return;
    setBusy(true);
    setMessage(null);
    try {
      const picture = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      const info = devices.PhotoFileStore.info(picture.uri);
      goToQuality({ uri: picture.uri, width: picture.width, height: picture.height, sizeBytes: info.sizeBytes, source: PhotoSource.CAMERA });
    } catch (error) {
      setMessage({ tone: 'danger', title: 'Could not take the photo', text: error?.message ?? 'The camera failed. Try again or choose from the gallery.' });
    } finally {
      setBusy(false);
    }
  };

  const pickFromGallery = async () => {
    setMessage(null);
    const result = await devices.CameraGalleryService.pickFromGallery();
    if (result.status === 'cancelled') return;
    if (result.status !== 'ok') {
      setMessage({ tone: 'danger', title: 'Could not open the gallery', text: result.message ?? 'Try again.' });
      return;
    }
    const info = devices.PhotoFileStore.info(result.asset.uri);
    goToQuality({ ...result.asset, sizeBytes: info.sizeBytes, source: PhotoSource.GALLERY });
  };

  const top = (
    <View style={[styles.top, { paddingTop: insets.top + 8 }]}>
      <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" style={styles.roundButton}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </Pressable>
      <View style={styles.topTitle}>
        <Text style={styles.topMain}>{isExtra ? `Extra photo: ${current.label}` : `Photo ${index} of 3: ${current.label}`}</Text>
        <Text style={styles.topSub}>{observation.location.divisionId} · {observation.location.blockId} · {observation.displayId ?? 'New'}</Text>
      </View>
      <ConnectionBadge />
    </View>
  );

  // ---- permission not granted yet: ask only when the user taps ----
  if (!permission) {
    return <View style={[styles.root, styles.center]}><StatusBar style="light" /><ActivityIndicator color="#FFFFFF" /></View>;
  }
  if (!permission.granted) {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        {top}
        <View style={[styles.center, styles.pad]}>
          <Ionicons name="camera-outline" size={56} color="#FFFFFF" />
          <Text style={styles.permTitle}>Camera access is needed</Text>
          <Text style={styles.permText}>
            TeaLeaf Field Scout uses the camera only to photograph tea leaves for this observation. You can also choose existing photos from the gallery.
          </Text>
          {message ? <Notice tone={message.tone} title={message.title}>{message.text}</Notice> : null}
          {permission.canAskAgain ? (
            <AppButton icon="camera" title="Allow camera" onPress={requestPermission} />
          ) : (
            <AppButton icon="settings-outline" title="Open Settings" onPress={() => Linking.openSettings()} />
          )}
          <AppButton variant="secondary" icon="images-outline" title="Choose from gallery" onPress={pickFromGallery} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      {top}
      <View style={styles.cameraWrap}>
        <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="back" enableTorch={torch} onCameraReady={() => setCameraReady(true)} />
        <View style={styles.overlay} pointerEvents="none">
          <View style={styles.frame} />
          <Text style={styles.guide}>{current.hint}</Text>
        </View>
        {!cameraReady ? <View style={[styles.center, StyleSheet.absoluteFill]}><ActivityIndicator color="#FFFFFF" /></View> : null}
      </View>

      <View style={[styles.bottom, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View style={styles.tabs} accessibilityRole="tablist">
          {tabs.map((item, i) => {
            const selected = item.angle === angle;
            const done = Boolean(form.photos[item.angle]);
            return (
              <Pressable key={item.angle} onPress={() => setAngle(item.angle)} accessibilityRole="tab" accessibilityState={{ selected }}
                accessibilityLabel={`${item.label}${done ? ', photo saved' : ''}`} style={[styles.tab, selected && styles.tabSelected]}>
                <Text style={[styles.tabText, selected && styles.tabTextSelected]}>{done ? '✓ ' : `${i + 1} `}{item.label.replace('Underside of leaf', 'Underside')}</Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.tip}>Hold steady and tilt to reduce glare. Keep the leaf inside the outline.</Text>
        {message ? <Notice tone={message.tone} title={message.title}>{message.text}</Notice> : null}

        <View style={styles.controls}>
          <View style={styles.side}>
            <Text style={styles.counter}>{photoCount}/3</Text>
            <Text style={styles.sideLabel}>Photos</Text>
          </View>
          <Pressable onPress={capture} disabled={busy || !cameraReady} accessibilityRole="button" accessibilityLabel="Take photo" style={[styles.shutterOuter, (busy || !cameraReady) && styles.shutterDisabled]}>
            {busy ? <ActivityIndicator color={DARK} /> : <View style={styles.shutterInner} />}
          </Pressable>
          <View style={styles.side}>
            <Pressable onPress={() => setTorch((t) => !t)} accessibilityRole="button" accessibilityLabel={torch ? 'Turn torch off' : 'Turn torch on'} accessibilityState={{ selected: torch }} style={[styles.roundButton, torch && styles.torchOn]}>
              <Ionicons name={torch ? 'flash' : 'flash-outline'} size={22} color="#FFFFFF" />
            </Pressable>
            <Pressable onPress={pickFromGallery} accessibilityRole="button" accessibilityLabel="Choose from gallery" hitSlop={8}>
              <Text style={styles.galleryLink}>Gallery</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: DARK },
  center: { alignItems: 'center', justifyContent: 'center' },
  pad: { flex: 1, padding: 24, gap: 14 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingBottom: 10 },
  topTitle: { flex: 1 },
  topMain: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
  topSub: { fontSize: 12, color: '#B8C7BA' },
  roundButton: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.14)' },
  torchOn: { backgroundColor: '#B7791F' },
  cameraWrap: { flex: 1, backgroundColor: '#000000', overflow: 'hidden' },
  overlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', gap: 16 },
  frame: { width: '72%', aspectRatio: 0.8, borderRadius: 36, borderWidth: 3, borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.9)' },
  guide: { maxWidth: '80%', textAlign: 'center', fontSize: 15, fontWeight: '700', color: '#FFFFFF', textShadowColor: 'rgba(0,0,0,0.8)', textShadowRadius: 4 },
  bottom: { gap: 12, paddingHorizontal: 16, paddingTop: 12, backgroundColor: DARK },
  tabs: { flexDirection: 'row', gap: 8 },
  tab: { flex: 1, minHeight: 44, borderRadius: 999, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6, backgroundColor: 'rgba(255,255,255,0.12)' },
  tabSelected: { backgroundColor: '#FFFFFF' },
  tabText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  tabTextSelected: { color: DARK },
  tip: { fontSize: 13, color: '#B8C7BA', textAlign: 'center' },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  side: { width: 84, alignItems: 'center', gap: 6 },
  counter: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  sideLabel: { fontSize: 12, color: '#B8C7BA' },
  shutterOuter: { width: 82, height: 82, borderRadius: 41, borderWidth: 4, borderColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  shutterDisabled: { opacity: 0.5 },
  shutterInner: { width: 62, height: 62, borderRadius: 31, backgroundColor: '#FFFFFF' },
  galleryLink: { fontSize: 13, fontWeight: '700', color: '#FFFFFF', textDecorationLine: 'underline' },
  permTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF', textAlign: 'center' },
  permText: { fontSize: 14, lineHeight: 20, color: '#B8C7BA', textAlign: 'center' },
});
