export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'refunded';

export interface Booking {
  id: string;
  propertyId: string;
  guestId: string;
  hostId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  property?: {
    id: string;
    title: string;
    images: string[];
    address: string;
  };
  guest?: {
    id: string;
    name: string;
    avatar?: string;
  };
  host?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface CreateBookingData {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface BookingPriceBreakdown {
  nights: number;
  pricePerNight: number;
  subtotal: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  total: number;
}


