import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCourseDataApi,
  postCourseDataApi,
  updateCourseDataApi,
  deleteCourseDataApi,
} from "./coursesApis";

export const getCourseData = createAsyncThunk(
  "course/getCourseData",
  async () => {
    //simulating network delay 2seconds
    // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const response = await getCourseDataApi();
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
    const response = await postCourseDataApi(courseData);
    if (response?.data?.newCourse) {
      return response.data.newCourse;
    }
  },
);

export const updateCourseData = createAsyncThunk(
  "course/updateCourseData",
  async (courseData) => {
    const response = await updateCourseDataApi(courseData);
    if (response?.data?.course) {
      return response?.data?.course;
    }
  },
);

export const deleteCourseData = createAsyncThunk(
  "course/deleteCourseData",
  async (id) => {
    const response = await deleteCourseDataApi(id);
    if (response.data) {
      return response.data?.deletedId;
    }
  },
);
