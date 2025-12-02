import { useState, useRef, useContext, useEffect } from "react";
import Input from "../components/Input";
import { IoAdd } from "react-icons/io5";
import AppContext from "../context/AppContext";

const ListInput = function ListInput() {
  const nameRef = useRef();
  const contactInputRef = useRef();

  const { state, dispatch } = useContext(AppContext);

  const [inputValue, setInputValue] = useState("");
  const [nameError, setNameError] = useState("");
  const [contactError, setContactError] = useState("");

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = () => {
    const contactNumber = contactInputRef.current.value;

    if (contactNumber === "") {
      setContactError("Contact is required");
    }
    if (inputValue === "") {
      setNameError("Name is required");
    }

    if (contactNumber && inputValue) {
      dispatch({
        type: "add",
        payload: {
          id: crypto.randomUUID(),
          name: inputValue,
          contact: contactNumber,
        },
      });
      setInputValue("");
      contactInputRef.current.value = "";
      setContactError("");
      setNameError("");
      nameRef.current.focus();
    }
  };

  const handleSearch = (event) => {
    dispatch({ type: "search", payload: event.target.value });
  };

  return (
    <div className="list-input-section">
      <div className="list-input-container">
        <div className="list-input">
          <Input
            ref={nameRef}
            name={"name"}
            type="text"
            value={inputValue}
            placeholder="Enter name . . ."
            onChange={handleInputChange}
            error={nameError}
            className={"input-box"}
          />
          <Input
            name={"contact"}
            ref={contactInputRef}
            type="tel"
            placeholder="Contact Number . . ."
            error={contactError}
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
