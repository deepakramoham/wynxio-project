import Table from "../components/Table";
import Modal from "../components/Modal";
import Input from "../components/Input/Input";
import RadioButton from "../components/RadioButton";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseData,
  postCourseData,
  updateCourseData,
  deleteCourseData,
} from "../redux/actions/coursesActions";
import Loading from "../components/Loading";
import axiosInstance from "../api/axiosInstance";

const ManageCourses = () => {
  const [courseDetails, setCourseDetails] = useState({
    courseTitle: "",
    paidCourse: "",
  });
  const dispatch = useDispatch();
  const courseState = useSelector((state) => state.courseState);
  const { courses, loading, modalOpen, error } = courseState;
  const [courseArray, setCourseArray] = useState([]);
  // console.log(error, "error");

  useEffect(() => {
    if (!modalOpen) {
      setCourseDetails({
        courseTitle: "",
        paidCourse: "",
      });
    }
  }, [modalOpen]);

  useEffect(() => {
    // dispatch(getCourseData());

    let getController;
    const getCourseData = async () => {
      try {
        if (getController) getController.abort();
        getController = new AbortController();
        dispatch({ type: "GET_COURSE_DATA_REQUEST" });
        //simulating network delay 2seconds
        await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        const response = await axiosInstance.get(`/courses`, {
          signal: getController.signal,
        });
        if (response.data) {
          dispatch({
            type: "GET_COURSE_DATA_SUCCESS",
            payload: response?.data,
          });
        }
      } catch (error) {
        console.error(error.message);
        dispatch({ type: "GET_COURSE_DATA_FAILED", payload: error });
      }
    };

    getCourseData();

    return () => {
      getController.abort();
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(courses)) {
      const modifiedDataArray = courses?.map((course, index) => ({
        slNo: index + 1,
        ...course,
        paidCourse: course?.paidCourse === "no" ? "Free " : "Paid",
        // skills: Array.isArray(student?.skills)
        //   ? student?.skills?.join(", ")
        //   : "",
      }));

      setCourseArray(modifiedDataArray);
    }
  }, [courses]);

  const handleEdit = (courseId) => {
    dispatch({ type: "OPEN_MODAL" });
    setCourseDetails(courses?.find((course) => course?.id === courseId));
  };
  const handleDelete = (courseId) => {
    dispatch(deleteCourseData(courseId));
  };

  const tableColumns = [
    { header: "Sl. No", accessor: "slNo" },
    { header: "Course Title", accessor: "courseTitle" },
    // { header: "Prerequisites", accessor: "prerequisites" },
    { header: "Paid Course", accessor: "paidCourse" },

    {
      header: "Actions",
      render: (course) => {
        return (
          <>
            <div className="d-flex gap-4">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => handleEdit(course?.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger "
                onClick={() => handleDelete(course?.id)}
              >
                Delete
              </button>
            </div>
          </>
        );
      },
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (courseDetails?.courseTitle && courseDetails?.paidCourse) {
      if (courseDetails?.id) {
        dispatch(updateCourseData(courseDetails));
      } else {
        dispatch(postCourseData(courseDetails));
      }
    }
  };

  const handleClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <main className="main">
      {modalOpen && (
        <Modal
          loading={loading}
          modalOpen={modalOpen}
          modalTitle={"Add Course"}
          modalBody={
            <div className="p-4">
              <div style={{ maxWidth: "75%" }}>
                <Input
                  name={"courseTitle"}
                  value={courseDetails?.courseTitle}
                  onChange={handleInputChange}
                  placeholder="Course Title"
                  error={""}
                  label={"Course Title"}
                />
              </div>

              <div style={{ maxWidth: "75%" }}>
                <RadioButton
                  label={"Paid Course"}
                  name="paidCourse"
                  options={[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                  ]}
                  handleInputChange={handleInputChange}
                  selectedValue={courseDetails?.paidCourse || ""}
                />
              </div>
            </div>
          }
          SaveButtonText={loading ? "Saving..." : "Save"}
          CloseButtonText={loading ? "Cancel" : "Close"}
          handleSave={handleSubmit}
          handleClose={handleClose}
        />
      )}
      {loading && <Loading />}
      <Table
        tableColumns={tableColumns}
        data={courseArray}
        onAddClick={() => dispatch({ type: "OPEN_MODAL" })}
      />
    </main>
  );
};

export default ManageCourses;
