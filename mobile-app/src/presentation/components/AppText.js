import { StyleSheet, Text as RNText, TextInput as RNTextInput } from 'react-native';
import { resolveFontFamily } from '../../constants/fonts.js';

// Drop-in replacements for Text / TextInput that apply Inter (and Poppins for `fonts.heading`).
function withFont(style) {
  const { fontWeight, fontFamily, ...rest } = StyleSheet.flatten(style) ?? {};
  return [rest, { fontFamily: resolveFontFamily(fontFamily, fontWeight) }];
}

export function Text({ style, ...props }) {
  return <RNText {...props} style={withFont(style)} />;
}

export function TextInput({ style, ...props }) {
  return <RNTextInput {...props} style={withFont(style)} />;
}
