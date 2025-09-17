import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Attach token automatically
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('hp_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
