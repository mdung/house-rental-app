import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { messageApi } from '../../services/api/messageApi';
import { MessageThread } from '../../types/message';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { colors, spacing, borderRadius } from '../../config/theme';
import { formatRelativeTime } from '../../utils/formatting';

export const MessageListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadThreads();
  }, []);

  const loadThreads = async () => {
    try {
      setLoading(true);
      const data = await messageApi.getThreads();
      setThreads(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleThreadPress = (thread: MessageThread) => {
    // @ts-ignore
    navigation.navigate('Chat', { bookingId: thread.bookingId });
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={threads}
          keyExtractor={(item) => item.bookingId}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.threadItem}
              onPress={() => handleThreadPress(item)}
            >
              <View style={styles.threadContent}>
                <Text style={styles.propertyTitle}>{item.propertyTitle}</Text>
                <Text style={styles.otherUser}>{item.otherUser.name}</Text>
                {item.lastMessage && (
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {item.lastMessage.message}
                  </Text>
                )}
              </View>
              <View style={styles.threadMeta}>
                {item.lastMessage && (
                  <Text style={styles.time}>
                    {formatRelativeTime(item.lastMessage.createdAt)}
                  </Text>
                )}
                {item.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{item.unreadCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No messages yet</Text>
            </View>
          }
          refreshing={loading}
          onRefresh={loadThreads}
        />
      )}
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
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
  list: {
    padding: spacing.md,
  },
  threadItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  threadContent: {
    flex: 1,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  otherUser: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  lastMessage: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  threadMeta: {
    alignItems: 'flex-end',
    marginLeft: spacing.md,
  },
  time: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  unreadText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

