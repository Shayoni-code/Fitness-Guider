import axiosClient from './axiosClient';

// Assuming backend uses /vitals endpoints (create these in backend)
export const getVitals = () => axiosClient.get('/vitals');
export const addVital = (payload) => axiosClient.post('/vitals', payload);
export const deleteVital = (id) => axiosClient.delete(`/vitals/${id}`);
