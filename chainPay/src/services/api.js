import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || error.message;
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export const authService = {
  register: (userId, phone) => api.post('/register', { userId, phone }),
};

export const walletService = {
  getWallet: (userId) => api.get(`/wallet/${userId}`),
  getBalance: (userId) => api.get(`/wallet/${userId}/balance`),
};

export const transactionService = {
  send: (userId, recipient, amount) => 
    api.post('/send', { userId, recipient, amount }),
  getHistory: (userId, limit = 10) => 
    api.get(`/transactions/${userId}?limit=${limit}`),
};

export const chatService = {
  sendMessage: (userId, message) => 
    api.post('/chat', { userId, message }),
};

export default api;