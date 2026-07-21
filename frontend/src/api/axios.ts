import { getJwtToken } from "@/services/storageService";
import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

api.interceptors.request.use(config => {
  const token = getJwtToken();

  config.headers.Authorization = `Bearer ${token}`;

  return config;
})