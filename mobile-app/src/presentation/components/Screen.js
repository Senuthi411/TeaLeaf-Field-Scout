import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/theme.js';
import { spacing } from '../../constants/spacing.js';

/** Page frame: safe-area top inset behind the header, scrollable body, optional pinned footer. */
export default function Screen({ header, footer, children, scroll = true, avoidKeyboard = false, contentStyle, scrollRef }) {
  const insets = useSafeAreaInsets();
  const body = scroll ? (
    <ScrollView
      ref={scrollRef}
      style={styles.flex}
      contentContainerStyle={[styles.content, contentStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, styles.content, contentStyle]}>{children}</View>
  );

  const inner = (
    <>
      {body}
      {footer}
    </>
  );

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.background }}>{header}</View>
      {avoidKeyboard ? (
        <KeyboardAvoidingView style={styles.flex} behavior="padding">
          {inner}
        </KeyboardAvoidingView>
      ) : (
        inner
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
});
