import { createSlice } from "@reduxjs/toolkit";
import {
  getCourseData,
  postCourseData,
  updateCourseData,
  deleteCourseData,
} from "./coursesThunks";

const initialState = {
  onload: false,
  courses: [],
  loading: false,
  error: null,
  modalOpen: false,
  status: "idle", // idle, pending, success, failed
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    openModal: (state) => {
      state.modalOpen = true;
    },
    closeModal: (state) => {
      state.modalOpen = false;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addAsyncThunk(getCourseData, {
        pending: (state) => {
          state.loading = true;
          state.error = null;
          state.status = "pending";
        },
        fulfilled: (state, action) => {
          state.courses = action.payload;
          state.onload = true;
          state.loading = false;
          state.error = null;
          state.status = "success";
        },
        rejected: (state, action) => {
          state.error = action.error;
          state.loading = false;
          state.status = "failed";
        },
      })
      .addCase(postCourseData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(postCourseData.fulfilled, (state, action) => {
        state.courses = [...state.courses, action.payload];
        state.loading = false;
        state.error = null;
        state.modalOpen = false;
        state.status = "success";
      })
      .addCase(postCourseData.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.status = "failed";
      })
      .addCase(updateCourseData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(updateCourseData.fulfilled, (state, action) => {
        state.courses = state?.courses?.map((course) =>
          course?.id === action.payload?.id ? action.payload : course,
        );
        state.loading = false;
        state.error = null;
        state.modalOpen = false;
        state.status = "success";
      })
      .addCase(updateCourseData.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.status = "failed";
      })
      .addCase(deleteCourseData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(deleteCourseData.fulfilled, (state, action) => {
        state.courses = state?.courses?.filter(
          (course) => course?.id !== action.payload,
        );
        state.loading = false;
        state.error = null;
        state.status = "success";
      })
      .addCase(deleteCourseData.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.status = "failed";
      })
      .addDefaultCase((state) => {
        return state;
      });
  },
});

export const { openModal, closeModal, resetStatus } = courseSlice.actions;
export default courseSlice.reducer;
