import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBookings } from '../../hooks/useBookings';
import { Booking } from '../../types/booking';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { colors, spacing, borderRadius } from '../../config/theme';
import { formatDate, formatDateRange, formatCurrency } from '../../utils/formatting';
import { BOOKING_STATUS_COLORS } from '../../utils/constants';

export const MyBookingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { bookings, loading, refresh } = useBookings();

  const handleBookingPress = (booking: Booking) => {
    // @ts-ignore
    navigation.navigate('BookingDetail', { bookingId: booking.id });
  };

  if (loading && bookings.length === 0) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
        <Text style={styles.subtitle}>{bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}</Text>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookingCard}
            onPress={() => handleBookingPress(item)}
          >
            {item.property?.images && item.property.images.length > 0 && (
              <Image
                source={{ uri: item.property.images[0] }}
                style={styles.image}
              />
            )}
            <View style={styles.content}>
              <Text style={styles.propertyTitle}>
                {item.property?.title || 'Property'}
              </Text>
              <Text style={styles.location}>
                {item.property?.address || 'Location'}
              </Text>
              <View style={styles.dates}>
                <Text style={styles.dateText}>
                  {formatDateRange(item.checkIn, item.checkOut)}
                </Text>
              </View>
              <View style={styles.footer}>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: BOOKING_STATUS_COLORS[item.status] || colors.textSecondary },
                  ]}
                >
                  <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
                </View>
                <Text style={styles.price}>{formatCurrency(item.totalPrice)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No bookings yet</Text>
            <Text style={styles.emptySubtext}>Start exploring and book your first stay!</Text>
          </View>
        }
        refreshing={loading}
        onRefresh={refresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  list: {
    padding: spacing.md,
  },
  bookingCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: spacing.md,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  location: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  dates: {
    marginBottom: spacing.sm,
  },
  dateText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});


