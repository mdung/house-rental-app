import { apiClient } from './client';
import { Booking, CreateBookingData, BookingPriceBreakdown } from '../../types/booking';

export const bookingApi = {
  createBooking: async (data: CreateBookingData): Promise<Booking> => {
    return apiClient.post<Booking>('/bookings', data);
  },

  getBookings: async (): Promise<Booking[]> => {
    return apiClient.get<Booking[]>('/bookings');
  },

  getBooking: async (id: string): Promise<Booking> => {
    return apiClient.get<Booking>(`/bookings/${id}`);
  },

  cancelBooking: async (id: string): Promise<Booking> => {
    return apiClient.put<Booking>(`/bookings/${id}/cancel`);
  },

  getPriceBreakdown: async (propertyId: string, checkIn: string, checkOut: string, guests: number): Promise<BookingPriceBreakdown> => {
    return apiClient.get<BookingPriceBreakdown>('/bookings/price', {
      propertyId,
      checkIn,
      checkOut,
      guests,
    });
  },

  getMyBookings: async (): Promise<Booking[]> => {
    return apiClient.get<Booking[]>('/bookings/my');
  },

  getHostBookings: async (): Promise<Booking[]> => {
    return apiClient.get<Booking[]>('/bookings/host');
  },
};


