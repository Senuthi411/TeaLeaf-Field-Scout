import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, AppState, Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../components/AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { appServices, config, devices, locationHierarchy } from '../../container.js';
import { colors, radius, shadows, fonts } from '../../constants/theme.js';
import { spacing } from '../../constants/spacing.js';
import { useApp } from '../state/AppContext.js';
import { useAuth } from '../state/AuthContext.js';
import { useObservationForm } from '../state/ObservationFormContext.js';
import { useSyncNow } from '../state/useSyncNow.js';
import { findBlock, findDivision, findEstate } from '../utils/locationOptions.js';
import AppButton from '../components/AppButton.js';
import AppHeader from '../components/AppHeader.js';
import BottomNavigation from '../components/BottomNavigation.js';
import ConnectionBadge from '../components/ConnectionBadge.js';
import LanguageModal from '../components/LanguageModal.js';
import Notice from '../components/Notice.js';
import ObservationCard from '../components/ObservationCard.js';
import Screen from '../components/Screen.js';
import StatCard from '../components/StatCard.js';
import StatusBadge from '../components/StatusBadge.js';

/** Location-permission state only. A real GPS fix is requested from the location step. */
function useLocationAccess() {
  const [snapshot, setSnapshot] = useState(null);
  useEffect(() => {
    let active = true;
    const refresh = () => devices.LocationService.getStatusSnapshot().then((s) => active && setSnapshot(s));
    refresh();
    const subscription = AppState.addEventListener('change', (state) => state === 'active' && refresh());
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);
  return snapshot;
}

// Short labels so the pill fits next to the location text. They describe access, not a GPS fix.
function GpsAccessBadge({ snapshot }) {
  if (!snapshot) return <StatusBadge tone="neutral" icon="locate-outline">GPS…</StatusBadge>;
  if (!snapshot.servicesEnabled) return <StatusBadge tone="danger" icon="alert-circle">GPS off</StatusBadge>;
  if (!snapshot.permissionGranted) return <StatusBadge tone="warning" icon="locate-outline">GPS: allow</StatusBadge>;
  return <StatusBadge tone="success" icon="locate">GPS enabled</StatusBadge>;
}

export default function HomeScreen() {
  const router = useRouter();
  const { worker, signOut } = useAuth();
  const { startNew } = useObservationForm();
  const { t, language, dataVersion, notifyDataChanged, flash, clearFlash } = useApp();
  const [summary, setSummary] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [languageOpen, setLanguageOpen] = useState(false);
  const locationAccess = useLocationAccess();

  const load = useCallback(async () => {
    setStatus((current) => (current === 'ready' ? current : 'loading'));
    try {
      setSummary(await appServices.getDashboardSummary.execute({ workerId: worker.id }));
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, [worker.id]);

  useEffect(() => {
    load();
  }, [load, dataVersion]);

  const waiting = summary?.stats.waitingToSync ?? 0;
  const sync = useSyncNow(waiting);
  const isDemo = worker.workerCode === config.demoAccount.workerCode;

  const estate = findEstate(locationHierarchy, worker.defaultEstateId);
  const division = findDivision(locationHierarchy, worker.defaultEstateId, worker.defaultDivisionId);
  const block = findBlock(locationHierarchy, worker.defaultEstateId, worker.defaultDivisionId, worker.defaultBlockId);

  const viewDetails = (o) => router.push(`/observation/${o.uuid}`);
  const continueDraft = (o) => router.push({ pathname: '/observation/resume', params: { uuid: o.uuid } });

  const confirmSignOut = () =>
    Alert.alert('Sign out?', 'Your drafts and observations stay on this phone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', onPress: async () => { startNew(); await signOut(); router.replace('/login'); } },
    ]);

  const confirmClearSamples = () =>
    Alert.alert('Remove sample data?', 'This deletes only the illustrative sample records. Your own drafts and observations are kept.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: async () => { await appServices.clearSampleData.execute(); notifyDataChanged(); } },
    ]);

  const header = (
    <AppHeader
      title={t('app.short')}
      right={
        <View style={styles.headerRight}>
          <Pressable onPress={() => setLanguageOpen(true)} accessibilityRole="button" accessibilityLabel={`${t('lang.title')}: ${language.toUpperCase()}`} style={styles.langButton}>
            <Ionicons name="globe-outline" size={18} color={colors.text} />
            <Text style={styles.langText}>{language.toUpperCase()}</Text>
            <Ionicons name="chevron-down" size={16} color={colors.textMuted} />
          </Pressable>
          <ConnectionBadge />
        </View>
      }
    />
  );

  return (
    <Screen header={header} footer={<BottomNavigation active="home" />} contentStyle={styles.content}>
      {flash ? <Notice tone={flash.tone} title={flash.title} onDismiss={clearFlash}>{flash.message}</Notice> : null}

      {/* Estate · division · block + GPS access */}
      <View style={[styles.card, styles.strip]} accessible accessibilityLabel={`${estate?.name}, ${division?.id}, ${block?.id ?? 'no block selected'}`}>
        <Ionicons name="location-outline" size={18} color={colors.primaryDark} />
        <Text style={styles.stripText} numberOfLines={1}>
          {estate?.name ?? 'No estate'} · {division?.id ?? '—'} · {block?.id ?? 'no block'}
        </Text>
        <GpsAccessBadge snapshot={locationAccess} />
      </View>

      {/* Worker */}
      <View style={[styles.card, styles.worker]}>
        <View style={styles.avatar}><Ionicons name="person-outline" size={22} color={colors.primaryDark} /></View>
        <View style={styles.flex}>
          <Text style={styles.name}>{worker.name}</Text>
          <Text style={styles.muted} numberOfLines={1}>Scout ID {worker.scoutId} · {worker.divisionName}</Text>
        </View>
        {summary ? (
          waiting > 0 ? <StatusBadge tone="warning" icon="cloud-offline">{waiting} waiting</StatusBadge> : <StatusBadge tone="success" icon="checkmark-circle">Nothing waiting</StatusBadge>
        ) : null}
      </View>

      {/* Primary action */}
      <Pressable onPress={() => router.push('/observation/location?new=1')} accessibilityRole="button" accessibilityLabel={`${t('dash.newObs')}. ${t('dash.newObsSub')}`} style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}>
        <View style={styles.ctaIcon}><Ionicons name="camera-outline" size={26} color={colors.primary} /></View>
        <View style={styles.flex}>
          <Text style={styles.ctaTitle}>+ {t('dash.newObs')}</Text>
          <Text style={styles.ctaSub}>{t('dash.newObsSub')}</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
      </Pressable>

      {/* Stats */}
      <View style={styles.statRow}>
        <StatCard icon="checkmark-circle-outline" label={t('stats.scans')} value={summary?.stats.scansToday ?? '–'} caption={t('stats.today')} />
        <StatCard icon="cloud-offline-outline" label={t('stats.waiting')} value={summary?.stats.waitingToSync ?? '–'} caption={t('stats.toSync')} tone={waiting > 0 ? 'warning' : 'neutral'} />
        <StatCard icon="refresh" label={t('stats.retakes')} value={summary?.stats.retakesRequired ?? '–'} caption={summary?.stats.retakesRequired > 0 ? t('stats.required') : 'clean'} tone={summary?.stats.retakesRequired > 0 ? 'danger' : 'neutral'} />
      </View>

      {status === 'loading' && !summary ? <View style={styles.center}><ActivityIndicator color={colors.primary} /><Text style={styles.muted}>Loading observations…</Text></View> : null}
      {status === 'error' ? (
        <Notice tone="danger" title="Could not load observations">
          <Pressable onPress={load} accessibilityRole="button"><Text style={styles.linkDanger}>Try again</Text></Pressable>
        </Notice>
      ) : null}

      {/* Saved drafts (only when there are some) */}
      {summary?.drafts.length > 0 ? (
        <>
          <Text style={styles.sectionTitle} accessibilityRole="header">{t('home.drafts')}</Text>
          {summary.drafts.map((o) => <ObservationCard key={o.uuid} observation={o} onViewDetails={viewDetails} onContinueDraft={continueDraft} />)}
        </>
      ) : null}

      {/* Recent submissions */}
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle} accessibilityRole="header">{t('dash.recent')}</Text>
        <Pressable onPress={() => router.navigate('/history')} accessibilityRole="button" accessibilityLabel="Filter and view all submissions" style={styles.filterButton}>
          <Ionicons name="options-outline" size={18} color={colors.primaryDark} />
          <Text style={styles.filterText}>{division?.id ?? 'All'} · All</Text>
        </Pressable>
      </View>

      {status === 'ready' && summary.total === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="leaf-outline" size={34} color={colors.primary} />
          <Text style={styles.strong}>{t('dash.empty')}</Text>
          <Text style={[styles.muted, styles.centerText]}>{t('dash.emptyHint')}</Text>
        </View>
      ) : null}
      {summary?.recent.map((o) => <ObservationCard key={o.uuid} observation={o} onViewDetails={viewDetails} onContinueDraft={continueDraft} />)}

      {/* Waiting-to-sync banner (Figma): honest — nothing is uploaded */}
      {waiting > 0 ? (
        <View style={styles.syncBanner}>
          <Ionicons name="cloud-offline-outline" size={22} color={colors.warningText} />
          <Text style={styles.syncText}>{waiting} {waiting === 1 ? 'record is' : 'records are'} saved on this phone, waiting to sync.</Text>
          <AppButton compact icon="sync" title={t('dash.syncAll')} onPress={sync.run} disabled={sync.disabled} loading={sync.running} />
        </View>
      ) : null}
      {sync.message ? <Notice tone="info">{sync.message}</Notice> : null}

      {summary?.stats.sampleCount > 0 ? (
        <View style={styles.footerNote}>
          <Text style={styles.muted}>Sample submissions are illustrative (mock data, not real device data).</Text>
          <Pressable onPress={confirmClearSamples} accessibilityRole="button" hitSlop={8}><Text style={styles.link}>Remove sample data</Text></Pressable>
        </View>
      ) : null}
      {!config.presentationMode ? (
        <>
          {isDemo ? <Text style={styles.muted}>Signed in with the demo account.</Text> : null}
          <Pressable onPress={confirmSignOut} accessibilityRole="button" hitSlop={8} style={styles.signOut}>
            <Ionicons name="log-out-outline" size={18} color={colors.textMuted} />
            <Text style={styles.link}>{t('home.signOut')}</Text>
          </Pressable>
        </>
      ) : null}

      <LanguageModal visible={languageOpen} onClose={() => setLanguageOpen(false)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 4 },
  flex: { flex: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  langButton: { minHeight: 38, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, borderRadius: radius.control, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  langText: { fontSize: 14, fontWeight: '600', color: colors.text },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card },
  strip: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 12 },
  stripText: { flex: 1, fontSize: 13, fontWeight: '600', color: colors.text },
  worker: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: spacing.lg },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  muted: { fontSize: 13, color: colors.textMuted },
  strong: { fontSize: 15, fontWeight: '700', color: colors.text },
  centerText: { textAlign: 'center' },
  cta: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: spacing.lg, borderRadius: radius.card, backgroundColor: colors.primary, ...shadows.raised },
  ctaPressed: { backgroundColor: colors.primaryDark },
  ctaIcon: { width: 50, height: 50, borderRadius: radius.control, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  ctaTitle: { fontFamily: fonts.heading, fontSize: 17, fontWeight: '600', color: '#FFFFFF' },
  ctaSub: { fontSize: 13, color: '#E8F5E9' },
  statRow: { flexDirection: 'row', gap: 10 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  sectionTitle: { fontFamily: fonts.heading, fontSize: 18, fontWeight: '600', color: colors.text },
  filterButton: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, borderRadius: radius.control, borderWidth: 1.5, borderColor: colors.primary, backgroundColor: colors.surface },
  filterText: { fontSize: 14, fontWeight: '700', color: colors.primaryDark },
  syncBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: radius.control, backgroundColor: '#FFFBEB', borderWidth: 1, borderColor: colors.warningBorder },
  syncText: { flex: 1, fontSize: 14, color: colors.warningText },
  footerNote: { gap: 4 },
  link: { fontSize: 14, fontWeight: '700', color: colors.primaryDark, textDecorationLine: 'underline', paddingVertical: 4 },
  linkDanger: { fontSize: 14, fontWeight: '700', color: colors.dangerText, textDecorationLine: 'underline' },
  signOut: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', minHeight: 44 },
  center: { alignItems: 'center', gap: 8, padding: 16 },
  empty: { alignItems: 'center', gap: 6, padding: 28, backgroundColor: colors.surface, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.borderStrong, borderRadius: radius.card },
});
