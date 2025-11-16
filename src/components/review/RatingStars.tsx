import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing } from '../../config/theme';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  editable?: boolean;
  onRatingChange?: (rating: number) => void;
  showValue?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 20,
  editable = false,
  onRatingChange,
  showValue = false,
}) => {
  const handlePress = (value: number) => {
    if (editable && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => handlePress(value)}
            disabled={!editable}
            activeOpacity={editable ? 0.7 : 1}
          >
            <Text style={[styles.star, { fontSize: size }]}>
              {value <= rating ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {showValue && <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: spacing.xs,
  },
  star: {
    color: '#FFB800',
    marginRight: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});

