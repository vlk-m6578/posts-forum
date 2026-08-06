export interface Comment {
  id: number;
  text: string;
  createdAt: string;
  postId: number;
  authorId: number;
  author: {
    username: string;
    country: string;
    cityx: string;
  };
}

export interface CommentData {
  text: string;
  postId: number;
}