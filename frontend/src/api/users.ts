import axios from "axios";

const baseUrl = 'http://localhost:5000/api/users';

export const getUserById = (id: number) => {
  return axios.get(`${baseUrl}/${id}`)
}