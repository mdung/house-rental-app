import { ApiError } from '../types/api';

export const handleApiError = (error: any): string => {
  if (error.response) {
    const apiError: ApiError = error.response.data;
    if (apiError.errors) {
      const firstError = Object.values(apiError.errors)[0];
      return Array.isArray(firstError) ? firstError[0] : firstError;
    }
    return apiError.message || 'An error occurred';
  }
  if (error.request) {
    return 'Network error. Please check your connection.';
  }
  return error.message || 'An unexpected error occurred';
};

export const isNetworkError = (error: any): boolean => {
  return !error.response && error.request;
};

