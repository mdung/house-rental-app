export interface Review {
  id: string;
  propertyId: string;
  bookingId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  categories: {
    cleanliness: number;
    accuracy: number;
    location: number;
    value: number;
    checkIn: number;
    communication: number;
  };
  createdAt: string;
  reviewer?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface CreateReviewData {
  propertyId: string;
  bookingId: string;
  rating: number;
  comment: string;
  categories: {
    cleanliness: number;
    accuracy: number;
    location: number;
    value: number;
    checkIn: number;
    communication: number;
  };
}

export interface PropertyRating {
  overall: number;
  cleanliness: number;
  accuracy: number;
  location: number;
  value: number;
  checkIn: number;
  communication: number;
  totalReviews: number;
}


