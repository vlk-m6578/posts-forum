import { api } from "./axios";

const baseUrl = 'http://localhost:5000/api';

export const getPosts = () => {
  return api.get(`${baseUrl}/posts`);
}

export const getMyPosts = () => {
  return api.get(`${baseUrl}/posts/my`);
}

export const addPost = (data: FormData) => {
  return api.post(`${baseUrl}/posts`, data);
}