import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { bookingApi } from '../../services/api/bookingApi';
import { Booking } from '../../types/booking';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Button } from '../../components/common/Button';
import { Header } from '../../components/layout/Header';
import { colors, spacing } from '../../config/theme';
import { formatDate, formatCurrency } from '../../utils/formatting';
import { BOOKING_STATUS_COLORS } from '../../utils/constants';

export const BookingDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  const { bookingId } = route.params;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

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

  const handleCancel = async () => {
    if (!booking) return;
    setCancelling(true);
    try {
      await bookingApi.cancelBooking(booking.id);
      await loadBooking();
    } catch (error) {
      console.error('Error cancelling booking:', error);
    } finally {
      setCancelling(false);
    }
  };

  if (loading || !booking) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={styles.container}>
      <Header title="Booking Details" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: BOOKING_STATUS_COLORS[booking.status] || colors.textSecondary },
            ]}
          >
            <Text style={styles.statusText}>{booking.status.toUpperCase()}</Text>
          </View>
        </View>

        {booking.property && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Property</Text>
            <Text style={styles.propertyTitle}>{booking.property.title}</Text>
            <Text style={styles.propertyLocation}>{booking.property.address}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Information</Text>
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
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Status</Text>
            <Text style={styles.detailValue}>{booking.paymentStatus}</Text>
          </View>
        </View>

        {booking.status === 'confirmed' && (
          <View style={styles.cancelSection}>
            <Button
              title="Cancel Booking"
              onPress={handleCancel}
              loading={cancelling}
              variant="outline"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  statusContainer: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  statusText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  section: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  propertyLocation: {
    fontSize: 14,
    color: colors.textSecondary,
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
  cancelSection: {
    padding: spacing.lg,
  },
});

