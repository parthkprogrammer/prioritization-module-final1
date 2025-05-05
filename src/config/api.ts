
import axios from 'axios';

// Base configuration for axios instance used throughout the prioritization module
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor - can be used to add auth tokens
api.interceptors.request.use(
  (config) => {
    // Add any common request processing here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle common errors/responses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors (401, 403, 500, etc.)
    return Promise.reject(error);
  }
);

export default api;
