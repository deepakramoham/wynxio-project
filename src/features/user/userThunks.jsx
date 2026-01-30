import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerApi,loginApi } from "./userApis";

export const register = createAsyncThunk("user/register", async (userData) => {
  //simulating network delay 2seconds
  // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
  const response = await registerApi(userData);
  console.log(response);
  if (response.data) {
    return response.data;
  }
});
export const login = createAsyncThunk("user/login", async (userData) => {
  //simulating network delay 2seconds
  // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
  const response = await loginApi(userData);
  const user = response?.data;
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
});
