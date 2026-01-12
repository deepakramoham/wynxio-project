const initialStudentState = {
  students: [],
  findStudent: null,
};

const studentReducer = (studentState = initialStudentState, action) => {
  switch (action.type) {
    case "get-students": {
      return { ...studentState, students: action.payload };
    }
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

export default studentReducer;
