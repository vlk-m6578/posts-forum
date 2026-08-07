import type { Photo } from "@/types/photo";

export const validateLoginForm = (email: string, password: string) => {
  if (!validateRequired(email)) return 'Email is required';
  if (!validateEmail(email)) return 'Invalid email address';

  if (!validateRequired(password)) return 'Password is required';
  if (!validatePasswordLength(password)) return 'Password must contain at least 6 characters';

  return '';
}

export const validateRegisterForm = (username: string, email: string, country: string, city: string, password: string, confirmPassword: string) => {
  if (!validateRequired(username)) return 'Username is required';
  if (!validateRequired(email)) return 'Email is required';
  if (!validateRequired(country)) return 'Country is required';
  if (!validateRequired(city)) return 'City is required';

  if (!validateUsernameLength(username)) return 'Username must be at least 3 characters long';
  if (!validateEmail(email)) return 'Invalid email address';
  if (!validatePasswordLength(password)) return 'Password must contain at least 6 characters';

  if (!validatePasswordMatch(password, confirmPassword)) return `Passwords don't match`;

  return '';
}

export const validateCreatePostForm = (title: string, description: string, images: Photo[], country: string, city: string) => {
  if (!validateRequired(title)) return { title: 'Title is required' };
  if (!validateTitle(title)) return { title: 'Title must be between 1 and 30 characters' };

  if (!validateRequired(description)) return { description: 'Description is required' };
  if (!validateDescription(description)) return { description: 'Description must be between 1 and 200 characters' };

  if (!validateImages(images)) return { images: 'Upload at least one image' };

  if (!validateCountry(country)) return { country: 'Country must be between 2 and 60 characters' }
  if (!validateCity(city)) return { city: 'City must be between 2 and 100 characters' }

  return {
    title: '',
    description: '',
    images: '',
    country: '',
    city: '',
  };
}

export const validateProfileForm = (username: string, country: string, city: string) => {
  if (!validateRequired(username)) return { username: 'Username is required' };
  if (!validateUsernameLength(username)) return { username: 'Username must be at least 3 characters long' };

  if (!validateCountry(country)) return { country: 'Country must be between 2 and 60 characters' }
  if (!validateCity(city)) return { city: 'City must be between 2 and 100 characters' }

  return {
    username: '',
    country: '',
    city: '',
  };
}

export const validateCommentForm = (text: string) => {
  if(!validateCommentText(text)) return 'Please enter a comment';

  return '';
}

const validateCommentText = (text: string) => {
  return text.trim().length > 0 && text.trim().length <= 300;
}

const validateCity = (title: string) => {
  return title.trim().length > 1 && title.trim().length <= 100;
}

const validateCountry = (title: string) => {
  return title.trim().length > 1 && title.trim().length <= 60;
}

const validateImages = (images: Photo[]) => {
  return images.length > 0 && images.length <= 4;
}

const validateTitle = (title: string) => {
  return title.trim().length > 0 && title.trim().length <= 30;
}

const validateDescription = (description: string) => {
  return description.trim().length > 0 && description.trim().length <= 200;
}

const validateRequired = (input: string) => {
  return input.trim().length !== 0;
}

const validateEmail = (email: string) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,}$/.test(email);
}

const validatePasswordLength = (password: string) => {
  return password.trim().length > 5;
}

const validatePasswordMatch = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
}

const validateUsernameLength = (username: string) => {
  return username.trim().length > 2;
}

