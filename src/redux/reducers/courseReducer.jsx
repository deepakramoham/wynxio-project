const initialCourseState = {
  courses: [],
  loading: false,
  error: null,
  modalOpen: false,
};

const courseReducer = (courseState = initialCourseState, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...courseState,
        modalOpen: true,
      };
    case "CLOSE_MODAL":
      return {
        ...courseState,
        modalOpen: false,
      };
    case "GET_COURSE_DATA_REQUEST":
      return {
        ...courseState,
        loading: true,
      };
    case "GET_COURSE_DATA_SUCCESS":
      return {
        ...courseState,
        courses: action.payload,
        loading: false,
        error: null,
      };
    case "GET_COURSE_DATA_FAILED":
      return {
        ...courseState,
        courses: [],
        loading: false,
        error: action.payload,
      };
    case "POST_COURSE_DATA_REQUEST":
      return {
        ...courseState,
        loading: true,
        error: null,
      };
    case "POST_COURSE_DATA_SUCCESS":
      return {
        ...courseState,
        courses: [...courseState?.courses, action.payload],
        loading: false,
        modalOpen: false,
      };
    case "POST_COURSE_DATA_FAILED":
      return {
        ...courseState,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_COURSE_DATA_REQUEST":
      return {
        ...courseState,
        loading: true,
        error: null,
      };
    case "UPDATE_COURSE_DATA_SUCCESS":
      return {
        ...courseState,
        courses: courseState?.courses?.map((course) =>
          course?.id === action.payload?.id ? action.payload : course
        ),
        loading: false,
        modalOpen: false,
      };
    case "UPDATE_COURSE_DATA_FAILED":
      return {
        ...courseState,
        loading: false,
        error: action.payload,
      };
    case "DELETE_COURSE_DATA_REQUEST":
      return {
        ...courseState,
        loading: true,
        error: null,
      };
    case "DELETE_COURSE_DATA_SUCCESS":
      return {
        ...courseState,
        courses: courseState?.courses?.filter(
          (course) => course?.id !== action.payload
        ),
        loading: false,
      };
    case "DELETE_COURSE_DATA_FAILED":
      return {
        ...courseState,
        loading: false,
        error: action.payload,
      };

    default:
      return courseState;
  }
};

export default courseReducer;
