import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { getToken } from './token';
import { AuthorizationStatus, APIRoute } from '../const';
import { store } from '../store';
import { requireAuthorization } from '../store/action';

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

type ErrorResponse = {
  message?: string;
  error?: string;
};

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (status: number) => !!StatusCodeMapping[status];

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
      if (!error.response) {
        toast.error(error.message || 'Network error');
        return Promise.reject(error);
      }

      const status = error.response.status;
      const url = error.config?.url;

      if (status === 401 && url === APIRoute.Login) {
        return Promise.reject(error);
      }

      if (status === 401) {
        store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      }

      if (shouldDisplayError(status)) {
        const errorMessage = error.response.data?.message ||
          error.response.data?.error ||
          `Error ${status}: ${error.message}`;
        toast.error(errorMessage);
      }

      return Promise.reject(error);
    }
  );

  return api;
};
