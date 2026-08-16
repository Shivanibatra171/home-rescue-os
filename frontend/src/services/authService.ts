// import API from './api';

// export const authService = {
//   // Login (User / Worker / Admin)
//   login: async (credentials: Record<string, any>) => {
//     const response = await API.post('/auth/login', credentials);
//     if (response.data.data?.token) {
//       localStorage.setItem('token', response.data.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.data.user));
//     }
//     return response.data;
//   },

//   // Register
//   register: async (userData: Record<string, any>) => {
//     const response = await API.post('/auth/register', userData);
//     if (response.data.data?.token) {
//       localStorage.setItem('token', response.data.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.data.user));
//     }
//     return response.data;
//   },

//   // Get Current User Profile
//   getMe: async () => {
//     const response = await API.get('/auth/me');
//     return response.data;
//   },

//   // Logout
//   logout: () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   },
// };

import API from './api';

export const authService = {
  // Smart Login (Auto-try User -> Admin -> Worker)
  login: async (credentials: Record<string, any>) => {
    // 1. Try Admin Login First
    try {
      const adminRes = await API.post('/auth/admin/login', credentials);
      const resData = adminRes.data;
      const payload = resData.data || resData;

      if (payload.token) {
        localStorage.setItem('token', payload.token);
        localStorage.setItem('user', JSON.stringify(payload.user));
        return resData;
      }
    } catch (e) {
      // Admin attempt failed, continue to User login
    }

    // 2. Try User Login Next
    try {
      const userRes = await API.post('/auth/user/login', credentials);
      const resData = userRes.data;
      const payload = resData.data || resData;

      if (payload.token) {
        localStorage.setItem('token', payload.token);
        localStorage.setItem('user', JSON.stringify(payload.user));
        return resData;
      }
    } catch (e) {
      // User attempt failed, continue to Worker login
    }

    // 3. Try Worker Login
    const workerRes = await API.post('/auth/worker/login', credentials);
    const wData = workerRes.data;
    const payload = wData.data || wData;

    if (payload.token) {
      localStorage.setItem('token', payload.token);
      localStorage.setItem('user', JSON.stringify(payload.user));
    }
    return wData;
  },

  // Register User
  register: async (userData: Record<string, any>) => {
    return authService.registerUser(userData);
  },

  // Register User
  registerUser: async (userData: Record<string, any>) => {
    const response = await API.post('/auth/user/register', userData);
    const payload = response.data.data || response.data;
    if (payload.token) {
      localStorage.setItem('token', payload.token);
      localStorage.setItem('user', JSON.stringify(payload.user));
    }
    return response.data;
  },

  // Register Worker
  registerWorker: async (workerData: Record<string, any>) => {
    const response = await API.post('/auth/worker/register', workerData);
    const payload = response.data.data || response.data;
    if (payload.token) {
      localStorage.setItem('token', payload.token);
      localStorage.setItem('user', JSON.stringify(payload.user));
    }
    return response.data;
  },

  // Get Me
  getMe: async () => {
    const response = await API.get('/auth/me');
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};