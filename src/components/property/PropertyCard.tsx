import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Property } from '../../types/property';
import { colors, spacing, borderRadius, shadows } from '../../config/theme';
import { formatCurrency, formatRating } from '../../utils/formatting';

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: property.images[0] }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.location} numberOfLines={1}>
            {property.city}, {property.country}
          </Text>
          {property.rating && (
            <View style={styles.rating}>
              <Text style={styles.ratingText}>★ {formatRating(property.rating)}</Text>
            </View>
          )}
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {property.title}
        </Text>
        <Text style={styles.type}>{property.type.replace('_', ' ')}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>
            {formatCurrency(property.pricePerNight)}
            <Text style={styles.priceUnit}> / night</Text>
          </Text>
          {property.reviewCount && (
            <Text style={styles.reviews}>({property.reviewCount} reviews)</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    resizeMode: 'cover',
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  location: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  type: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'capitalize',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  priceUnit: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  reviews: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});


