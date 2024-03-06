import axios from 'axios';
import { baseURL } from './_config';

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
