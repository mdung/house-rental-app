import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useProperties } from '../../hooks/useProperties';
import { PropertyCard } from '../../components/property/PropertyCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { colors, spacing } from '../../config/theme';
import { Property } from '../../types/property';
import { useNavigation } from '@react-navigation/native';

export const PropertyListScreen: React.FC = () => {
  const navigation = useNavigation();
  const { properties, loading, error } = useProperties();

  const handlePropertyPress = (property: Property) => {
    // @ts-ignore
    navigation.navigate('PropertyDetail', { propertyId: property.id });
  };

  if (loading && properties.length === 0) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PropertyCard property={item} onPress={() => handlePropertyPress(item)} />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No properties found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

