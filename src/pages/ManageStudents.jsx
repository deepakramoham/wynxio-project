import { useState, useEffect } from "react";
import useAppContext from "../hooks/useAppContext";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";

// import Modal from "../components/Modal";
// import RadioButton from "../components/RadioButton";
// import Checkbox from "../components/Checkbox";
// import Dropdown from "../components/Dropdown";
// import Input from "../components/Input/Input";

const ManageStudents = function ListInput() {
  // const nameRef = useRef();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { students } = state;
  const [tableData, setTableData] = useState([]);

  // const [formValues, setFormValues] = useState({
  //   name: "",
  //   contact: "",
  //   education: "",
  //   skills: [],
  //   course: "",
  // });

  // const [formErrors, setFormErrors] = useState({});

  // const [modalOpen, setModalOpen] = useState(false);

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

  // const handleInputChange = useCallback((e) => {
  //   const { name, value, type, checked } = e.target;
  //   if (type === "checkbox") {
  //     if (checked) {
  //       setFormValues((prev) => ({
  //         ...prev,
  //         [name]: [...prev[name], value],
  //       }));
  //     } else {
  //       setFormValues((prev) => ({
  //         ...prev,
  //         [name]: prev[name]?.filter((v) => v !== value),
  //       }));
  //     }
  //   } else {
  //     setFormValues((prev) => ({ ...prev, [name]: value }));
  //     setFormErrors((prev) => ({
  //       ...prev,
  //       [name]: value ? "" : `${name} is required`,
  //     }));
  //   }
  // }, []);

  // const validateFormValues = () => {
  //   const errors = {};
  //   Object.keys(formValues).forEach((key) => {
  //     if (!formValues[key]) {
  //       errors[key] = `${key}  is required`;
  //     }
  //   });
  //   setFormErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };

  // const toggleModal = () => {
  //   setModalOpen(!modalOpen);
  //   setFormValues({
  //     name: "",
  //     contact: "",
  //     education: "",
  //     skills: [],
  //     course: "",
  //   });
  //   setFormErrors({});
  // };

  // const resetStates = () => {
  //   setFormErrors({});
  //   setFormValues({
  //     name: "",
  //     contact: "",
  //   });
  //   toggleModal();
  // };

  // const handleSave = () => {
  //   if (validateFormValues()) {
  //     if (formValues?.id) {
  //       dispatch({ type: "edit", payload: formValues });
  //     } else {
  //       const newStudent = { ...formValues, id: crypto.randomUUID() };
  //       dispatch({
  //         type: "add",
  //         payload: newStudent,
  //       });
  //     }
  //     resetStates();
  //   }
  // };

  const handleEdit = (studentId) => {
    navigate("/students/edit-student");
    // setModalOpen(true);
    // const updateStudent = students?.find((std) => std?.id === studentId);
    // setFormValues(updateStudent)
    // setFormValues(students?.find((std) => std?.id === studentId));
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
      {/* {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          setModalOpen={toggleModal}
          modalTitle={formValues?.id ? "Edit Student" : "Add Student"}
          modalBody={
            <div style={{ padding: ".5em" }}>
              <div style={{ maxWidth: "75%" }}>
                <Input
                  ref={nameRef}
                  name={"name"}
                  type="text"
                  value={formValues?.name || ""}
                  placeholder="Enter name . . ."
                  onChange={handleInputChange}
                  error={formErrors?.name}
                  className={"input-box"}
                  label={"Full Name"}
                />
              </div>
              <div style={{ maxWidth: "75%" }}>
                <Input
                  name={"contact"}
                  value={formValues?.contact || ""}
                  type="tel"
                  onChange={handleInputChange}
                  placeholder="Contact Number . . ."
                  error={formErrors?.contact}
                  label={"Contact"}
                />
              </div>
              <div style={{ maxWidth: "75%" }}>
                <RadioButton
                  label={"Education"}
                  name="education"
                  options={[
                    { label: "Tech", value: "tech" },
                    { label: "Non-Tech", value: "non-tech" },
                  ]}
                  handleInputChange={handleInputChange}
                  selectedValue={formValues?.education || ""}
                />
              </div>

              <div style={{ maxWidth: "75%", marginTop: "18px" }}>
                <Checkbox
                  name={"skills"}
                  handleInputChange={handleInputChange}
                  label={"Skills familar with"}
                  options={[
                    { label: "HTML", value: "html" },
                    { label: "CSS", value: "css" },
                    { label: "Javascript", value: "javascript" },
                  ]}
                  selectedValues={formValues?.skills || []}
                />
              </div>
              <div style={{ maxWidth: "75%", marginTop: "18px" }}>
                <Dropdown
                  name={"course"}
                  label={"Course"}
                  selectedValue={formValues?.course || ""}
                  handleInputChange={handleInputChange}
                  options={[
                    { label: "React", value: "react" },
                    { label: "MERN", value: "mern" },
                    { label: "Python", value: "python" },
                  ]}
                />
              </div>
            </div>
          }
          handleSave={handleSave}

        />
      )} */}

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
