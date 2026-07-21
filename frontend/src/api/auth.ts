import { api } from "./axios";

const baseUrl = 'http://localhost:5000/api/auth';

export const login = (email: string, password: string) => {
  return api.post(`${baseUrl}/login`, {
    email,
    password,
  });
}

export const register = (username: string, email: string, password: string, country: string, city: string) => {
  return api.post(`${baseUrl}/register`, {
    username,
    email,
    password,
    country,
    city,
  })
}

export const getProfile = () => {
  return api.get(`${baseUrl}/me`);
}