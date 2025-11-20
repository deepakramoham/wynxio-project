import { useState, useRef } from "react";

function ListInput({ handleAddButton }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = () => {
    handleAddButton({
      id: crypto.randomUUID(),
      name: inputValue,
    });
    setInputValue("");
  };

  return (
    <div className="list-input-section">
      <div className="list-input-box-div">
        <input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter name..."
        />
        <input type={"tel"} placeholder="contact number . . . " />
      </div>
      <div className="list-input-add-button">
        <div>
          <button type="reset">Reset</button>
        </div>

        <div>
          <button type="submit" onClick={handleAddClick}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListInput;
