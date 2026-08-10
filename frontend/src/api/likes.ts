import { api } from "./axios";

export const getLikeStatus = (postId: number) => {
  return api.get(`/likes/status/${postId}`);
}

export const addLike = (postId: number) => {
  return api.post(`/likes/${postId}`);
}

export const removeLike = (postId: number) => {
  return api.delete(`/likes/${postId}`);
}