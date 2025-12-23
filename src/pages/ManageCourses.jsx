import Table from "../components/Table";
import Modal from "../components/Modal";
import Input from "../components/Input/Input";
import { useState, useEffect } from "react";

const ManageCourses = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [courseTitle, setCourseTitle] = useState("react");
  const [courses, setCourses] = useState([]);
  const [courseArray, setCourseArray] = useState([]);

  useEffect(() => {
    if (Array.isArray(courses)) {
      const modifiedDataArray = courses?.map((course, index) => ({
        slNo: index + 1,
        ...course,
        // skills: Array.isArray(student?.skills)
        //   ? student?.skills?.join(", ")
        //   : "",
      }));

      setCourseArray(modifiedDataArray);
    }
  }, [courses]);

  const handleEdit = (courseId) => {};
  const handleDelete = (courseId) => {};

  const tableColumns = [
    { header: "Sl. No", accessor: "slNo" },
    { header: "Course Title", accessor: "courseTitle" },
    { header: "Prerequisites", accessor: "prerequisites" },

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
    setCourseTitle(e.target.value);
  };

  const handleSubmit = () => {
    if (courseTitle) {
      const newCourse = { courseTitle: courseTitle };
      setCourses((prev) => [...prev, newCourse]);
      setCourseTitle("");
      setModalOpen(!modalOpen);
    }
  };

  console.log(courses);

  return (
    <main className="main">
      {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          modalTitle={"Add Course"}
          modalBody={
            <div className="p-4">
              <Input
                name={"courseTitle"}
                value={courseTitle}
                onChange={handleInputChange}
                placeholder="Course Title"
                error={""}
                label={"Course Title"}
              />
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
