import { createContext } from "react";
import { useReducer } from "react";

const AppContext = createContext();

const initialState = {
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
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        students: [...state.students, action.payload],
      };

    case "delete":
      return {
        ...state,
        students: state?.students?.filter(
          (student) => student?.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
