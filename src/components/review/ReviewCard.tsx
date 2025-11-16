import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Review } from '../../types/review';
import { RatingStars } from './RatingStars';
import { colors, spacing, borderRadius } from '../../config/theme';
import { formatRelativeTime } from '../../utils/formatting';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const averageCategoryRating =
    Object.values(review.categories).reduce((sum, rating) => sum + rating, 0) /
    Object.keys(review.categories).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          {review.reviewer?.avatar ? (
            <Image source={{ uri: review.reviewer.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {review.reviewer?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
          )}
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{review.reviewer?.name || 'Anonymous'}</Text>
            <Text style={styles.date}>{formatRelativeTime(review.createdAt)}</Text>
          </View>
        </View>
        <RatingStars rating={review.rating} size={16} />
      </View>

      <Text style={styles.comment}>{review.comment}</Text>

      <View style={styles.categories}>
        {Object.entries(review.categories).map(([key, value]) => (
          <View key={key} style={styles.categoryItem}>
            <Text style={styles.categoryLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
            <RatingStars rating={value} maxRating={5} size={12} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  comment: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  categories: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  categoryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginRight: spacing.xs,
    minWidth: 80,
  },
});

