import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useProperties } from '../../hooks/useProperties';
import { PropertyCard } from '../../components/property/PropertyCard';
import { SearchBar } from '../../components/search/SearchBar';
import { FilterModal } from '../../components/search/FilterModal';
import { PropertyFilters } from '../../types/property';
import { Property } from '../../types/property';
import { colors, spacing } from '../../config/theme';
import { useNavigation } from '@react-navigation/native';

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const { properties, loading, refresh } = useProperties(filters);

  const handleSearch = () => {
    setFilters({ ...filters, location: searchQuery });
  };

  const handlePropertyPress = (property: Property) => {
    // @ts-ignore
    navigation.navigate('PropertyDetail', { propertyId: property.id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSearch={handleSearch}
            placeholder="Search by location..."
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(true)}>
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PropertyCard property={item} onPress={() => handlePropertyPress(item)} />
        )}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={refresh}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No properties found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        }
      />

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onApply={setFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
    paddingTop: spacing.xl,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchContainer: {
    marginBottom: spacing.md,
  },
  filterButton: {
    padding: spacing.sm,
    alignItems: 'center',
  },
  filterButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  list: {
    padding: spacing.md,
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

