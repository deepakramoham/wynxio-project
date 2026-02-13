import { createSlice } from "@reduxjs/toolkit";
import {
  getStudentDataById,
  getStudentsData,
  postStudentData,
  updateStudentData,
  deleteStudentData,
} from "./studentsThunks";

const initialState = {
  onload: false,
  studentById: null,
  students: [],
  loading: false,
  error: null,
  submitReference: false,
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetSubmitReference: (state) => {
      state.submitReference = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentsData.fulfilled, (state, action) => {
        state.onload = true;
        state.students = action.payload;
        state.loading = false;
        state.error = null;
      })

      .addCase(getStudentDataById.fulfilled, (state, action) => {
        state.studentById = action.payload;
        state.loading = false;
        state.error = null;
      })

      .addCase(postStudentData.fulfilled, (state, action) => {
        state.students = [...state.students, action.payload?.student];
        state.loading = false;
        state.error = null;
        state.submitReference = true;
      })

      .addCase(updateStudentData.fulfilled, (state, action) => {
        state.students = state?.students?.map((std) =>
          std?.id === action.payload?.student?.id
            ? action.payload.student
            : std,
        );
        state.loading = false;
        state.error = null;
        state.submitReference = true;
      })

      .addCase(deleteStudentData.fulfilled, (state, action) => {
        state.students = state?.students?.filter(
          (student) => student?.id !== action.payload,
        );
        state.loading = false;
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.error;
          state.loading = false;
        },
      )
      .addDefaultCase((state) => {
        return state;
      });
  },
});

export const { resetSubmitReference } = studentSlice.actions;
export default studentSlice.reducer;
