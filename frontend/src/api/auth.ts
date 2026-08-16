import { api } from "./axios";

export const login = (email: string, password: string) => {
  return api.post(`/auth/login`, {
    email,
    password,
  });
}

export const register = (username: string, email: string, password: string, country: string, city: string) => {
  return api.post(`/auth/register`, {
    username,
    email,
    password,
    country,
    city,
  })
}