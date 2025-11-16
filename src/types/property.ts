export type PropertyType = 'entire_place' | 'private_room' | 'shared_room';
export type CancellationPolicy = 'flexible' | 'moderate' | 'strict';

export interface Property {
  id: string;
  hostId: string;
  title: string;
  description: string;
  type: PropertyType;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  cleaningFee: number;
  securityDeposit: number;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  availability: string[]; // Array of available dates
  houseRules: string[];
  cancellationPolicy: CancellationPolicy;
  instantBook: boolean;
  createdAt: string;
  updatedAt: string;
  host?: {
    id: string;
    name: string;
    avatar?: string;
    verified: boolean;
  };
  rating?: number;
  reviewCount?: number;
}

export interface CreatePropertyData {
  title: string;
  description: string;
  type: PropertyType;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  cleaningFee: number;
  securityDeposit: number;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  houseRules: string[];
  cancellationPolicy: CancellationPolicy;
  instantBook: boolean;
}

export interface PropertyFilters {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: PropertyType[];
  amenities?: string[];
  instantBook?: boolean;
  superhost?: boolean;
}

