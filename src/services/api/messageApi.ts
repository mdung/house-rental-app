import { apiClient } from './client';
import { Message, CreateMessageData, MessageThread } from '../../types/message';

export const messageApi = {
  getThreads: async (): Promise<MessageThread[]> => {
    return apiClient.get<MessageThread[]>('/messages/threads');
  },

  getMessages: async (bookingId: string): Promise<Message[]> => {
    return apiClient.get<Message[]>(`/messages/${bookingId}`);
  },

  sendMessage: async (data: CreateMessageData): Promise<Message> => {
    return apiClient.post<Message>('/messages', data);
  },

  markAsRead: async (messageId: string): Promise<void> => {
    await apiClient.put(`/messages/${messageId}/read`);
  },

  markThreadAsRead: async (bookingId: string): Promise<void> => {
    await apiClient.put(`/messages/thread/${bookingId}/read`);
  },
};


