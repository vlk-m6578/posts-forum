import { api } from "./axios";

const baseUrl = 'http://localhost:5000/api/users';

export const getUserById = (id: number) => {
  return api.get(`${baseUrl}/${id}`)
}