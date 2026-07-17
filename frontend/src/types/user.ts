export interface User {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  country: string;
  city: string;
  posts: [];
}