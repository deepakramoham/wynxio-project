import { createSlice } from "@reduxjs/toolkit";
import {
  getCourseData,
  postCourseData,
  updateCourseData,
  deleteCourseData,
} from "../actions/coursesActions";

const initialState = {
  courses: [],
  loading: false,
  error: null,
  modalOpen: false,
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
  },
  extraReducers: (builder) => {
    // builder.addAsyncThunk(getCourseData, {
    //   pending: (state) => {
    //     state.loading = true;
    //   },
    //   fulfilled: (state, action) => {
    //     console.log(action);
    //     state.courses = action.payload;
    //   },
    //   rejected: (state, action) => {
    //     console.log(action);
    //     state.error = action.payload;
    //     state.loading = false;
    //   },
    // });
    builder
      .addAsyncThunk(getCourseData, {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.courses = action.payload;
          state.loading = false;
          state.error = null;
        },
        rejected: (state, action) => {
          state.error = action.error;
          state.loading = false;
        },
      })
      .addCase(postCourseData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCourseData.fulfilled, (state, action) => {
        state.courses = [...state.courses, action.payload];
        state.loading = false;
        state.error = null;
        state.modalOpen = false;
      })
      .addCase(postCourseData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateCourseData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourseData.fulfilled, (state, action) => {
        state.courses = state?.courses?.map((course) =>
          course?.id === action.payload?.id ? action.payload : course,
        );
        state.loading = false;
        state.error = null;
        state.modalOpen = false;
      })
      .addCase(updateCourseData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteCourseData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourseData.fulfilled, (state, action) => {
        state.courses = state?.courses?.filter(
          (course) => course?.id !== action.payload,
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteCourseData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addDefaultCase((state, action) => {
        return state;
      });
  },
});

export const { openModal, closeModal } = courseSlice.actions;
export default courseSlice.reducer;
