import API from './api';

export const uploadService = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await API.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // Returns { success: true, data: { url: "cloudinary_url" } }
  },
};