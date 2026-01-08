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

const studentReducer = (studentState = initialStudentState, action) => {
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

export default studentReducer;
