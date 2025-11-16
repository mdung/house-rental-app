export const PROPERTY_TYPES = [
  { value: 'entire_place', label: 'Entire Place' },
  { value: 'private_room', label: 'Private Room' },
  { value: 'shared_room', label: 'Shared Room' },
] as const;

export const AMENITIES = [
  'WiFi',
  'Kitchen',
  'Washer',
  'Dryer',
  'Air Conditioning',
  'Heating',
  'TV',
  'Parking',
  'Pool',
  'Hot Tub',
  'Gym',
  'Pet Friendly',
  'Smoking Allowed',
  'Wheelchair Accessible',
  'Elevator',
  'Fireplace',
  'Balcony',
  'Garden',
  'Beach Access',
  'Mountain View',
] as const;

export const CANCELLATION_POLICIES = [
  { value: 'flexible', label: 'Flexible', description: 'Full refund 1 day prior' },
  { value: 'moderate', label: 'Moderate', description: 'Full refund 5 days prior' },
  { value: 'strict', label: 'Strict', description: '50% refund up to 1 week prior' },
] as const;

export const BOOKING_STATUS_COLORS = {
  pending: '#FFB800',
  confirmed: '#00A699',
  cancelled: '#C13515',
  completed: '#717171',
} as const;

export const MAX_IMAGES_PER_PROPERTY = 10;
export const MIN_IMAGES_PER_PROPERTY = 5;

export const DEFAULT_PAGE_SIZE = 20;

