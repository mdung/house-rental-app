import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { propertyApi } from '../../services/api/propertyApi';
import { Property } from '../../types/property';
import { PropertyCard } from '../../components/property/PropertyCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { colors, spacing } from '../../config/theme';

export const WishlistScreen: React.FC = () => {
  const navigation = useNavigation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const data = await propertyApi.getWishlist();
      setProperties(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyPress = (property: Property) => {
    // @ts-ignore
    navigation.navigate('PropertyDetail', { propertyId: property.id });
  };

  const handleRemove = async (propertyId: string) => {
    try {
      await propertyApi.removeFromWishlist(propertyId);
      setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wishlist</Text>
        <Text style={styles.subtitle}>
          {properties.length} {properties.length === 1 ? 'property' : 'properties'} saved
        </Text>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={properties}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <PropertyCard property={item} onPress={() => handlePropertyPress(item)} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemove(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No properties in wishlist</Text>
              <Text style={styles.emptySubtext}>Save properties you like to view them later</Text>
            </View>
          }
          refreshing={loading}
          onRefresh={loadWishlist}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  list: {
    padding: spacing.md,
  },
  cardWrapper: {
    marginBottom: spacing.md,
  },
  removeButton: {
    marginTop: spacing.xs,
    padding: spacing.sm,
    alignItems: 'center',
  },
  removeButtonText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});


