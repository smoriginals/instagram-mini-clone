import axios from 'axios';
import { showLoading, hideLoading } from '../utility/loadingBridge';
import { useGlobal } from '../Context/GlobalContext'

const API = axios.create(
    {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true,
        timeout: 15000,
    }
)
const PUBLIC_ENDPOINTS = ['/api/user/create','/api/user/login'];

API.interceptors.request.use((config) => {
    showLoading();
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    hideLoading();
    return Promise.reject(error);
});

API.interceptors.response.use((res) => {
    hideLoading();
    return res;
},
    (err) => {
        hideLoading();

        const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) =>
            err.config?.url?.includes(endpoint)
        );


        if (err.response?.status === 401 && !isPublicEndpoint) {
            const { LogoutUser } = useGlobal()
            localStorage.clear();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            LogoutUser();
            //window.location.href = '/login'
        }
        return Promise.reject(err);
    }
)

export default API;