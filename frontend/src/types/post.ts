
export interface Post {
  id: number;
  title: string;
  description: string;
  images: string[];
  country: string;
  city: string;
  createdAt: string;

  author: {
    id: number;
    username: string;
    email: string;
    city: string;
    country: string;
  };

  _count: {
    likes: number;
    comments: number;
  };

  isLiked?: boolean;
}