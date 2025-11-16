import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Message } from '../../types/message';
import { colors, spacing, borderRadius } from '../../config/theme';
import { formatDate } from '../../utils/formatting';
import { useAuth } from '../../context/AuthContext';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { user } = useAuth();
  const isOwnMessage = message.senderId === user?.id;

  return (
    <View
      style={[
        styles.container,
        isOwnMessage ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      {!isOwnMessage && message.sender?.avatar && (
        <Image source={{ uri: message.sender.avatar }} style={styles.avatar} />
      )}
      <View
        style={[
          styles.bubble,
          isOwnMessage ? styles.ownBubble : styles.otherBubble,
        ]}
      >
        {!isOwnMessage && (
          <Text style={styles.senderName}>{message.sender?.name || 'User'}</Text>
        )}
        <Text style={[styles.messageText, isOwnMessage && styles.ownMessageText]}>
          {message.message}
        </Text>
        {message.images && message.images.length > 0 && (
          <View style={styles.imagesContainer}>
            {message.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.messageImage} />
            ))}
          </View>
        )}
        <Text style={[styles.time, isOwnMessage && styles.ownTime]}>
          {formatDate(message.createdAt, 'HH:mm')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  ownMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: spacing.xs,
    alignSelf: 'flex-end',
  },
  bubble: {
    maxWidth: '75%',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  ownBubble: {
    backgroundColor: colors.primary,
  },
  otherBubble: {
    backgroundColor: colors.surface,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  messageText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  ownMessageText: {
    color: colors.white,
  },
  imagesContainer: {
    marginTop: spacing.xs,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  messageImage: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.md,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  time: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    alignSelf: 'flex-end',
  },
  ownTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

