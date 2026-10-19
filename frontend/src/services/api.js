import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('study_planner_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fallback helper for offline/demo standalone testing
export const handleMockOrApiCall = async (apiFunc, mockFallbackData) => {
  try {
    const response = await apiFunc();
    return response.data;
  } catch (error) {
    console.warn('Backend API connection offline/unreachable. Serving fallback mock data:', error.message);
    return mockFallbackData;
  }
};
