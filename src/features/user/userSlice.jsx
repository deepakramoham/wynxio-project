import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "./userThunks";

const userDetails = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: userDetails || null,
  loading: false,
  error: null,
  submitReference: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetSubmitReference: (state) => {
      state.submitReference = false;
    },
    logOut: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.submitReference = false;
    },
  },
  extraReducers: (builder) => {
    builder.addAsyncThunk(register, {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state) => {
        state.loading = false;
        state.error = null;
        state.submitReference = true;
      },
      rejected: (state, action) => {
        state.error = action.error;
        state.loading = false;
      },
    });
    builder.addAsyncThunk(login, {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.submitReference = true;
      },
      rejected: (state, action) => {
        state.error = action.error;
        state.loading = false;
      },
    });
  },
});

export const { resetSubmitReference, logOut } = userSlice.actions;
export default userSlice.reducer;
