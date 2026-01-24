import { createSlice } from "@reduxjs/toolkit";
import {
  getStudentDataById,
  getStudentsData,
  postStudentData,
  updateStudentData,
  deleteStudentData,
} from "./studentsActions";

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
      .addCase(getStudentsData.fulfilled, (state, action) => {
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
        // state.students = [...state.students, action.payload];
        state.loading = false;
        state.error = null;
      })

      .addCase(updateStudentData.fulfilled, (state, action) => {
        state.students = state?.students?.map((std) =>
          std?.id === action.payload?.id ? action.payload : std,
        );
        state.loading = false;
        state.error = null;
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
      .addDefaultCase((state, action) => {
        return state;
      });
  },
});

// export const {} = studentSlice.actions;
export default studentSlice.reducer;
