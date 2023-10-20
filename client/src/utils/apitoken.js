// api.js
import axios from "axios";
import { Login } from "../pages/_helpers/service";
const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: apiUrl,
});

// Add a request interceptor to set the Authorization header with the token
api.interceptors.request.use((config) => {
  const token = Login()?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle 401 Unauthorized responses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      if (error.config.onForbidden) {
        error.config.onForbidden();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
