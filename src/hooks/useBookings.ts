import { useState, useEffect } from 'react';
import { Booking } from '../types/booking';
import { bookingApi } from '../services/api/bookingApi';

export const useBookings = (autoFetch: boolean = true) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingApi.getMyBookings();
      setBookings(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchBookings();
    }
  }, []);

  const refresh = () => {
    fetchBookings();
  };

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    refresh,
  };
};

