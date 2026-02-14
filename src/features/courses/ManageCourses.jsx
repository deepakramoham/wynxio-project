import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Input from "../../components/Input/Input";
import RadioButton from "../../components/RadioButton";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseData,
  postCourseData,
  updateCourseData,
  deleteCourseData,
} from "./coursesThunks";
import Loading from "../../components/Loading";
import { closeModal, openModal, resetStatus } from "./courseSlice";
import { toast } from "react-toastify";

const ManageCourses = () => {
  const [courseDetails, setCourseDetails] = useState({
    courseTitle: "",
    paidCourse: "",
  });
  const dispatch = useDispatch();
  const courseState = useSelector((state) => state.courseState);
  const { onload, courses, loading, modalOpen, error, status } = courseState;

  console.log(error);

  // console.log(error, "error");

  useEffect(() => {
    if (error && status === "failed") {
      toast.error(error?.message || "Something went wrong");
      dispatch(resetStatus());
    }
  }, [error]);

  useEffect(() => {
    if (!modalOpen) {
      setTimeout(() =>
        setCourseDetails({
          courseTitle: "",
          paidCourse: "",
        }),
      );
    }
  }, [modalOpen]);

  useEffect(() => {
    if (!onload) {
      dispatch(getCourseData());
    }
    return () => {};
  }, [dispatch, onload]);

  const courseArray = useMemo(() => {
    return courses?.map((course, index) => ({
      slNo: index + 1,
      ...course,
      paidCourse: course?.paidCourse === "no" ? "Free " : "Paid",
      // skills: Array.isArray(student?.skills)
      //   ? student?.skills?.join(", ")
      //   : "",
    }));
  }, [courses]);

  const handleEdit = (courseId) => {
    dispatch(openModal());
    setCourseDetails(courses?.find((course) => course?.id === courseId));
  };
  const handleDelete = (courseId) => {
    if (confirm("Are you sure you want to delete this course data?")) {
      dispatch(deleteCourseData(courseId));
    }
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
    dispatch(closeModal());
  };

  return (
    <>
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
        onAddClick={() => dispatch(openModal())}
      />
    </>
  );
};

export default ManageCourses;
