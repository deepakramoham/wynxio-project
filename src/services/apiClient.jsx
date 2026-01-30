import axios from "axios";

let store;

export const getStore = (_store) => {
  store = _store;
};

const BASE_URL = "http://localhost:3500";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
});

apiClient.interceptors.request.use(
  (config) => {
    const { user } = store.getState().userState || {};
    const { accessToken } = user || {};
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;
