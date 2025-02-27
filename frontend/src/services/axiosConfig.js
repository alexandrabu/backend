import axios from 'axios';
import keycloak from '../keycloak';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api'
});

// Interceptor to add Bearer token to requests
axiosInstance.interceptors.request.use(
    (config) => {
        if (keycloak.authenticated) {
            config.headers.Authorization = `Bearer ${keycloak.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;