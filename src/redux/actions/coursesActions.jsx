import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getCourseData = createAsyncThunk(
  "course/getCourseData",
  async () => {
    //simulating network delay 2seconds
    // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const response = await axiosInstance.get(`/courses`);
    if (response.data) {
      return response.data;
    }
  },
);

export const postCourseData = createAsyncThunk(
  "course/postCourseData",
  async (courseData) => {
    //simulating network delay 2seconds
    // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const response = await axiosInstance.post(`/courses`, courseData);
    if (response.data) {
      return response.data;
    }
  },
);

export const updateCourseData = createAsyncThunk(
  "course/updateCourseData",
  async (courseData) => {
    const response = await axiosInstance.put(
      `/courses/${courseData?.id}`,
      courseData,
    );
    if (response.data) {
      return response.data;
    }
  },
);

export const deleteCourseData = createAsyncThunk(
  "course/deleteCourseData",
  async (id) => {
    const response = await axiosInstance.delete(`/courses/${id}`);
    if (response.data) {
      return response.data?.id;
    }
  },
);
