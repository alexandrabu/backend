/* import axios from 'axios';
import { environment } from '../environments/environment';
import keycloak from '../keycloak';

class ApiService {
    constructor() {
        this.baseUrl = environment.apiUrl;
    }

    getAuthHeaders() {
        return keycloak.authenticated ? { Authorization: `Bearer ${keycloak.token}` } : {};
    }

    get(endpoint) {
        return axios.get(`${this.baseUrl}/${endpoint}`, { headers: this.getAuthHeaders() });
    }

    post(endpoint, data) {
        return axios.post(`${this.baseUrl}/${endpoint}`, data, { headers: this.getAuthHeaders() });
    }

    put(endpoint, data) {
        return axios.put(`${this.baseUrl}/${endpoint}`, data, { headers: this.getAuthHeaders() });
    }

    delete(endpoint) {
        return axios.delete(`${this.baseUrl}/${endpoint}`, { headers: this.getAuthHeaders() });
    }
}

const apiService = new ApiService();
export default apiService; */

import { useQuery } from '@tanstack/react-query';
import axios from './axiosConfig';

const fetchData = async ({ queryKey }) => {
    const [endpoint] = queryKey;  // Extract the endpoint from queryKey
    const response = await axios.get(`/${endpoint}`);
    return response.data;
};


export const useApiData = ({ endpoint, options = {} }) => {
    return useQuery({
        queryKey: [endpoint],
        queryFn: fetchData,
        ...options,
    });
};

