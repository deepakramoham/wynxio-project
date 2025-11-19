import { useState } from "react";

function ListInput({ students, setStudents }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddButton = () => {
    setStudents([...students, { id: crypto.randomUUID(), name: inputValue }]);

    console.log(students);
    setInputValue("");
  };

  return (
    <>
      <input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your name"
      />
      <button onClick={handleAddButton}>Add</button>
    </>
  );
}

export default ListInput;
