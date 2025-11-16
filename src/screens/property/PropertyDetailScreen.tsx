import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { propertyApi } from '../../services/api/propertyApi';
import { Property } from '../../types/property';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Button } from '../../components/common/Button';
import { colors, spacing } from '../../config/theme';
import { formatCurrency, formatRating } from '../../utils/formatting';
import { Header } from '../../components/layout/Header';

const { width } = Dimensions.get('window');

export const PropertyDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  const { propertyId } = route.params;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    loadProperty();
  }, [propertyId]);

  const loadProperty = async () => {
    try {
      setLoading(true);
      const data = await propertyApi.getProperty(propertyId);
      setProperty(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load property');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = () => {
    // @ts-ignore
    navigation.navigate('Booking', { propertyId: property?.id });
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error || !property) {
    return (
      <View style={styles.container}>
        <Header title="Property Details" onBack={() => navigation.goBack()} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || 'Property not found'}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Property Details" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setImageIndex(index);
            }}
          >
            {property.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.image} />
            ))}
          </ScrollView>
          <View style={styles.imageIndicator}>
            <Text style={styles.imageIndicatorText}>
              {imageIndex + 1} / {property.images.length}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{property.title}</Text>
              <Text style={styles.location}>
                {property.city}, {property.country}
              </Text>
            </View>
            {property.rating && (
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>★ {formatRating(property.rating)}</Text>
                {property.reviewCount && (
                  <Text style={styles.reviewCount}>({property.reviewCount})</Text>
                )}
              </View>
            )}
          </View>

          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Type:</Text>
              <Text style={styles.detailValue}>{property.type.replace('_', ' ')}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Guests:</Text>
              <Text style={styles.detailValue}>{property.maxGuests}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Bedrooms:</Text>
              <Text style={styles.detailValue}>{property.bedrooms}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Beds:</Text>
              <Text style={styles.detailValue}>{property.beds}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Bathrooms:</Text>
              <Text style={styles.detailValue}>{property.bathrooms}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{property.description}</Text>
          </View>

          {property.amenities.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Amenities</Text>
              {property.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Text style={styles.amenityText}>• {amenity}</Text>
                </View>
              ))}
            </View>
          )}

          {property.host && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Host</Text>
              <Text style={styles.hostName}>{property.host.name}</Text>
              {property.host.verified && (
                <Text style={styles.verified}>✓ Verified Host</Text>
              )}
            </View>
          )}

          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>Price per night</Text>
            <Text style={styles.price}>{formatCurrency(property.pricePerNight)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceFooter}>
          <Text style={styles.priceFooterText}>
            {formatCurrency(property.pricePerNight)}
            <Text style={styles.priceUnit}> / night</Text>
          </Text>
        </View>
        <Button title="Reserve" onPress={handleBook} style={styles.bookButton} />
      </View>
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
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width,
    height: 300,
    resizeMode: 'cover',
  },
  imageIndicator: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  imageIndicatorText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  location: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  rating: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  reviewCount: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailRow: {
    width: '50%',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  amenityItem: {
    marginBottom: spacing.xs,
  },
  amenityText: {
    fontSize: 16,
    color: colors.text,
  },
  hostName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  verified: {
    fontSize: 14,
    color: colors.success,
  },
  priceSection: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  priceFooter: {
    flex: 1,
  },
  priceFooterText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  priceUnit: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  bookButton: {
    flex: 1,
    marginLeft: spacing.md,
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
});

