import { useState } from "react";

function ListInput({ handleAddButton }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your name"
      />
      <button
        onClick={() => {
          handleAddButton({ id: crypto.randomUUID(), name: inputValue });
          setInputValue("");
        }}
      >
        Add
      </button>
    </>
  );
}

export default ListInput;
