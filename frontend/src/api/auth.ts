import axios from "axios";

const baseUrl = 'http://localhost:5000/api/auth';

export const login = (email: string, password: string) => {
  return axios.post(`${baseUrl}/login`, {
    email,
    password,
  });
}

export const register = (username: string, email: string, password: string, country: string, city: string) => {
  return axios.post(`${baseUrl}/register`, {
    username,
    email,
    password,
    country,
    city,
  })
}