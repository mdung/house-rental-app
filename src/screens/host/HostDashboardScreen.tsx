import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { propertyApi } from '../../services/api/propertyApi';
import { bookingApi } from '../../services/api/bookingApi';
import { Property } from '../../types/property';
import { Booking } from '../../types/booking';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Button } from '../../components/common/Button';
import { colors, spacing, borderRadius } from '../../config/theme';
import { formatCurrency } from '../../utils/formatting';

export const HostDashboardScreen: React.FC = () => {
  const navigation = useNavigation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [propertiesData, bookingsData] = await Promise.all([
        propertyApi.getMyProperties(),
        bookingApi.getHostBookings(),
      ]);

      setProperties(propertiesData);
      setBookings(bookingsData);

      const revenue = bookingsData
        .filter((b) => b.status === 'confirmed' || b.status === 'completed')
        .reduce((sum, b) => sum + b.totalPrice, 0);

      setStats({
        totalProperties: propertiesData.length,
        totalBookings: bookingsData.length,
        totalRevenue: revenue,
        pendingBookings: bookingsData.filter((b) => b.status === 'pending').length,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Host Dashboard</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.totalProperties}</Text>
          <Text style={styles.statLabel}>Properties</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.totalBookings}</Text>
          <Text style={styles.statLabel}>Bookings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.pendingBookings}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{formatCurrency(stats.totalRevenue)}</Text>
          <Text style={styles.statLabel}>Revenue</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Properties</Text>
          <Button
            title="+ Add"
            onPress={() => {
              // @ts-ignore
              navigation.navigate('CreateProperty');
            }}
            variant="outline"
            size="small"
          />
        </View>
        {properties.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No properties yet</Text>
            <Button
              title="Create Your First Property"
              onPress={() => {
                // @ts-ignore
                navigation.navigate('CreateProperty');
              }}
              style={styles.emptyButton}
            />
          </View>
        ) : (
          properties.slice(0, 3).map((property) => (
            <TouchableOpacity
              key={property.id}
              style={styles.propertyItem}
              onPress={() => {
                // @ts-ignore
                navigation.navigate('PropertyDetail', { propertyId: property.id });
              }}
            >
              <Text style={styles.propertyTitle}>{property.title}</Text>
              <Text style={styles.propertyLocation}>
                {property.city}, {property.country}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Bookings</Text>
        {bookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No bookings yet</Text>
          </View>
        ) : (
          bookings.slice(0, 5).map((booking) => (
            <View key={booking.id} style={styles.bookingItem}>
              <Text style={styles.bookingProperty}>
                {booking.property?.title || 'Property'}
              </Text>
              <Text style={styles.bookingDate}>
                {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                {new Date(booking.checkOut).toLocaleDateString()}
              </Text>
              <Text style={styles.bookingStatus}>{booking.status}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
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
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    backgroundColor: colors.white,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  propertyItem: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.xs,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  propertyLocation: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  bookingItem: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.xs,
  },
  bookingProperty: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  bookingDate: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  bookingStatus: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  emptyButton: {
    marginTop: spacing.md,
  },
});

