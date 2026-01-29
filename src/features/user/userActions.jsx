import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const register = createAsyncThunk("user/register", async (userData) => {
  //simulating network delay 2seconds
  // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
  const response = await axiosInstance.post(`/register`, userData);
  console.log(response);
  if (response.data) {
    return response.data;
  }
});
export const login = createAsyncThunk("user/login", async (userData) => {
  //simulating network delay 2seconds
  // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
  const response = await axiosInstance.post(`/login`, userData);
  if (response.data) {
    return response.data;
  }
});
