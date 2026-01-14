import studentReducer from "./studentReducer";
import courseReducer from "./courseReducer";

const appReducer = {
  studentState: studentReducer,
  courseState: courseReducer,
};
export default appReducer;
