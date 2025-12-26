import { createContext } from "react";
import { useReducer } from "react";

const AppContext = createContext();

const initialStudentState = {
  students: [
    {
      id: "jsh",
      name: "Jinshi",
      contact: "123",
      education: "non-tech",
      skills: ["html", "css"],
      course: "react",
    },
    {
      id: "uma",
      name: "Uma",
      contact: "1234",
      education: "tech",
      skills: ["html", "css", "javascript"],
      course: "mern",
    },
    {
      id: "dpk",
      name: "Deepak",
      contact: "12345",
      education: "non-tech",
      skills: ["html"],
      course: "python",
    },
  ],
  findStudent: null,
};

const initialCourseState = {
  courses: [],
};

const studentReducer = (studentState, action) => {
  switch (action.type) {
    case "add":
      return {
        ...studentState,
        students: [...studentState.students, action.payload],
      };

    case "edit":
      return {
        ...studentState,
        students: studentState.students?.map((student) =>
          student?.id === action.payload?.id ? action.payload : student
        ),
      };

    case "delete":
      return {
        ...studentState,
        students: studentState?.students?.filter(
          (student) => student?.id !== action.payload
        ),
      };
    case "find":
      console.log(action);
      return {
        ...studentState,
        findStudent: studentState?.students?.find(
          (student) => student?.id === action.payload
        ),
      };

    default:
      return studentState;
  }
};

const courseReducer = (courseState, action) => {
  switch (action.type) {
    case "add-course":
      return {
        ...courseState,
        courses: [...courseState?.courses, action.payload],
      };

    case "edit-course":
      const { payload } = action;
      return {
        ...courseState,
        courses: courseState?.courses?.map((course) =>
          course?.id === payload?.id ? payload : course
        ),
      };

    case "delete-course":
      return {
        ...courseState,
        courses: courseState?.courses?.filter(
          (course) => course?.id !== action.payload
        ),
      };

    default:
      return courseState;
  }
};

export const AppProvider = ({ children }) => {
  const [studentState, dispatchStudent] = useReducer(
    studentReducer,
    initialStudentState
  );
  const [courseState, dispatchCourse] = useReducer(
    courseReducer,
    initialCourseState
  );

  return (
    <AppContext.Provider
      value={{
        studentState,
        dispatchStudent,
        courseState,
        dispatchCourse,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
