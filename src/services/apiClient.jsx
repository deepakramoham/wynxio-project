import axios from "axios";
import { logOut } from "../features/user/userSlice";
import { getStore } from "../main";

const BASE_URL = "https://coursemaster-backend-9wxk.onrender.com";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
});

apiClient.interceptors.request.use(
  (config) => {
    const { user } = getStore().getState().userState || {};
    const { accessToken } = user || {};
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 403) {
      getStore().dispatch(logOut());
      localStorage.removeItem("user");
      window.location.href = "/session-expired";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
