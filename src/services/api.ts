import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { getToken, dropToken } from './token';
import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { requireAuthorization } from '../store/action';

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

type ErrorResponse = {
  message?: string;
  error?: string;
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['X-Token'] = token;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        if (error.response.status === 401) {
          store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
          dropToken();
        }

        if (error.response.status >= 500) {
          toast.error('Server is unavailable. Please try again later.');
        } else {
          toast.error(error.response.data?.error || 'Request failed');
        }
      } else if (error.code === 'ERR_NETWORK') {
        toast.error('Network error. Please check your connection.');
      }

      return Promise.reject(error);
    }
  );

  return api;
};
