import { useState, useRef, useEffect, useCallback } from "react";
import Input from "../components/Input";
import { IoAdd } from "react-icons/io5";
import useAppContext from "../hooks/useAppContext";
import Modal from "../components/Modal";
import RadioButton from "../components/RadioButton";

const ListInput = function ListInput() {
  const nameRef = useRef();

  const { state, dispatch } = useAppContext();

  const [formValues, setFormValues] = useState({
    name: "",
    contact: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [modalOpen, setModalOpen] = useState(false);

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

    setFormValues((prev) => ({ ...prev, [name]: value }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: value ? "" : `${name} is required`,
    }));
  }, []);

  console.log(formValues);

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
              {/* <div>
                <RadioButton
                  name="gender"
                  label={"Gender"}
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                  ]}
                  handleInputChange={handleInputChange}
                />
              </div> */}
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
            </div>
          }
          handleSave={handleSave}
        />
      ) : (
        <div style={{ display: "flex", gap: "5px", alignItems: "start" }}>
          <div style={{ flex: "1" }}>
            <Input
              name={"search"}
              value={state?.search}
              placeholder="Search . . ."
              type="text"
              onChange={handleSearch}
            />
          </div>
          <div>
            <button className="add-button" type="submit" onClick={toggleModal}>
              <IoAdd className="add-icon" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ListInput;
