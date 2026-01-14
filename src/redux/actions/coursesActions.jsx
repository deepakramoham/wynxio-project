export const getCourseData = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_COURSE_DATA_REQUEST" });

      //simulating network delay 2seconds
      // await new Promise((resolve, reject) => setTimeout(resolve, 2000));

      const response = await fetch("http://localhost:3500/courses");
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      if (data) {
        dispatch({ type: "GET_COURSE_DATA_SUCCESS", payload: data });
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
      const response = await fetch("http://localhost:3500/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) {
        throw new Error("Post request failed");
      }
      const result = await response.json();
      dispatch({ type: "POST_COURSE_DATA_SUCCESS", payload: result });
      
    } catch (error) {
      dispatch({ type: "POST_COURSE_DATA_FAILED", payload: error });
    }
  };
};

export const updateCourseData = (courseData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "UPDATE_COURSE_DATA_REQUEST" });
      const id = courseData?.id;
      const url = "http://localhost:3500/courses/" + id;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) {
        throw new Error("Failed to update");
      }
      const result = await response.json();
      dispatch({ type: "UPDATE_COURSE_DATA_SUCCESS", payload: result });
    } catch (error) {
      dispatch({ type: "UPDATE_COURSE_DATA_FAILED", payload: error });
    }
  };
};

export const deleteCourseData = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "DELETE_COURSE_DATA_REQUEST" });
      const response = await fetch(`http://localhost:3500/courses/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result) {
        dispatch({ type: "DELETE_COURSE_DATA_SUCCESS", payload: result?.id });
      }
    } catch (error) {
      dispatch({ type: "DELETE_COURSE_DATA_FAILED", paload: error });
    }
  };
};
