// Design tokens (shared design system in the interim report): forest green, sage, white, neutrals.
export const colors = {
  primary: '#2E7D32',
  primaryDark: '#1B5E20',
  primarySoft: '#E8F5E9',
  accent: '#66BB6A',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  borderStrong: '#C3CFC2',
  text: '#1F2937',
  textMuted: '#576170',
  disabledBg: '#E5E9E5',
  disabledText: '#6B7280',
  focus: '#1565C0',
  overlay: 'rgba(17, 24, 39, 0.55)',

  successBg: '#E8F5E9',
  successText: '#1B5E20',
  successBorder: '#B5D9B8',
  warningBg: '#FEF3C7',
  warningText: '#92400E',
  warningBorder: '#F2D58A',
  dangerBg: '#FEE2E2',
  dangerText: '#B91C1C',
  dangerBorder: '#F3B4B4',
  infoBg: '#DBEAFE',
  infoText: '#1E40AF',
  infoBorder: '#B4CDF6',
  neutralBg: '#EEF1F4',
  neutralText: '#374151',
};

export const radius = { control: 12, card: 16, pill: 999 };

export const typography = {
  heading: { fontSize: 22, fontWeight: '700', color: colors.text },
  title: { fontSize: 18, fontWeight: '700', color: colors.text },
  body: { fontSize: 16, color: colors.text },
  bodyBold: { fontSize: 16, fontWeight: '600', color: colors.text },
  small: { fontSize: 14, color: colors.textMuted },
  caption: { fontSize: 12, color: colors.textMuted },
  label: { fontSize: 15, fontWeight: '600', color: colors.text },
};

export const shadows = {
  card: { elevation: 1 },
  raised: { elevation: 6, shadowColor: '#1B5E20', shadowOpacity: 0.25, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
};

// Tone -> colours, used by badges and notices.
export const tones = {
  success: { bg: colors.successBg, text: colors.successText, border: colors.successBorder },
  warning: { bg: colors.warningBg, text: colors.warningText, border: colors.warningBorder },
  danger: { bg: colors.dangerBg, text: colors.dangerText, border: colors.dangerBorder },
  info: { bg: colors.infoBg, text: colors.infoText, border: colors.infoBorder },
  neutral: { bg: colors.neutralBg, text: colors.neutralText, border: colors.border },
};

// Font tokens. `heading` is resolved to Poppins by AppText; everything else is Inter (shared design system).
export const fonts = { heading: 'heading' };
