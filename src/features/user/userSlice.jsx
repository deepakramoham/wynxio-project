import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "./userActions";

const initialState = {
  user: null,
  accessToken: null,
  role: null,
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
  },
  extraReducers: (builder) => {
    builder.addAsyncThunk(register, {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, action) => {
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

export const { resetSubmitReference } = userSlice.actions;
export default userSlice.reducer;
