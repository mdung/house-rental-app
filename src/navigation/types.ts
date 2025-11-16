import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Wishlist: undefined;
  Bookings: undefined;
  Profile: undefined;
  PropertyDetail: { propertyId: string };
  Booking: { propertyId: string };
  BookingConfirmation: { bookingId: string };
  BookingDetail: { bookingId: string };
  CreateProperty: undefined;
  ReviewList: { propertyId: string };
  WriteReview: { propertyId: string; bookingId: string };
  Chat: { bookingId: string };
  MessageList: undefined;
  EditProfile: undefined;
  Settings: undefined;
  HostDashboard: undefined;
};

export type PropertyStackParamList = {
  PropertyList: undefined;
  PropertyDetail: { propertyId: string };
  CreateProperty: undefined;
  EditProperty: { propertyId: string };
};

export type BookingStackParamList = {
  BookingList: undefined;
  BookingDetail: { bookingId: string };
  BookingConfirmation: { bookingId: string };
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  PropertyStack: NavigatorScreenParams<PropertyStackParamList>;
  BookingStack: NavigatorScreenParams<BookingStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

