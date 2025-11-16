import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../config/theme';

export const WishlistScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      <Text style={styles.subtitle}>Your saved properties will appear here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

