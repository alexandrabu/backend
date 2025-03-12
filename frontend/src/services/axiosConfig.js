import axios from 'axios';
import keycloak from '../keycloak';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api'
});


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