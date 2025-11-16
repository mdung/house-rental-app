import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { PropertyDetailScreen } from '../screens/property/PropertyDetailScreen';
import { BookingScreen } from '../screens/booking/BookingScreen';
import { BookingConfirmationScreen } from '../screens/booking/BookingConfirmationScreen';
import { BookingDetailScreen } from '../screens/booking/BookingDetailScreen';
import { CreatePropertyScreen } from '../screens/property/CreatePropertyScreen';
import { ReviewListScreen } from '../screens/review/ReviewListScreen';
import { WriteReviewScreen } from '../screens/review/WriteReviewScreen';
import { MessageListScreen } from '../screens/message/MessageListScreen';
import { ChatScreen } from '../screens/message/ChatScreen';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';
import { HostDashboardScreen } from '../screens/host/HostDashboardScreen';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
            <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
            <Stack.Screen name="CreateProperty" component={CreatePropertyScreen} />
            <Stack.Screen name="ReviewList" component={ReviewListScreen} />
            <Stack.Screen name="WriteReview" component={WriteReviewScreen} />
            <Stack.Screen name="MessageList" component={MessageListScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="HostDashboard" component={HostDashboardScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

