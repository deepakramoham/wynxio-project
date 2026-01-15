import axios from "axios";

const BASE_URL = "http://localhost:3500";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
});

export default axiosInstance;
