import Table from "../components/Table";
import Modal from "../components/Modal";
import Input from "../components/Input/Input";
import RadioButton from "../components/RadioButton";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ManageCourses = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // const [courseTitle, setCourseTitle] = useState("react");
  const [courseDetails, setCourseDetails] = useState({
    courseTitle: "",
    paidCourse: "",
  });
  // const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();
  const courseState = useSelector((state) => state.courseState);
  const { courses } = courseState;
  const [courseArray, setCourseArray] = useState([]);

  useEffect(() => {
    const getCourseData = async () => {
      try {
        const response = await fetch("http://localhost:3500/courses");
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        if (data) {
          dispatch({ type: "add-courses-on-load", payload: data });
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    getCourseData();
  }, []);

  const postCourseData = async (courseData) => {
    const response = await fetch("http://localhost:3500/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });
    console.log(response);
    const result = await response.json();
    dispatch({ type: "add-course", payload: result });
    console.log(result);
  };

  const updateCourseData = async (courseData) => {
    const id = courseData?.id;
    const url = "http://localhost:3500/courses/" + id;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });
    console.log(response);
    const result = await response.json();
    dispatch({ type: "edit-course", payload: result });
    console.log(result);
  };

  const deleteCourseData = async (id) => {
    const response = await fetch(`http://localhost:3500/courses/${id}`, {
      method: "DELETE",
    });
    console.log(response);
    const result = await response.json();
    if (result) {
      dispatch({ type: "delete-course", payload: result?.id });
    }

    console.log(result);
  };

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

  const resetState = () => {
    setCourseDetails({
      courseTitle: "",
      paidCourse: "",
    });
    setModalOpen(!modalOpen);
  };

  const handleEdit = (courseId) => {
    setModalOpen(true);
    setCourseDetails(courses?.find((course) => course?.id === courseId));
  };
  const handleDelete = (courseId) => {
    deleteCourseData(courseId);
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
        updateCourseData(courseDetails);
      } else {
        postCourseData(courseDetails);
      }
      resetState();
    }
  };

  return (
    <main className="main">
      {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
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
          handleSave={handleSubmit}
        />
      )}

      <Table
        tableColumns={tableColumns}
        data={courseArray}
        onAddClick={() => setModalOpen(!modalOpen)}
      />
    </main>
  );
};

export default ManageCourses;
