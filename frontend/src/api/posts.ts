import axios from "axios";

const baseUrl = 'http://localhost:5000/api';

export const getPosts = () => {
  return axios.get(`${baseUrl}/posts`, {
    method: 'GET',
  })
}