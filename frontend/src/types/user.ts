export interface User {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  country: string;
  city: string;
  posts: [];
  createdAt: string;
  _count: {
    posts: number;
    likes: number;
    comments: number;
  };
}