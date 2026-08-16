import API from './api';

export const workerService = {
  getAllWorkers: async (params?: Record<string, any>) => {
    const res = await API.get('/workers', { params });
    return res.data;
  },
  getWorkerById: async (id: string) => {
    const res = await API.get(`/workers/${id}`);
    return res.data;
  },
  updateProfile: async (data: Record<string, any>) => {
    const res = await API.put('/workers/profile', data);
    return res.data;
  },
};