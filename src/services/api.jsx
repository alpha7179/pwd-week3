//src/services/api.jsx
import axios from 'axios';

const DEFAULT_BASE_URL = 'http://localhost:3000';
const rawBaseUrl = import.meta.env?.VITE_API_BASE_URL || DEFAULT_BASE_URL;
const API_BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    console.log('API request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export const restaurantAPI = {
  getRestaurants: async () => {
    const response = await api.get('/api/restaurants');
    return response.data;
  },

  createRestaurant: async (payload) => {
    const response = await api.post('/api/restaurants', payload);
    return response.data;
  },

  updateRestaurant: async (id, payload) => {
    const response = await api.put(`/api/restaurants/${id}`, payload);
    return response.data;
  },

  deleteRestaurant: async (id) => {
    const response = await api.delete(`/api/restaurants/${id}`);
    return response.status;
  },

  getRestaurantById: async (id) => {
    const response = await api.get(`/api/restaurants/${id}`);
    return response.data;
  },

  getPopularRestaurants: async () => {
    const response = await api.get('/api/restaurants/popular');
    return response.data;
  },
};

export const submissionAPI = {
  createSubmission: async (payload) => {
    const response = await api.post('/api/submissions', payload);
    return response.data;
  },
  listSubmissions: async (status) => {
    const response = await api.get('/api/submissions', { params: { status } });
    return response.data;
  },
  updateSubmission: async (id, payload) => {
    const response = await api.put(`/api/submissions/${id}`, payload);
    return response.data;
  },
  deleteSubmission: async (id) => {
    const response = await api.delete(`/api/submissions/${id}`);
    return response.status;
  },
};

export default api;