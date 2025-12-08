import { useState, useRef, useEffect, useCallback } from "react";
import Input from "../components/Input";
import { IoAdd } from "react-icons/io5";
import useAppContext from "../hooks/useAppContext";

const ListInput = function ListInput() {
  const nameRef = useRef();

  const { state, dispatch } = useAppContext();

  const [formValues, setFormValues] = useState({
    name: "",
    contact: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  const handleSearch = useCallback((event) => {
    dispatch({ type: "search", payload: event.target.value });
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateFormValues = () => {
    const errors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key]) {
        errors[key] = `${key}  is required`;
      }
    });
    setFormErrors(errors);

    // if (Object.keys(errors).length === 0) {
    //   return true;
    // } else {
    //   return false;
    // }

    return Object.keys(errors).length === 0;
  };

  const resetStates = () => {
    setFormErrors({});
    setFormValues({
      name: "",
      contact: "",
    });
  };

  const handleAddClick = () => {
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
    <div className="list-input-section">
      <div className="list-input-container">
        <div className="list-input">
          <Input
            ref={nameRef}
            name={"name"}
            type="text"
            value={formValues?.name || ""}
            placeholder="Enter name . . ."
            onChange={handleInputChange}
            error={!formValues?.name && formErrors?.name}
            className={"input-box"}
          />
          <Input
            name={"contact"}
            value={formValues?.contact || ""}
            type="tel"
            onChange={handleInputChange}
            placeholder="Contact Number . . ."
            error={!formValues?.contact && formErrors?.contact}
          />
        </div>

        <div className="list-add-button">
          <button className="add-button" type="submit" onClick={handleAddClick}>
            <IoAdd className="add-icon" />
          </button>
        </div>
      </div>

      <div className="list-search">
        <Input
          name={"search"}
          value={state?.search}
          placeholder="Search . . ."
          type="text"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default ListInput;
