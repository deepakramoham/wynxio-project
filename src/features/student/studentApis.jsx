import apiClient from "../../services/apiClient";

export const getStudentByIdApi = (id) => apiClient.get(`/students/${id}`);
export const getStudentApi = () => apiClient.get("/students");
export const postStudentApi = (data) => apiClient.post("/students", data);
export const updateStudentApi = (data) =>
  apiClient.put(`/students/${data?.id}`, data);
export const deleteStudentApi = (id) => apiClient.delete(`/students/${id}`);
