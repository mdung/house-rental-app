export interface Message {
  id: string;
  bookingId: string;
  senderId: string;
  receiverId: string;
  message: string;
  images?: string[];
  read: boolean;
  createdAt: string;
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface CreateMessageData {
  bookingId: string;
  message: string;
  images?: string[];
}

export interface MessageThread {
  bookingId: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  otherUser: {
    id: string;
    name: string;
    avatar?: string;
  };
  lastMessage?: Message;
  unreadCount: number;
}

