import courseReducer from "./courseSlice";
import studentReducer from "./studentSlice";

const appReducer = {
  studentState: studentReducer,
  courseState: courseReducer,
};
export default appReducer;
