import axios, { InternalAxiosRequestConfig } from 'axios';
import { authService } from '../services/authService';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:32768/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = authService.getAccessToken();
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
},
 (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await authService.refreshTokens();
        originalRequest.headers['Authorization'] = newAccessToken;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        authService.clearTokens();
        // You might want to dispatch an action to clear the user state and redirect to login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


