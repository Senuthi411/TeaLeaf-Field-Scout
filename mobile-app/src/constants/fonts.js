// Maps a style's fontWeight to a loaded font family. Custom fonts on Android need one family per weight.
export const INTER = { 400: 'Inter_400Regular', 500: 'Inter_500Medium', 600: 'Inter_600SemiBold', 700: 'Inter_700Bold' };
export const POPPINS = { 600: 'Poppins_600SemiBold', 700: 'Poppins_700Bold' };

const toNumber = (weight) => (weight === 'bold' ? 700 : weight === 'normal' || weight == null ? 400 : Number(weight) || 400);

export function resolveFontFamily(fontFamily, fontWeight) {
  const weight = toNumber(fontWeight);
  if (fontFamily === 'heading') return weight >= 700 ? POPPINS[700] : POPPINS[600];
  if (fontFamily) return fontFamily;
  if (weight >= 700) return INTER[700];
  if (weight >= 600) return INTER[600];
  if (weight >= 500) return INTER[500];
  return INTER[400];
}
