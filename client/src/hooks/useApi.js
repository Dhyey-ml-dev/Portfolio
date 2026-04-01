import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useMemo } from 'react';

export function useApi() {
  const { token } = useAuth();

  const client = useMemo(() => {
    const instance = axios.create();
    if (token) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return instance;
  }, [token]);

  return client;
}
