import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { messageApi } from '../../services/api/messageApi';
import { Message } from '../../types/message';
import { MessageBubble } from '../../components/message/MessageBubble';
import { MessageInput } from '../../components/message/MessageInput';
import { Header } from '../../components/layout/Header';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { colors } from '../../config/theme';

export const ChatScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  const { bookingId } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadMessages();
    // Poll for new messages every 5 seconds
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, [bookingId]);

  const loadMessages = async () => {
    try {
      const data = await messageApi.getMessages(bookingId);
      setMessages(data);
      if (data.length > 0) {
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (messageText: string) => {
    setSending(true);
    try {
      const newMessage = await messageApi.sendMessage({
        bookingId,
        message: messageText,
      });
      setMessages((prev) => [...prev, newMessage]);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  if (loading && messages.length === 0) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <Header title="Chat" onBack={() => navigation.goBack()} />
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={styles.messagesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No messages yet. Start the conversation!</Text>
          </View>
        }
      />
      <MessageInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesList: {
    paddingVertical: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

