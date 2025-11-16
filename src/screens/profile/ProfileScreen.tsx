import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { colors, spacing, borderRadius } from '../../config/theme';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.content}>
        {user && (
          <>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
              <Text style={styles.role}>Role: {user.role}</Text>
            </View>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                // @ts-ignore
                navigation.navigate('EditProfile');
              }}
            >
              <Text style={styles.menuItemText}>Edit Profile</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            {user?.role === 'host' || user?.role === 'both' ? (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate('HostDashboard');
                }}
              >
                <Text style={styles.menuItemText}>Host Dashboard</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                // @ts-ignore
                navigation.navigate('MessageList');
              }}
            >
              <Text style={styles.menuItemText}>Messages</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                // @ts-ignore
                navigation.navigate('Settings');
              }}
            >
              <Text style={styles.menuItemText}>Settings</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <Button
              title="Logout"
              onPress={handleLogout}
              variant="outline"
              style={styles.logoutButton}
            />
          </>
        )}
      </View>
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
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  userInfo: {
    marginBottom: spacing.xl,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  role: {
    fontSize: 14,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
  },
  arrow: {
    fontSize: 20,
    color: colors.textSecondary,
  },
  logoutButton: {
    marginTop: spacing.lg,
  },
});


