import { useState, useEffect } from "react";
import useAppContext from "../hooks/useAppContext";
import Table from "../components/Table";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const ManageStudents = function ListInput() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({});

  const { state, dispatch } = useAppContext();
  const { students, findStudent } = state;
  const [tableData, setTableData] = useState([]);

  const tableColumns = [
    { header: "Sl. No", accessor: "slNo" },
    { header: "Full Name", accessor: "name" },
    { header: "Contact", accessor: "contact" },
    { header: "Education", accessor: "education" },
    { header: "Familiar tech stacks", accessor: "skills" },
    { header: "Course", accessor: "course" },
    {
      header: "Actions",
      render: (student) => {
        return (
          <>
            <div className="d-flex gap-4">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => handleEdit(student?.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger "
                onClick={() => handleDelete(student?.id)}
              >
                Delete
              </button>
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (Array.isArray(students)) {
      const modifiedDataArray = students?.map((student, index) => ({
        slNo: index + 1,
        ...student,
        skills: Array.isArray(student?.skills)
          ? student?.skills?.join(", ")
          : "",
      }));

      setTableData(modifiedDataArray);
    }
  }, [students]);

  useEffect(() => {
    if (findStudent) {
      setSearchParams({
        id: findStudent?.id,
        name: findStudent?.name,
        contact: findStudent?.contact,
        education: findStudent?.education,
        course: findStudent?.course,
        skills: findStudent?.skills.toString(),
      });

      console.log(findStudent?.skills.toString())
    }
  }, [findStudent]);

  const handleEdit = (studentId) => {
    // navigate(`/students/edit-student/${studentId}`);

    dispatch({ type: "find", payload: studentId });
  };

  const handleDelete = (studentId) => {
    dispatch({
      type: "delete",
      payload: studentId,
    });
  };

  const handleAddClick = () => {
    navigate("/students/add-student");
  };

  return (
    <main className="main">
      <div className="p-2 ">
        <Table
          tableColumns={tableColumns}
          data={tableData}
          onAddClick={handleAddClick}
        />
      </div>
    </main>
  );
};

export default ManageStudents;
