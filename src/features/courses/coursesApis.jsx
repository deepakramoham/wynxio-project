import apiClient from "../../services/apiClient";

export const getCourseDataApi = () => apiClient.get("/courses");
export const postCourseDataApi = (data) => apiClient.post("/courses", data);
export const updateCourseDataApi = (data) =>
  apiClient.put(`/courses/${data?.id}`, data);
export const deleteCourseDataApi = (id) => apiClient.delete(`/courses/${id}`);
