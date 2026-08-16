import API from './api';

export const categoryService = {
  getAllCategories: async () => {
    const res = await API.get('/categories');
    return res.data;
  },
  getCategoryBySlug: async (slug: string) => {
    const res = await API.get(`/categories/${slug}`);
    return res.data;
  },
};