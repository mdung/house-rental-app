import { apiClient } from './client';
import { Property, CreatePropertyData, PropertyFilters } from '../../types/property';
import { PaginatedResponse } from '../../types/api';

export const propertyApi = {
  getProperties: async (filters?: PropertyFilters, page: number = 1, limit: number = 20): Promise<PaginatedResponse<Property>> => {
    return apiClient.get<PaginatedResponse<Property>>('/properties', { ...filters, page, limit });
  },

  getProperty: async (id: string): Promise<Property> => {
    return apiClient.get<Property>(`/properties/${id}`);
  },

  createProperty: async (data: CreatePropertyData): Promise<Property> => {
    return apiClient.post<Property>('/properties', data);
  },

  updateProperty: async (id: string, data: Partial<CreatePropertyData>): Promise<Property> => {
    return apiClient.put<Property>(`/properties/${id}`, data);
  },

  deleteProperty: async (id: string): Promise<void> => {
    await apiClient.delete(`/properties/${id}`);
  },

  getMyProperties: async (): Promise<Property[]> => {
    return apiClient.get<Property[]>('/properties/my');
  },

  getWishlist: async (): Promise<Property[]> => {
    return apiClient.get<Property[]>('/wishlist');
  },

  addToWishlist: async (propertyId: string): Promise<void> => {
    await apiClient.post(`/wishlist/${propertyId}`);
  },

  removeFromWishlist: async (propertyId: string): Promise<void> => {
    await apiClient.delete(`/wishlist/${propertyId}`);
  },
};

