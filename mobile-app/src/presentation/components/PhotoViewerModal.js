import { useState } from 'react';
import { ActivityIndicator, Image, Modal, Pressable, StyleSheet, View } from 'react-native';
import { Text } from './AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** Full-screen photo preview. Falls back to a message when the file is missing. */
export default function PhotoViewerModal({ photo, title, onClose }) {
  const insets = useSafeAreaInsets();
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <Modal visible={Boolean(photo)} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <View style={styles.root}>
        <View style={[styles.bar, { paddingTop: insets.top + 8 }]}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Close photo" hitSlop={12} style={styles.close}>
            <Ionicons name="close" size={26} color="#FFFFFF" />
          </Pressable>
        </View>
        <View style={styles.body}>
          {photo && !failed ? (
            <Image source={{ uri: photo.uri }} style={styles.image} resizeMode="contain" onLoadEnd={() => setLoading(false)} onError={() => { setFailed(true); setLoading(false); }} accessibilityLabel={title} />
          ) : (
            <Text style={styles.missing}>The photo file is missing from this phone.</Text>
          )}
          {loading && photo && !failed ? <ActivityIndicator color="#FFFFFF" style={StyleSheet.absoluteFill} /> : null}
        </View>
        {photo ? (
          <Text style={[styles.meta, { paddingBottom: insets.bottom + 12 }]}>
            {[photo.width && photo.height ? `${photo.width}×${photo.height}px` : null, photo.sizeBytes ? `${Math.round(photo.sizeBytes / 1024)} KB` : null, photo.source, photo.qualityStatus === 'UNCERTAIN' ? 'Quality: uncertain' : photo.qualityStatus === 'PASSED' ? 'Quality: confirmed clear' : null].filter(Boolean).join(' · ')}
          </Text>
        ) : null}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: 'rgba(0,0,0,0.94)' },
  bar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 8 },
  title: { flex: 1, fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
  close: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
  missing: { color: '#FFFFFF', fontSize: 15, padding: 24, textAlign: 'center' },
  meta: { color: '#B8C7BA', textAlign: 'center', fontSize: 12, paddingTop: 8 },
});
