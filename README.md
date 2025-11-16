# House Rental App

A comprehensive React Native mobile application for house and room rentals, enabling property owners to list their spaces and travelers to discover, book, and review accommodations.

## Features

### Core Features
- **Authentication**: User registration, login, and profile management
- **Property Listings**: Create, view, edit, and manage property listings
- **Search & Discovery**: Advanced search with filters for location, dates, price, amenities
- **Booking System**: Complete booking flow with date selection and pricing
- **Reviews & Ratings**: Post-stay reviews with detailed ratings
- **Messaging**: Real-time messaging between hosts and guests
- **Wishlist**: Save favorite properties
- **User Roles**: Support for both hosts and guests

### Technology Stack
- React Native (Expo)
- TypeScript
- React Navigation
- React Hook Form
- Axios for API calls
- Context API for state management
- AsyncStorage for local storage

## Project Structure

```
house-rental-app/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # Screen components
│   ├── navigation/      # Navigation configuration
│   ├── services/        # API and service layer
│   ├── context/         # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   └── config/          # Configuration files
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your preferred platform:
```bash
npm run android  # For Android
npm run ios      # For iOS
npm run web      # For Web
```

## Environment Variables

Create a `.env` file in the root directory:

```
EXPO_PUBLIC_API_URL=https://api.houserental.com/api
```

## API Integration

The app is configured to work with a RESTful API. Update the `API_BASE_URL` in `src/config/env.ts` to point to your backend API.

### API Endpoints Expected:
- `/auth/login` - User login
- `/auth/register` - User registration
- `/auth/me` - Get current user
- `/properties` - Get properties list
- `/properties/:id` - Get property details
- `/bookings` - Create/get bookings
- `/reviews` - Create/get reviews
- `/messages` - Messaging endpoints

## Features Status

### ✅ Implemented
- Project structure and setup
- Authentication flow (login, register)
- Navigation structure
- Property listing display
- Basic UI components
- Context providers (Auth, Theme)
- API service layer
- Type definitions

### 🚧 In Progress / To Be Implemented
- Property detail screen
- Booking flow
- Search and filters
- Reviews and ratings
- Messaging system
- Wishlist functionality
- Host dashboard
- Payment integration
- Maps integration
- Image upload
- Notifications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Contact

For questions or support, please contact the development team.


