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

  if(!validateUsernameLength(username)) return 'Username must be at least 3 characters long';
  if (!validateEmail(email)) return 'Invalid email address';
  if (!validatePasswordLength(password)) return 'Password must contain at least 6 characters';

  if (!validatePasswordMatch(password, confirmPassword)) return `Passwords don't match`;

  return '';
}

export const validateRequired = (input: string) => {
  return input.trim().length !== 0;
}

export const validateEmail = (email: string) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,}$/.test(email);
}

export const validatePasswordLength = (password: string) => {
  return password.trim().length > 5;
}

export const validatePasswordMatch = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
}

export const validateUsernameLength = (username: string) => {
  return username.trim().length > 2;
}