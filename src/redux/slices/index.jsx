import courseReducer from "./courseSlice";
import studentReducer from "../reducers/studentReducer"; 

const appReducer = {
  studentState: studentReducer,
  courseState: courseReducer,
};
export default appReducer;
