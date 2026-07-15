import axios from "axios";

const baseUrl = 'http://localhost:5000/api/auth';

export const login = (email: string, password: string) => {
  return axios.post(`${baseUrl}/login`, {
    email,
    password,
  });
}