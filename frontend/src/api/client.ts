import axios from 'axios';
import type { Experience } from '../types';

const base = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: base,
  headers: { 'Content-Type': 'application/json' }
});

export const fetchExperiences = async (): Promise<Experience[]> => {
  const res = await api.get('/experiences');
  return res.data.data;
};

export const fetchExperience = async (id: string): Promise<Experience> => {
  const res = await api.get(`/experiences/${id}`);
  return res.data.data;
};

export const validatePromo = async (code: string, experienceId?: string) => {
  const res = await api.post('/promo/validate', { code, experienceId });
  return res.data;
};

export const createBooking = async (payload: any) => {
  const res = await api.post('/bookings', payload);
  return res.data;
};

export default api;
