import { createSlice } from "@reduxjs/toolkit";
import {
  getStudentDataById,
  getStudentsData,
  postStudentData,
  updateStudentData,
  deleteStudentData,
} from "../actions/studentsActions";

const initialState = {
  studentById: null,
  students: [],
  loading: false,
  error: null,
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentsData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentsData.fulfilled, (state, action) => {
        state.students = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getStudentsData.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(getStudentDataById.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentDataById.fulfilled, (state, action) => {
        state.studentById = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getStudentDataById.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(postStudentData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postStudentData.fulfilled, (state, action) => {
        state.students = [...state.students, action.payload];
        state.loading = false;
        state.error = null;
      })
      .addCase(postStudentData.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(updateStudentData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudentData.fulfilled, (state, action) => {
        state.students = state?.students?.map((std) =>
          std?.id === action.payload?.id ? action.payload : course,
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(updateStudentData.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(deleteStudentData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudentData.fulfilled, (state, action) => {
        state.students = state?.students?.filter(
          (course) => course?.id !== action.payload,
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteStudentData.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addDefaultCase((state, action) => {
        return state;
      });
  },
});

// export const {} = studentSlice.actions;
export default studentSlice.reducer;
