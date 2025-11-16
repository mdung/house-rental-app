import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { RatingStars } from './RatingStars';
import { Button } from '../common/Button';
import { colors, spacing, borderRadius } from '../../config/theme';
import { CreateReviewData } from '../../types/review';

interface ReviewFormProps {
  onSubmit: (data: CreateReviewData) => void;
  loading?: boolean;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, loading = false }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [categories, setCategories] = useState({
    cleanliness: 5,
    accuracy: 5,
    location: 5,
    value: 5,
    checkIn: 5,
    communication: 5,
  });

  const handleCategoryChange = (category: keyof typeof categories, value: number) => {
    setCategories((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = () => {
    if (!comment.trim()) {
      return;
    }

    onSubmit({
      propertyId: '', // Will be set by parent
      bookingId: '', // Will be set by parent
      rating,
      comment,
      categories,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Overall Rating</Text>
        <RatingStars rating={rating} editable onRatingChange={setRating} showValue />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Your Review</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Share your experience..."
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={6}
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Detailed Ratings</Text>
        {Object.entries(categories).map(([key, value]) => (
          <View key={key} style={styles.categoryRow}>
            <Text style={styles.categoryLabel}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <RatingStars
              rating={value}
              editable
              onRatingChange={(newValue) =>
                handleCategoryChange(key as keyof typeof categories, newValue)
              }
            />
          </View>
        ))}
      </View>

      <Button
        title="Submit Review"
        onPress={handleSubmit}
        loading={loading}
        disabled={!comment.trim()}
        style={styles.submitButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 14,
    color: colors.text,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  categoryLabel: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  submitButton: {
    margin: spacing.lg,
  },
});

