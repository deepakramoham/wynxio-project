import axiosInstance from "../../api/axiosInstance";

let getController;
let postController;
let updateController;
let deleteController;

export const getCourseData = () => {
  return async (dispatch) => {
    if (getController) getController.abort();
    getController = new AbortController();
    try {
      dispatch({ type: "GET_COURSE_DATA_REQUEST" });
      //simulating network delay 2seconds
      await new Promise((resolve, reject) => setTimeout(resolve, 2000));
      const response = await axiosInstance.get(`/courses`, {
        signal: getController.signal,
      });
      if (response.data) {
        dispatch({ type: "GET_COURSE_DATA_SUCCESS", payload: response?.data });
      }
    } catch (error) {
      console.error(error.message);
      dispatch({ type: "GET_COURSE_DATA_FAILED", payload: error.message });
    }
  };
};

export const postCourseData = (courseData) => {
  return async (dispatch) => {
    if (postController) postController.abort();
    postController = new AbortController();
    try {
      dispatch({ type: "POST_COURSE_DATA_REQUEST" });
      //simulating network delay 2seconds
      await new Promise((resolve, reject) => setTimeout(resolve, 2000));
      const response = await axiosInstance.post(`/courses`, courseData, {
        signal: postController.signal,
      });
      if (response.data) {
        dispatch({ type: "POST_COURSE_DATA_SUCCESS", payload: response?.data });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "POST_COURSE_DATA_FAILED", payload: error.message });
    } finally {
    }
  };
};

export const updateCourseData = (courseData) => {
  return async (dispatch) => {
    try {
      if (updateController) updateController.abort();
      updateController = new AbortController();
      dispatch({ type: "UPDATE_COURSE_DATA_REQUEST" });
      const response = await axiosInstance.put(
        `/courses/${courseData?.id}`,
        courseData,
        { signal: updateController.signal },
      );
      if (response.data) {
        dispatch({
          type: "UPDATE_COURSE_DATA_SUCCESS",
          payload: response?.data,
        });
      }
    } catch (error) {
      dispatch({ type: "UPDATE_COURSE_DATA_FAILED", payload: error.message });
    }
  };
};

export const deleteCourseData = (id) => {
  return async (dispatch) => {
    try {
      if (deleteController) deleteController.abort();
      deleteController = new AbortController();
      dispatch({ type: "DELETE_COURSE_DATA_REQUEST" });
      const response = await axiosInstance.delete(`/courses/${id}`, {
        signal: deleteController.signal,
      });
      if (response.data) {
        dispatch({
          type: "DELETE_COURSE_DATA_SUCCESS",
          payload: response?.data?.id,
        });
      }
    } catch (error) {
      dispatch({ type: "DELETE_COURSE_DATA_FAILED", paload: error.message });
    }
  };
};

export const abortGetCourseData = () => getController?.abort();
export const abortPostCourseData = () => postController?.abort();
export const abortUpdateCourseData = () => updateController?.abort();
export const abortDeleteCourseData = () => deleteController?.abort();
