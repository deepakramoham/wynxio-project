import axios from "axios";

const baseUrl = "http://localhost:3500";

export const getCourseData = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_COURSE_DATA_REQUEST" });
      //simulating network delay 2seconds
      // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
      const response = await axios.get(`${baseUrl}/courses`);
      if (response.data) {
        dispatch({ type: "GET_COURSE_DATA_SUCCESS", payload: response?.data });
      }
    } catch (error) {
      console.error(error.message);
      dispatch({ type: "GET_COURSE_DATA_FAILED", payload: error });
    }
  };
};

export const postCourseData = (courseData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "POST_COURSE_DATA_REQUEST" });
      //simulating network delay 2seconds
      // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
      const response = await axios.post(`${baseUrl}/courses`, courseData);
      if (response.data) {
        dispatch({ type: "POST_COURSE_DATA_SUCCESS", payload: response?.data });
      }
    } catch (error) {
      dispatch({ type: "POST_COURSE_DATA_FAILED", payload: error });
    }
  };
};

export const updateCourseData = (courseData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "UPDATE_COURSE_DATA_REQUEST" });
      const response = await axios.put(
        `${baseUrl}/courses/${courseData?.id}`,
        courseData
      );
      if (response.data) {
        dispatch({
          type: "UPDATE_COURSE_DATA_SUCCESS",
          payload: response?.data,
        });
      }
    } catch (error) {
      dispatch({ type: "UPDATE_COURSE_DATA_FAILED", payload: error });
    }
  };
};

export const deleteCourseData = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "DELETE_COURSE_DATA_REQUEST" });
      const response = await axios.delete(`${baseUrl}/courses/${id}`);
      if (response.data) {
        dispatch({
          type: "DELETE_COURSE_DATA_SUCCESS",
          payload: response?.data?.id,
        });
      }
    } catch (error) {
      dispatch({ type: "DELETE_COURSE_DATA_FAILED", paload: error });
    }
  };
};
