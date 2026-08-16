import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { authService } from '../services/authService';
import type { UserRole } from '@/types';

export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  city?: string;
  createdAt?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentialsOrUser: any) => Promise<any>;
  register: (userData: any) => Promise<any>;
  registerWorker: (workerData: any) => Promise<any>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(false);

  // Sync state with localStorage on app reload
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken && !user) {
        try {
          const res = await authService.getMe();
          const payload = res.data?.data || res.data || res;
          const userData = payload.user || payload.account;
          if (userData) {
            const normalized = {
              ...userData,
              id: userData.id || userData._id,
              role: userData.role || 'user',
            };
            setUser(normalized);
            localStorage.setItem('user', JSON.stringify(normalized));
          }
        } catch (error) {
          logout();
        }
      }
    };
    initAuth();
  }, []);

  const login = async (credentialsOrUser: any) => {
    setLoading(true);
    try {
      // If it already is a full user object (without password)
      if (credentialsOrUser && credentialsOrUser.role && !credentialsOrUser.password) {
        const normalized = {
          ...credentialsOrUser,
          id: credentialsOrUser.id || credentialsOrUser._id,
        };
        setUser(normalized);
        localStorage.setItem('user', JSON.stringify(normalized));
        if (credentialsOrUser.token) {
          setToken(credentialsOrUser.token);
          localStorage.setItem('token', credentialsOrUser.token);
        }
        return normalized;
      }

      // Otherwise authenticate via backend API
      const res = await authService.login(credentialsOrUser);
      const payload = res.data?.data || res.data || res;
      const userData = payload.user || payload.account;
      const authToken = payload.token;

      if (userData) {
        const normalized = {
          ...userData,
          id: userData.id || userData._id,
          role: userData.role || (credentialsOrUser.email?.includes('admin') ? 'admin' : 'user'),
        };
        setUser(normalized);
        localStorage.setItem('user', JSON.stringify(normalized));
        if (authToken) {
          setToken(authToken);
          localStorage.setItem('token', authToken);
        }
        return normalized;
      }
      return payload;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    try {
      const res = await authService.register(userData);
      const payload = res.data?.data || res.data || res;
      const uData = payload.user || payload.account;
      const authToken = payload.token;

      if (uData) {
        const normalized = {
          ...uData,
          id: uData.id || uData._id,
          role: uData.role || 'user',
        };
        setUser(normalized);
        localStorage.setItem('user', JSON.stringify(normalized));
        if (authToken) {
          setToken(authToken);
          localStorage.setItem('token', authToken);
        }
        return normalized;
      }
      return payload;
    } finally {
      setLoading(false);
    }
  };

  const registerWorker = async (workerData: any) => {
    setLoading(true);
    try {
      const res = await authService.registerWorker(workerData);
      const payload = res.data?.data || res.data || res;
      const wData = payload.user || payload.account;
      const authToken = payload.token;

      if (wData) {
        const normalized = {
          ...wData,
          id: wData.id || wData._id,
          role: 'worker' as UserRole,
        };
        setUser(normalized);
        localStorage.setItem('user', JSON.stringify(normalized));
        if (authToken) {
          setToken(authToken);
          localStorage.setItem('token', authToken);
        }
        return normalized;
      }
      return payload;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const role = user?.role || null;
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, token, role, isAuthenticated, loading, login, register, registerWorker, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};