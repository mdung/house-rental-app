import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

export const formatDateRange = (checkIn: string, checkOut: string): string => {
  const checkInDate = parseISO(checkIn);
  const checkOutDate = parseISO(checkOut);
  
  if (format(checkInDate, 'MMM') === format(checkOutDate, 'MMM')) {
    return `${format(checkInDate, 'MMM d')} - ${format(checkOutDate, 'd, yyyy')}`;
  }
  return `${format(checkInDate, 'MMM d')} - ${format(checkOutDate, 'MMM d, yyyy')}`;
};

export const formatRelativeTime = (date: string): string => {
  return formatDistanceToNow(parseISO(date), { addSuffix: true });
};

export const calculateNights = (checkIn: string, checkOut: string): number => {
  const checkInDate = parseISO(checkIn);
  const checkOutDate = parseISO(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

