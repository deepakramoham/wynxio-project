import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RadioButton from "../../components/RadioButton";
import Checkbox from "../../components/Checkbox";
import Dropdown from "../../components/Dropdown";
import Input from "../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentDataById,
  postStudentData,
  updateStudentData,
} from "./studentsThunks";
import { getCourseData } from "../courses/coursesThunks";
import { resetSubmitReference } from "./studentSlice";

const Add_Update_Students = () => {
  const nameRef = useRef(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const studentState = useSelector((state) => state.studentState);
  const courseState = useSelector((state) => state.courseState);

  const { studentById, submitReference } = studentState || {};
  const { onload, courses } = courseState || [];

  const id = searchParams.get("id");
  const action = searchParams.get("action");

  const [formValues, setFormValues] = useState({
    name: "",
    contact: "",
    education: "",
    timeSlots: [],
    course: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const goBack = useCallback(() => {
    navigate(-1);
    setFormErrors({});
    setFormValues({
      name: "",
      contact: "",
      education: "",
      timeSlots: [],
      course: "",
    });
  }, [navigate]);

  // const resetStates = () => {
  //   setFormErrors({});
  //   setFormValues({
  //     name: "",
  //     contact: "",
  //     education: "",
  //     timeSlots: [],
  //     course: "",
  //   });
  // };

  useEffect(() => {
    if (!onload) {
      dispatch(getCourseData());
    }
  }, [dispatch, onload]);

  useEffect(() => {
    if (id && action === "edit") {
      dispatch(getStudentDataById(id));
    }
  }, [id, action, dispatch]);

  useEffect(() => {
    if (action === "edit") {
      const updateStudent = { ...studentById, course: studentById?.course?.id };
      if (updateStudent) {
        setTimeout(() => setFormValues(updateStudent));
      }
    }
  }, [studentById, action]);

  useEffect(() => {
    if (submitReference) {
      setTimeout(() => goBack());

      dispatch(resetSubmitReference());
    }
  }, [submitReference, dispatch, goBack]);

  const courseOptions = useMemo(() => {
    return courses?.map((course) => ({
      label: course?.courseTitle,
      value: course?.id,
    }));
  }, [courses]);

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
        dispatch(updateStudentData(formValues));
      } else {
        dispatch(postStudentData(formValues));
      }
    }
  };
  return (
    <>
      <div
        style={{
          padding: ".5em",
        }}
      >
        <div style={{ maxWidth: "75%" }}>
          <Input
            ref={nameRef}
            name={"name"}
            type="text"
            value={formValues?.name || ""}
            placeholder="Enter name . . ."
            onChange={handleInputChange}
            error={formErrors?.name}
            className={""}
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
            name={"timeSlots"}
            handleInputChange={handleInputChange}
            label={"Preferred Time Slots and Mode"}
            options={[
              { label: "Morning", value: "morning" },
              { label: "Afternoon", value: "afternoon" },
              { label: "Evening", value: "evening" },
              { label: "Weekend", value: "weekend" },
            ]}
            selectedValues={formValues?.timeSlots || []}
          />
        </div>
        <div style={{ maxWidth: "75%", marginTop: "18px" }}>
          <Dropdown
            name={"course"}
            label={"Course"}
            selectedValue={formValues?.course || ""}
            handleInputChange={handleInputChange}
            options={courseOptions}
          />
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            marginTop: "20px",
          }}
        >
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
    </>
  );
};

export default Add_Update_Students;
