import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/'; 

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getComponents = () => api.get('/components/');
export const createComponent = (data) => api.post('/components/', data);

export const getVehicles = () => api.get('/vehicles/');
export const createVehicle = (data) => api.post('/vehicles/', data);

export const getServices = () => api.get('/services/');
export const createService = (data) => api.post('/services/', data);
export const getService = (id) => api.get(`/services/${id}/`);

export const getServicesByVehicle = (id) => api.get(`/services/vehicle/${id}/`);

export const getMonthlyRevenue = () => api.get('/revenue/monthly/');
export const getYearlyRevenue = () => api.get('/revenue/yearly/');
export const getDailyRevenue = () => api.get('/revenue/daily/');

export default api;