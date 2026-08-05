import { api } from "./axios";

const baseUrl = 'http://localhost:5000/api/users';

export const getMyProfile = () => {
  return api.get(`${baseUrl}/me`);
}

export const getUserById = (id: number) => {
  return api.get(`${baseUrl}/${id}`)
}

export const getProfile = () => {
  return api.get(`${baseUrl}/profile`);
}

export const updateProfile = (data: FormData | { username: string; country: string; city: string }) => {
  return api.put(`${baseUrl}/profile`, data);
}