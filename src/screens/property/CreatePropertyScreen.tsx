import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { propertyApi } from '../../services/api/propertyApi';
import { CreatePropertyData } from '../../types/property';
import { propertySchema } from '../../utils/validation';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Header } from '../../components/layout/Header';
import { colors, spacing } from '../../config/theme';
import { PROPERTY_TYPES, CANCELLATION_POLICIES, AMENITIES } from '../../utils/constants';
import { handleApiError } from '../../utils/errorHandler';

export const CreatePropertyScreen: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePropertyData>({
    resolver: yupResolver(propertySchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'entire_place',
      address: '',
      city: '',
      country: '',
      latitude: 0,
      longitude: 0,
      pricePerNight: 0,
      cleaningFee: 0,
      securityDeposit: 0,
      maxGuests: 1,
      bedrooms: 0,
      beds: 1,
      bathrooms: 1,
      amenities: [],
      images: [],
      houseRules: [],
      cancellationPolicy: 'moderate',
      instantBook: false,
    },
  });

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const onSubmit = async (data: CreatePropertyData) => {
    setLoading(true);
    setError(null);
    try {
      const propertyData = {
        ...data,
        amenities: selectedAmenities,
        images: ['https://via.placeholder.com/800x600'], // Placeholder - should be actual uploaded images
      };
      await propertyApi.createProperty(propertyData);
      navigation.goBack();
    } catch (err: any) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Create Property" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scrollView}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Title"
                placeholder="Enter property title"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.title?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Description"
                placeholder="Describe your property"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.description?.message}
                multiline
                numberOfLines={4}
              />
            )}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Address"
                placeholder="Street address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.address?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="City"
                placeholder="City"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.city?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="country"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Country"
                placeholder="Country"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.country?.message}
              />
            )}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Details</Text>
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <View>
                <Text style={styles.label}>Property Type</Text>
                <View style={styles.optionsRow}>
                  {PROPERTY_TYPES.map((type) => (
                    <TouchableOpacity
                      key={type.value}
                      style={[styles.optionChip, value === type.value && styles.optionChipActive]}
                      onPress={() => onChange(type.value)}
                    >
                      <Text
                        style={[
                          styles.optionChipText,
                          value === type.value && styles.optionChipTextActive,
                        ]}
                      >
                        {type.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          />

          <Controller
            control={control}
            name="maxGuests"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Max Guests"
                placeholder="1"
                value={value.toString()}
                onChangeText={(text) => onChange(parseInt(text) || 0)}
                onBlur={onBlur}
                error={errors.maxGuests?.message}
                keyboardType="numeric"
              />
            )}
          />

          <Controller
            control={control}
            name="bedrooms"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Bedrooms"
                placeholder="0"
                value={value.toString()}
                onChangeText={(text) => onChange(parseInt(text) || 0)}
                onBlur={onBlur}
                error={errors.bedrooms?.message}
                keyboardType="numeric"
              />
            )}
          />

          <Controller
            control={control}
            name="beds"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Beds"
                placeholder="1"
                value={value.toString()}
                onChangeText={(text) => onChange(parseInt(text) || 0)}
                onBlur={onBlur}
                error={errors.beds?.message}
                keyboardType="numeric"
              />
            )}
          />

          <Controller
            control={control}
            name="bathrooms"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Bathrooms"
                placeholder="1"
                value={value.toString()}
                onChangeText={(text) => onChange(parseFloat(text) || 0)}
                onBlur={onBlur}
                error={errors.bathrooms?.message}
                keyboardType="numeric"
              />
            )}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <Controller
            control={control}
            name="pricePerNight"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Price per Night"
                placeholder="0"
                value={value.toString()}
                onChangeText={(text) => onChange(parseFloat(text) || 0)}
                onBlur={onBlur}
                error={errors.pricePerNight?.message}
                keyboardType="numeric"
              />
            )}
          />
          <Controller
            control={control}
            name="cleaningFee"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Cleaning Fee"
                placeholder="0"
                value={value.toString()}
                onChangeText={(text) => onChange(parseFloat(text) || 0)}
                onBlur={onBlur}
                error={errors.cleaningFee?.message}
                keyboardType="numeric"
              />
            )}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {AMENITIES.map((amenity) => (
              <TouchableOpacity
                key={amenity}
                style={[
                  styles.amenityChip,
                  selectedAmenities.includes(amenity) && styles.amenityChipActive,
                ]}
                onPress={() => toggleAmenity(amenity)}
              >
                <Text
                  style={[
                    styles.amenityText,
                    selectedAmenities.includes(amenity) && styles.amenityTextActive,
                  ]}
                >
                  {amenity}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button
          title="Create Property"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          style={styles.submitButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  optionChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  optionChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionChipText: {
    fontSize: 14,
    color: colors.text,
  },
  optionChipTextActive: {
    color: colors.white,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  amenityChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  amenityText: {
    fontSize: 14,
    color: colors.text,
  },
  amenityTextActive: {
    color: colors.white,
  },
  submitButton: {
    margin: spacing.lg,
  },
  errorContainer: {
    backgroundColor: '#FFE5E5',
    padding: spacing.md,
    margin: spacing.lg,
    borderRadius: 8,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
  },
});

