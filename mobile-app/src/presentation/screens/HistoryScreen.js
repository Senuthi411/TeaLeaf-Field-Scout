import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { Text, TextInput } from '../components/AppText.js';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { appServices } from '../../container.js';
import { ObservationFilter } from '../../domain/entities/Observation.js';
import { colors, radius, fonts } from '../../constants/theme.js';
import { spacing } from '../../constants/spacing.js';
import { useApp } from '../state/AppContext.js';
import { useAuth } from '../state/AuthContext.js';
import AppHeader from '../components/AppHeader.js';
import BottomNavigation from '../components/BottomNavigation.js';
import ConnectionBadge from '../components/ConnectionBadge.js';
import Notice from '../components/Notice.js';
import ObservationCard from '../components/ObservationCard.js';
import Screen from '../components/Screen.js';
import StatusBadge from '../components/StatusBadge.js';

const FILTERS = [
  { value: ObservationFilter.ALL, label: 'All' },
  { value: ObservationFilter.DRAFT, label: 'Drafts' },
  { value: ObservationFilter.WAITING, label: 'Waiting to sync' },
  { value: ObservationFilter.FAILED, label: 'Sync failed' },
  { value: ObservationFilter.SYNCED, label: 'Synced' },
];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function groupByMonth(items) {
  const groups = [];
  items.forEach((o) => {
    const d = new Date(o.submittedAt ?? o.updatedAt);
    const title = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    const last = groups[groups.length - 1];
    if (last?.title === title) last.items.push(o);
    else groups.push({ title, items: [o] });
  });
  return groups;
}

export default function HistoryScreen() {
  const router = useRouter();
  const { worker } = useAuth();
  const { t, dataVersion } = useApp();
  const [filter, setFilter] = useState(ObservationFilter.ALL);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(null);
  const [totals, setTotals] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    const timer = setTimeout(() => {
      Promise.all([
        appServices.getObservations.execute({ workerId: worker.id, filter, query }),
        appServices.getObservations.execute({ workerId: worker.id }),
      ])
        .then(([filtered, all]) => {
          if (cancelled) return;
          setItems(filtered);
          setTotals({ all: all.length, synced: all.filter((o) => o.status !== 'DRAFT' && o.syncStatus === 'SYNCED').length, notSynced: all.filter((o) => o.status === 'DRAFT' || o.syncStatus !== 'SYNCED').length });
        })
        .catch(() => !cancelled && setFailed(true));
    }, query ? 250 : 0); // debounce typing
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [filter, query, dataVersion, worker.id]);

  const groups = useMemo(() => (items ? groupByMonth(items) : []), [items]);

  return (
    <Screen header={<AppHeader title={t('nav.history')} subtitle="Observations on this phone" right={<ConnectionBadge />} />} footer={<BottomNavigation active="history" />}>
      {totals ? (
        <View style={styles.summary}>
          <View>
            <Text style={styles.big}>{totals.all}</Text>
            <Text style={styles.muted}>observations on this phone</Text>
          </View>
          <View style={styles.summaryBadges}>
            <StatusBadge tone="success" icon="checkmark-circle">{totals.synced} synced</StatusBadge>
            <StatusBadge tone="warning" icon="cloud-offline">{totals.notSynced} not synced</StatusBadge>
          </View>
        </View>
      ) : null}

      <View style={styles.search}>
        <Ionicons name="search" size={20} color={colors.textMuted} />
        <TextInput style={styles.searchInput} value={query} onChangeText={setQuery} placeholder="Search disease, block, ID or notes" placeholderTextColor={colors.textMuted}
          accessibilityLabel="Search observations" returnKeyType="search" autoCorrect={false} />
        {query ? (
          <Pressable onPress={() => setQuery('')} accessibilityRole="button" accessibilityLabel="Clear search" hitSlop={10}><Ionicons name="close-circle" size={20} color={colors.textMuted} /></Pressable>
        ) : null}
      </View>

      <View style={styles.filters} accessibilityRole="radiogroup">
        {FILTERS.map((item) => {
          const selected = item.value === filter;
          return (
            <Pressable key={item.value} onPress={() => setFilter(item.value)} accessibilityRole="radio" accessibilityState={{ selected }} style={[styles.chip, selected && styles.chipSelected]}>
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{selected ? '✓ ' : ''}{item.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Notice tone="info" title="Status guide">
        Draft: not submitted. Waiting to sync: saved on this phone only. Sync failed: an upload attempt failed. Synced: confirmed by a server (sample records only, until a backend exists).
      </Notice>

      {failed ? <Notice tone="danger" title="Could not load history">Please try again.</Notice> : null}
      {!items && !failed ? <ActivityIndicator color={colors.primary} style={styles.loader} /> : null}
      {items && items.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="time-outline" size={32} color={colors.primary} />
          <Text style={styles.emptyTitle}>No matching records</Text>
          <Text style={styles.muted}>{query ? 'Nothing matches your search.' : 'Nothing here yet.'}</Text>
        </View>
      ) : null}
      {groups.map((group) => (
        <View key={group.title} style={styles.group}>
          <View style={styles.groupHead}>
            <Text style={styles.groupTitle} accessibilityRole="header">{group.title}</Text>
            <Text style={styles.muted}>{group.items.length} {group.items.length === 1 ? 'record' : 'records'}</Text>
          </View>
          {group.items.map((o) => (
            <ObservationCard variant="detailed" key={o.uuid} observation={o} onViewDetails={(x) => router.push(`/observation/${x.uuid}`)}
              onContinueDraft={(x) => router.push({ pathname: '/observation/resume', params: { uuid: x.uuid } })} />
          ))}
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: spacing.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card },
  big: { fontFamily: fonts.heading, fontSize: 30, fontWeight: '800', color: colors.text },
  summaryBadges: { gap: 6, alignItems: 'flex-end' },
  muted: { fontSize: 13, color: colors.textMuted },
  search: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12, borderWidth: 1.5, borderColor: colors.borderStrong, borderRadius: radius.control, backgroundColor: colors.surface },
  searchInput: { flex: 1, fontSize: 16, color: colors.text, paddingVertical: 8 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { minHeight: 40, paddingHorizontal: 14, borderRadius: 999, borderWidth: 1.5, borderColor: colors.borderStrong, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  chipSelected: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  chipText: { fontSize: 14, fontWeight: '600', color: colors.text },
  chipTextSelected: { fontWeight: '800', color: colors.primaryDark },
  loader: { marginTop: 24 },
  group: { gap: 12 },
  groupHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  groupTitle: { fontFamily: fonts.heading, fontSize: 17, fontWeight: '800', color: colors.text },
  empty: { alignItems: 'center', gap: 6, padding: 28, backgroundColor: colors.surface, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.borderStrong, borderRadius: radius.card },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: colors.text },
});
