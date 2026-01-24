import studentReducer from "../features/student/studentSlice";
import courseReducer from "../features/courses/courseSlice";

const appReducer = {
  studentState: studentReducer,
  courseState: courseReducer,
};
export default appReducer;
