import axios from 'axios';

// Create an axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: 'https://api.thoughtpro.com', // Replace with your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Add auth token if available
    const token = null; // Get token from AsyncStorage or Redux
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.log('Unauthorized access');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
