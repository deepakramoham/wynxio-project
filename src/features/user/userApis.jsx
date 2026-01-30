import apiClient from "../../services/apiClient";

export const registerApi = (userData) => apiClient.post(`/register`, userData);
export const loginApi = (userData) => apiClient.post("/login", userData);
