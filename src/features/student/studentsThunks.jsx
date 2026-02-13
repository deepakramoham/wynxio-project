import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStudentByIdApi,
  getStudentApi,
  postStudentApi,
  updateStudentApi,
  deleteStudentApi,
} from "./studentApis";

export const getStudentDataById = createAsyncThunk(
  "student/getStudentsDataById",
  async (id) => {
    //simulating network delay 2seconds
    // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const response = await getStudentByIdApi(id);
    if (response?.data?.student) {
      return response?.data?.student;
    }
  },
);
export const getStudentsData = createAsyncThunk(
  "student/getStudentsData",
  async () => {
    //simulating network delay 2seconds
    // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const response = await getStudentApi();

    if (response.data) {
      return response.data;
    }
  },
);

export const postStudentData = createAsyncThunk(
  "student/postStudentData",
  async (studentData) => {
    //simulating network delay 2seconds
    // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const response = await postStudentApi(studentData);
    if (response.data) {
      return response.data;
    }
  },
);

export const updateStudentData = createAsyncThunk(
  "student/updateStudentData",
  async (studentData) => {
    const response = await updateStudentApi(studentData);
    if (response.data) {
      return response.data;
    }
  },
);

export const deleteStudentData = createAsyncThunk(
  "student/deleteStudentData",
  async (id) => {
    const response = await deleteStudentApi(id);

    if (response.status === 200) {
      return id;
    }
  },
);
