import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { reviewApi } from '../../services/api/reviewApi';
import { ReviewForm } from '../../components/review/ReviewForm';
import { Header } from '../../components/layout/Header';
import { CreateReviewData } from '../../types/review';
import { colors } from '../../config/theme';
import { handleApiError } from '../../utils/errorHandler';

export const WriteReviewScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  const { propertyId, bookingId } = route.params;
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (data: CreateReviewData) => {
    setLoading(true);
    try {
      await reviewApi.createReview({
        ...data,
        propertyId,
        bookingId,
      });
      navigation.goBack();
    } catch (error: any) {
      const errorMessage = handleApiError(error);
      // Show error to user (could use a toast notification)
      console.error('Error submitting review:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Write a Review" onBack={() => navigation.goBack()} />
      <ReviewForm onSubmit={handleSubmit} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

