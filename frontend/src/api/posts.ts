import { api } from "./axios";


export const getPosts = (params?: { search?: string, country?: string, city?: string, sort?: string }) => {
  return api.get('/posts', { params });
}

export const getMyPosts = () => {
  return api.get('/posts/my');
}

export const addPost = (data: FormData) => {
  return api.post('/posts', data);
}

export const updatePost = (id: number, data: FormData) => {
  return api.put(`/posts/${id}`, data);
}

export const deletePost = (id: number) => {
  return api.delete(`/posts/${id}`);
}