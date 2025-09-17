import axiosClient from './axiosClient';

// For workouts and goals - adapt backend names as needed
export const getWorkouts = () => axiosClient.get('/fitness-goals'); // if you use separate workouts, change endpoint
export const setFitnessGoals = (payload) => axiosClient.post('/fitness-goals', payload);
export const updateFitnessGoals = (payload) => axiosClient.put('/fitness-goals', payload);
export const deleteFitnessGoals = () => axiosClient.delete('/fitness-goals');
