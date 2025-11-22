import { useState, useRef, useEffect } from "react";

function ListInput({ handleAddButton, students }) {
  const [inputValue, setInputValue] = useState("");
  const contactInputRef = useRef();
  const nameRef = useRef();

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
    console.log("hi");
  }, [students]);

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
            ref={nameRef}
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
}

export default ListInput;
