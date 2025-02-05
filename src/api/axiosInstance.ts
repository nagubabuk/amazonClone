// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // If you need to send cookies or authentication headers
});

export default axiosInstance;
