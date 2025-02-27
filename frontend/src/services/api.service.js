// src/services/api.service.js
import axios from 'axios';
import { environment } from '../environments/environment';
import keycloak from '../keycloak';

class ApiService {
    constructor() {
        this.baseUrl = environment.apiUrl;

        // Axios Interceptor to add Bearer Token to every request
        axios.interceptors.request.use(
            (config) => {
                if (keycloak.authenticated) {
                    config.headers.Authorization = `Bearer ${keycloak.token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    get(endpoint) {
        return axios.get(`${this.baseUrl}/${endpoint}`);
    }

    post(endpoint, data) {
        return axios.post(`${this.baseUrl}/${endpoint}`, data);
    }

    put(endpoint, data) {
        return axios.put(`${this.baseUrl}/${endpoint}`, data);
    }

    delete(endpoint) {
        return axios.delete(`${this.baseUrl}/${endpoint}`);
    }
}

const apiService = new ApiService();
export default apiService;
