import axios from 'axios'; // Assuming you're using axios, otherwise use fetch

const API_BASE_URL = 'http://localhost:3000/api/v1'; // Your backend base URL

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token to every outgoing request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// You can also add a response interceptor for global error handling (e.g., redirect on 401)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors, e.g., redirect to login
      console.error('Unauthorized request, redirecting to login...');
      localStorage.removeItem('token'); // Clear invalid token
      // window.location.href = '/login'; // Or use your router's navigate function
    }
    return Promise.reject(error);
  }
);

export default apiClient;