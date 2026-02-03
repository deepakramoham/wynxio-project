import { useState, useEffect } from "react";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudentData, getStudentsData } from "./studentsThunks";

const ManageStudents = function ListInput() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const studentState = useSelector((state) => state.studentState);

  const { students, onload } = studentState;

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!onload) {
      dispatch(getStudentsData());
    }
  }, [dispatch, onload]);

  const tableColumns = [
    { header: "Sl. No", accessor: "slNo" },
    { header: "Full Name", accessor: "name" },
    { header: "Contact", accessor: "contact" },
    { header: "Education", accessor: "education" },
    { header: "Preferred Time Slots", accessor: "timeSlots" },
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
        timeSlots: Array.isArray(student?.timeSlots)
          ? student?.timeSlots?.join(", ")
          : "",
        course: student?.course?.courseTitle,
      }));

      setTableData(modifiedDataArray);
    }
  }, [students]);

  const handleEdit = (studentId) => {
    navigate(`/app/admin/students/edit-student?id=${studentId}&action=edit`);
  };

  const handleDelete = (studentId) => {
    if (confirm("Are you sure your want to delete this student data ?")) {
      dispatch(deleteStudentData(studentId));
    }
  };

  const handleAddClick = () => {
    navigate(`/app/admin/students/add-student`);
  };

  return (
    <div className="p-2 ">
      <Table
        tableColumns={tableColumns}
        data={tableData}
        onAddClick={handleAddClick}
      />
    </div>
  );
};

export default ManageStudents;
