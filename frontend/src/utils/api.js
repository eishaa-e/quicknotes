import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // adjust if your backend uses different base URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// request interceptor to add token
api.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (e) { }
    return config;
});

export default api;
