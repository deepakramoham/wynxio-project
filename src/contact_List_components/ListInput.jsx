import { useState, useRef, useEffect, useCallback } from "react";
import Input from "../components/Input";
import { IoAdd } from "react-icons/io5";
import useAppContext from "../hooks/useAppContext";
import Modal from "../components/Modal";
import RadioButton from "../components/RadioButton";
import Checkbox from "../components/Checkbox";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";

const ListInput = function ListInput() {
  const nameRef = useRef();

  const { state, dispatch } = useAppContext();

  const [formValues, setFormValues] = useState({
    name: "",
    contact: "",
    education: "",
    skills: [],
  });

  const [formErrors, setFormErrors] = useState({});

  const [modalOpen, setModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  const handleSearch = useCallback((event) => {
    dispatch({ type: "search", payload: event.target.value });
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setFormValues((prev) => ({
          ...prev,
          [name]: [...prev[name], value],
        }));
      } else {
        setFormValues((prev) => ({
          ...prev,
          [name]: prev[name]?.filter((v) => v !== value),
        }));
      }
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
      setFormErrors((prev) => ({
        ...prev,
        [name]: value ? "" : `${name} is required`,
      }));
    }
  }, []);

  const validateFormValues = () => {
    const errors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key]) {
        errors[key] = `${key}  is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const resetStates = () => {
    setFormErrors({});
    setFormValues({
      name: "",
      contact: "",
    });
    toggleModal();
  };

  const handleSave = () => {
    if (validateFormValues()) {
      dispatch({
        type: "add",
        payload: { ...formValues, id: crypto.randomUUID() },
      });
      resetStates();
      nameRef.current.focus();
    }
  };

  console.log(formValues);

  const tableColumns = [
    { header: "Sl. No", accessor: "slNo" },
    { header: "Full Name", accessor: "name" },
    { header: "Contact", accessor: "contact" },
    { header: "Education", accessor: "education" },
    { header: "Familiar tech stacks", accessor: "skills" },
    { header: "Course", accessor: "course" },
  ];

  const data = [
    {
      name: "Jinshi",
      contact: "123",
      education: "non-tech",
      skills: ["html", "css"],
      course: "react",
    },
    {
      name: "Uma",
      contact: "1234",
      education: "tech",
      skills: ["html", "css", "javascript"],
      course: "mern",
    },
    {
      name: "Deepak",
      contact: "12345",
      education: "non-tech",
      skills: ["html"],
      course: "python",
    },
  ];

  useEffect(() => {
    if (Array.isArray(data)) {
      const modifiedDataArray = data?.map((item, index) => ({
        slNo: index + 1,
        ...item,
      }));

      setTableData(modifiedDataArray);
    }
  });
  [data];
  return (
    <>
      {modalOpen ? (
        <Modal
          modalOpen={modalOpen}
          setModalOpen={toggleModal}
          modalTitle={"Manage Student"}
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
                />
              </div>
              <div style={{ maxWidth: "75%", marginTop: "18px" }}>
                <Dropdown
                  name={"course"}
                  label={"Course"}
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
      ) : (
        <>
          <div style={{ display: "flex", gap: "5px", alignItems: "start" }}>
            <div style={{ flex: "1" }}>
              <Input
                name={"search"}
                value={state?.search}
                placeholder="Search . . ."
                type="text"
                onChange={handleSearch}
                style={{ maxWidth: "350px" }}
              />
            </div>
            <div>
              <button
                className="add-button"
                type="submit"
                onClick={toggleModal}
              >
                <IoAdd className="add-icon" />
              </button>
            </div>
          </div>
          <div>
            <Table tableColumns={tableColumns} data={tableData} />
          </div>
        </>
      )}
    </>
  );
};

export default ListInput;
