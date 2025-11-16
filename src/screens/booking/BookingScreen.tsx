import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { bookingApi } from '../../services/api/bookingApi';
import { propertyApi } from '../../services/api/propertyApi';
import { Property } from '../../types/property';
import { BookingPriceBreakdown } from '../../types/booking';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Header } from '../../components/layout/Header';
import { colors, spacing } from '../../config/theme';
import { formatCurrency, formatDate, calculateNights } from '../../utils/formatting';

export const BookingScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  const { propertyId } = route.params;
  const [property, setProperty] = useState<Property | null>(null);
  const [priceBreakdown, setPriceBreakdown] = useState<BookingPriceBreakdown | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    loadProperty();
  }, [propertyId]);

  useEffect(() => {
    if (checkIn && checkOut && property) {
      loadPriceBreakdown();
    }
  }, [checkIn, checkOut, guests, property]);

  const loadProperty = async () => {
    try {
      const data = await propertyApi.getProperty(propertyId);
      setProperty(data);
      setGuests(data.maxGuests > 0 ? Math.min(guests, data.maxGuests) : guests);
    } catch (error) {
      console.error('Error loading property:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPriceBreakdown = async () => {
    try {
      const breakdown = await bookingApi.getPriceBreakdown(propertyId, checkIn, checkOut, guests);
      setPriceBreakdown(breakdown);
    } catch (error) {
      console.error('Error loading price breakdown:', error);
    }
  };

  const handleBook = async () => {
    if (!checkIn || !checkOut) {
      return;
    }

    setSubmitting(true);
    try {
      const booking = await bookingApi.createBooking({
        propertyId,
        checkIn,
        checkOut,
        guests,
      });
      // @ts-ignore
      navigation.navigate('BookingConfirmation', { bookingId: booking.id });
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !property) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={styles.container}>
      <Header title="Book Property" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.propertyInfo}>
          <Text style={styles.propertyTitle}>{property.title}</Text>
          <Text style={styles.propertyLocation}>
            {property.city}, {property.country}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dates</Text>
          <Input
            label="Check-in"
            placeholder="YYYY-MM-DD"
            value={checkIn}
            onChangeText={setCheckIn}
          />
          <Input
            label="Check-out"
            placeholder="YYYY-MM-DD"
            value={checkOut}
            onChangeText={setCheckOut}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guests</Text>
          <Input
            label="Number of guests"
            placeholder="1"
            value={guests.toString()}
            onChangeText={(text) => setGuests(parseInt(text) || 1)}
            keyboardType="numeric"
          />
        </View>

        {priceBreakdown && (
          <View style={styles.priceBreakdown}>
            <Text style={styles.priceTitle}>Price Breakdown</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>
                {formatCurrency(priceBreakdown.pricePerNight)} × {priceBreakdown.nights} nights
              </Text>
              <Text style={styles.priceValue}>{formatCurrency(priceBreakdown.subtotal)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Cleaning fee</Text>
              <Text style={styles.priceValue}>{formatCurrency(priceBreakdown.cleaningFee)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Service fee</Text>
              <Text style={styles.priceValue}>{formatCurrency(priceBreakdown.serviceFee)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Taxes</Text>
              <Text style={styles.priceValue}>{formatCurrency(priceBreakdown.taxes)}</Text>
            </View>
            <View style={[styles.priceRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatCurrency(priceBreakdown.total)}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Confirm Booking"
          onPress={handleBook}
          loading={submitting}
          disabled={!checkIn || !checkOut || !priceBreakdown}
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
  scrollView: {
    flex: 1,
  },
  propertyInfo: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
  section: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  priceBreakdown: {
    margin: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 8,
  },
  priceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  priceValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  totalRow: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
});


