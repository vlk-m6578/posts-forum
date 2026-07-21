import { api } from "./axios";

const baseUrl = 'http://localhost:5000/api';

export const getPosts = () => {
  return api.get(`${baseUrl}/posts`, {
    method: 'GET',
  })
}