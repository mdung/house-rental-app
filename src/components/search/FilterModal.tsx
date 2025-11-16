import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from '../common/Button';
import { colors, spacing, borderRadius } from '../../config/theme';
import { PropertyFilters } from '../../types/property';
import { PROPERTY_TYPES, AMENITIES } from '../../utils/constants';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: PropertyFilters;
  onApply: (filters: PropertyFilters) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, filters, onApply }) => {
  const [localFilters, setLocalFilters] = useState<PropertyFilters>(filters);

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const togglePropertyType = (type: string) => {
    const currentTypes = localFilters.propertyType || [];
    const newTypes = currentTypes.includes(type as any)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type as any];
    setLocalFilters({ ...localFilters, propertyType: newTypes });
  };

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = localFilters.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity];
    setLocalFilters({ ...localFilters, amenities: newAmenities });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Property Type</Text>
              {PROPERTY_TYPES.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={[
                    styles.filterChip,
                    localFilters.propertyType?.includes(type.value as any) && styles.filterChipActive,
                  ]}
                  onPress={() => togglePropertyType(type.value)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      localFilters.propertyType?.includes(type.value as any) && styles.filterChipTextActive,
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Amenities</Text>
              {AMENITIES.map((amenity) => (
                <TouchableOpacity
                  key={amenity}
                  style={[
                    styles.filterChip,
                    localFilters.amenities?.includes(amenity) && styles.filterChipActive,
                  ]}
                  onPress={() => toggleAmenity(amenity)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      localFilters.amenities?.includes(amenity) && styles.filterChipTextActive,
                    ]}
                  >
                    {amenity}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Button title="Reset" onPress={() => setLocalFilters({})} variant="outline" />
            <Button title="Apply Filters" onPress={handleApply} style={styles.applyButton} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  closeButton: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  content: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    alignSelf: 'flex-start',
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    color: colors.text,
  },
  filterChipTextActive: {
    color: colors.white,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.md,
  },
  applyButton: {
    flex: 1,
  },
});

