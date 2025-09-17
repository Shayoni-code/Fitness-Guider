// src/api/authApi.js
import axios from 'axios';

export const BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

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

// ---- actual API calls ----

// login user
// export const login = async (email, password) => {
//   const { data } = await axiosClient.post('/auth/login', { email, password });
//   return data;
// };

// // register user
// export const register = async (name, email, password) => {
//   const { data } = await axiosClient.post('/auth/register', {
//     name,
//     email,
//     password,
//   });
//   return data;
// };



// Mock login function
export const login = async (email, password) => {
  return {
    token: 'fake-jwt-token',
    message: 'Login successful (mock)',
  };
};

// Mock register function
export const register = async (name, email, password) => {
  return {
    message: 'User created successfully (mock)',
  };
};


export default axiosClient;
