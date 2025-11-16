import { apiClient } from './client';
import { Review, CreateReviewData, PropertyRating } from '../../types/review';

export const reviewApi = {
  createReview: async (data: CreateReviewData): Promise<Review> => {
    return apiClient.post<Review>('/reviews', data);
  },

  getPropertyReviews: async (propertyId: string): Promise<Review[]> => {
    return apiClient.get<Review[]>(`/reviews/property/${propertyId}`);
  },

  getPropertyRating: async (propertyId: string): Promise<PropertyRating> => {
    return apiClient.get<PropertyRating>(`/reviews/rating/${propertyId}`);
  },

  updateReview: async (id: string, data: Partial<CreateReviewData>): Promise<Review> => {
    return apiClient.put<Review>(`/reviews/${id}`, data);
  },

  deleteReview: async (id: string): Promise<void> => {
    await apiClient.delete(`/reviews/${id}`);
  },
};

