// src/api/profileApi.js
import axios from 'axios';

export const BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// attach token to every request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('hp_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// -------- API calls for profile --------

// get the logged-in user profile
export const getProfile = async () => {
  const { data } = await axiosClient.get('/profile');
  return data;
};

// update user profile
export const updateProfile = async (profileData) => {
  const { data } = await axiosClient.put('/profile', profileData);
  return data;
};

export default axiosClient;
