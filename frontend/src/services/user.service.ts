import API from './api';

export const userService = {
  updateProfile: async (data: Record<string, any>) => {
    const res = await API.put('/users/profile', data);
    return res.data;
  },
  getFavourites: async () => {
    const res = await API.get('/users/favourites');
    return res.data;
  },
  addFavourite: async (workerId: string) => {
    const res = await API.post(`/users/favourites/${workerId}`);
    return res.data;
  },
  removeFavourite: async (workerId: string) => {
    const res = await API.delete(`/users/favourites/${workerId}`);
    return res.data;
  },
};
