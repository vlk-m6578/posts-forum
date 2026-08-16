import { api } from "./axios";

export const getMyProfile = () => {
  return api.get(`/users/me`);
}

export const getUserById = (id: number) => {
  return api.get(`/users/${id}`)
}

export const getProfile = () => {
  return api.get(`/users/profile`);
}

export const updateProfile = (data: FormData | { username: string; country: string; city: string }) => {
  return api.put(`/users/profile`, data);
}

export const getAllUsers = () => {
  return api.get(`/users`);
}

export const deleteUser = (id: number) => {
  return api.delete(`/users/${id}`);
}