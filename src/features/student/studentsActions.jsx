import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getStudentDataById = createAsyncThunk(
  "student/getStudentsDataById",
  async (id) => {
    //simulating network delay 2seconds
    // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const response = await axiosInstance.get(`/students/${id}`);
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
    const response = await axiosInstance.get(`/students`, {
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6IjY5NzRkMTIwMzBlYjI3YmQ4MjIxYzE1OCIsInJvbGVzIjoxMDAwfSwiaWF0IjoxNzY5MjYzNDUzLCJleHAiOjE3NjkyNjUyNTN9.9mkWv4LoTIn6OYSMidmEfzErg_ZEkVrm8O1Hyd6J5XA"}`,
      },
    });
    console.log(response);
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
    const response = await axiosInstance.post(`/students`, studentData);
    if (response.data) {
      return response.data;
    }
  },
);

export const updateStudentData = createAsyncThunk(
  "student/updateStudentData",
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
  "student/deleteStudentData",
  async (id) => {
    const response = await axiosInstance.delete(`/students/${id}`);

    if (response.status === 200) {
      return id;
    }
  },
);
