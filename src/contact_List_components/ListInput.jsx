import { useState, useRef, useEffect } from "react";
import React from "react";
import Input from "../components/Input";
import { IoAdd } from "react-icons/io5";

const ListInput = React.forwardRef(function ListInput(
  { handleAddButton, searchValue, setSearchValue },
  ref
) {
  const [inputValue, setInputValue] = useState("");

  const [nameError, setNameError] = useState("");
  const [contactError, setContactError] = useState("");
  const contactInputRef = useRef();

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
      const newStud = {
        id: crypto.randomUUID(),
        name: inputValue,
        contact: contactNumber,
      };
      handleAddButton(newStud);
      setInputValue("");
      contactInputRef.current.value = "";
      setContactError("");
      setNameError("");
    }
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="list-input-section">
      <div className="list-input-container">
        <div className="list-input">
          <div>
            <Input
              ref={ref}
              name={"name"}
              type="text"
              value={inputValue}
              defaultValue="abcde"
              placeholder="Enter name . . ."
              onChange={handleInputChange}
              error={nameError}
              className={"input-box"}
            />
          </div>
          <div>
            <Input
              name={"contact"}
              ref={contactInputRef}
              type="tel"
              placeholder="Enter name . . ."
              error={contactError}
            />
          </div>
        </div>

        <div className="list-add-button">
          <button
            style={{
              border: "none",
              backgroundColor: "#0e6a0e",
              borderRadius: ".25em",
              padding: ".25em 1.5em .25em 1.5em",
            }}
            type="submit"
            onClick={handleAddClick}
          >
            <IoAdd
              style={{
                fontSize: "1.85rem",
                color: "white",
              }}
            />
          </button>
        </div>
      </div>

      <div className="list-search">
        <Input
          name={"search"}
          value={searchValue}
          placeholder="Search . . ."
          type="text"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
});

export default ListInput;
