import type { CommentData } from "../types/comment";
import { api } from "./axios";

export const getComments = (postId: number) => {
  return api.get(`/comments/post/${postId}`);
}

export const createComment = (data: CommentData) => {
  return api.post('/comments', data);
}

export const deleteComment = (commentId: number) => {
  return api.delete(`/comments/${commentId}`);
}