import { useState, useRef, useEffect } from "react";
import React from "react";

const ListInput = React.forwardRef(function ListInput(
  { handleAddButton },
  ref
) {
  const [inputValue, setInputValue] = useState("");
  const contactInputRef = useRef();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = () => {
    const contactNumber = contactInputRef.current.value;

    const newStud = {
      id: crypto.randomUUID(),
      name: inputValue,
      contact: contactNumber,
    };
    handleAddButton(newStud);
    setInputValue("");
    contactInputRef.current.value = "";
  };

  return (
    <div className="list-input-section">
      <div className="list-input-container">
        <div className="list-input">
          <input
            ref={ref}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter name..."
          />
          <input
            ref={contactInputRef}
            type={"tel"}
            placeholder="Contact number . . . "
          />
        </div>

        <div className="list-add-button">
          <button type="submit" onClick={handleAddClick}>
            Add
          </button>
        </div>
      </div>

      <div className="list-search">
        <input placeholder="Search . . . " type="text" />
      </div>
    </div>
  );
});

export default ListInput;
