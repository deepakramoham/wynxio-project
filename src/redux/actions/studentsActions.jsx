import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getStudentDataById = createAsyncThunk(
  "course/getStudentsData",
  async (id) => {
    //simulating network delay 2seconds
    // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const response = await axiosInstance.get(`/students/${id}`);
    if (response.data) {
      return response.data;
    }
  },
);
export const getStudentsData = createAsyncThunk(
  "course/getStudentsData",
  async () => {
    //simulating network delay 2seconds
    // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const response = await axiosInstance.get(`/students`);
    if (response.data) {
      return response.data;
    }
  },
);

export const postStudentData = createAsyncThunk(
  "course/postStudentData",
  async (studentData) => {
    //simulating network delay 2seconds
    // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const response = await axiosInstance.post(`/students`, studentData);
    if (response.data) {
      return response.data;
    }
  },
);

export const updateStudentData = createAsyncThunk(
  "course/updateStudentData",
  async (studentData) => {
    const response = await axiosInstance.put(
      `/students/${studentData?.id}`,
      studentData,
    );
    if (response.data) {
      return response.data;
    }
  },
);

export const deleteStudentData = createAsyncThunk(
  "course/deleteStudentData",
  async (id) => {
    const response = await axiosInstance.delete(`/students/${id}`);
    if (response.data) {
      return response.data?.id;
    }
  },
);
