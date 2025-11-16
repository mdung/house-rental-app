import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { bookingApi } from '../../services/api/bookingApi';
import { Booking } from '../../types/booking';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Button } from '../../components/common/Button';
import { colors, spacing } from '../../config/theme';
import { formatDate, formatDateRange, formatCurrency } from '../../utils/formatting';

export const BookingConfirmationScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  const { bookingId } = route.params;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooking();
  }, [bookingId]);

  const loadBooking = async () => {
    try {
      const data = await bookingApi.getBooking(bookingId);
      setBooking(data);
    } catch (error) {
      console.error('Error loading booking:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !booking) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>✓</Text>
        </View>
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Your reservation has been confirmed</Text>

        {booking.property && (
          <View style={styles.bookingInfo}>
            <Text style={styles.propertyTitle}>{booking.property.title}</Text>
            <Text style={styles.propertyLocation}>{booking.property.address}</Text>
          </View>
        )}

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Check-in</Text>
            <Text style={styles.detailValue}>{formatDate(booking.checkIn, 'MMM dd, yyyy')}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Check-out</Text>
            <Text style={styles.detailValue}>{formatDate(booking.checkOut, 'MMM dd, yyyy')}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Guests</Text>
            <Text style={styles.detailValue}>{booking.guests}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Price</Text>
            <Text style={styles.detailValue}>{formatCurrency(booking.totalPrice)}</Text>
          </View>
        </View>

        <Button
          title="View Booking Details"
          onPress={() => {
            // @ts-ignore
            navigation.navigate('BookingDetail', { bookingId: booking.id });
          }}
          style={styles.button}
        />
        <Button
          title="Back to Home"
          onPress={() => {
            // @ts-ignore
            navigation.navigate('Main', { screen: 'Home' });
          }}
          variant="outline"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  icon: {
    fontSize: 40,
    color: colors.white,
    fontWeight: '700',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  bookingInfo: {
    width: '100%',
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  propertyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  propertyLocation: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  details: {
    width: '100%',
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  detailLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  button: {
    width: '100%',
    marginBottom: spacing.md,
  },
});


