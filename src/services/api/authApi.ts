import { apiClient } from './client';
import { AuthResponse, LoginCredentials, RegisterData, User } from '../../types/user';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    await apiClient.setToken(response.token);
    return response;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    await apiClient.setToken(response.token);
    return response;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
    await apiClient.removeToken();
  },

  getCurrentUser: async (): Promise<User> => {
    return apiClient.get<User>('/auth/me');
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    return apiClient.put<User>('/auth/profile', data);
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await apiClient.post('/auth/reset-password', { token, password });
  },
};


