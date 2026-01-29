import studentReducer from "../features/student/studentSlice";
import courseReducer from "../features/courses/courseSlice";
import userReducer from "../features/user/userSlice"

const appReducer = {
  studentState: studentReducer,
  courseState: courseReducer,
  userState:userReducer,
};
export default appReducer;
