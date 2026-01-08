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
    dispatch({ type: "delete-course", payload: courseId });
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
        const updatedCourse = {
          ...courseDetails,
        };
        dispatch({ type: "edit-course", payload: updatedCourse });
      } else {
        const newCourse = {
          id: crypto.randomUUID(),
          ...courseDetails,
          // courseTitle: courseDetails?.courseTitle,
          // paidCourse: courseDetails?.paidCourse,
        };
        dispatch({ type: "add-course", payload: newCourse });
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
