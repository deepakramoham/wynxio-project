import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import RadioButton from "../components/RadioButton";
import Checkbox from "../components/Checkbox";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input/Input";

const Add_Update_Students = () => {
  const nameRef = useRef();
  const navigate = useNavigate();

  const { dispatch } = useAppContext();

  const [formValues, setFormValues] = useState({
    name: "",
    contact: "",
    education: "",
    skills: [],
    course: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const goBack = () => {
    navigate(-1);
  };

  const resetStates = () => {
    setFormErrors({});
    setFormValues({
      name: "",
      contact: "",
    });
  };

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

  const handleCancel = () => {
    goBack();
  };

  const handleSave = () => {
    if (validateFormValues()) {
      if (formValues?.id) {
        dispatch({ type: "edit", payload: formValues });
      } else {
        const newStudent = { ...formValues, id: crypto.randomUUID() };
        dispatch({
          type: "add",
          payload: newStudent,
        });
      }
      resetStates();
      goBack();
    }
  };
  return (
    <main className="main">
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

        <div className={""}>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Add_Update_Students;
