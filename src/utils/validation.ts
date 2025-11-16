import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const registerSchema = yup.object().shape({
  name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  role: yup.string().oneOf(['host', 'guest', 'both']).required('Role is required'),
});

export const propertySchema = yup.object().shape({
  title: yup.string().min(10, 'Title must be at least 10 characters').required('Title is required'),
  description: yup.string().min(50, 'Description must be at least 50 characters').required('Description is required'),
  type: yup.string().oneOf(['entire_place', 'private_room', 'shared_room']).required('Property type is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  pricePerNight: yup.number().min(1, 'Price must be at least $1').required('Price is required'),
  maxGuests: yup.number().min(1, 'Must accommodate at least 1 guest').required('Max guests is required'),
  bedrooms: yup.number().min(0).required('Bedrooms is required'),
  beds: yup.number().min(1, 'Must have at least 1 bed').required('Beds is required'),
  bathrooms: yup.number().min(0.5).required('Bathrooms is required'),
  images: yup.array().min(5, 'At least 5 images are required').required('Images are required'),
});

export const reviewSchema = yup.object().shape({
  rating: yup.number().min(1).max(5).required('Rating is required'),
  comment: yup.string().min(10, 'Comment must be at least 10 characters').required('Comment is required'),
  categories: yup.object().shape({
    cleanliness: yup.number().min(1).max(5).required(),
    accuracy: yup.number().min(1).max(5).required(),
    location: yup.number().min(1).max(5).required(),
    value: yup.number().min(1).max(5).required(),
    checkIn: yup.number().min(1).max(5).required(),
    communication: yup.number().min(1).max(5).required(),
  }),
});


