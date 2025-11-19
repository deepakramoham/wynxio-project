import { useState } from "react";

function ListInput({ students, setStudents }) {
  const [inputValue, setInputValue] = useState("");
  console.log("list input function is running");

  console.log(inputValue);

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

function ListItem({ id, name }) {
  console.log("list item running");

  return (
    <div className="list-item">
      <div>
        {name} <button>Delete</button>
      </div>
    </div>
  );
}

function ListData({ students }) {
  console.log("list data running");
  return students?.map((student) => (
    <ListItem key={student.id} name={student.name} id={student.id} />
  ));
}

function App() {
  const [students, setStudents] = useState([
    { id: "dpk", name: "Deepak" },
    { id: "srl", name: "Siril" },
    { id: "tmn", name: "Tomin" },
    { id: "hdr", name: "Hyder" },
    { id: "ans", name: "Anas" },
  ]);

  console.log("app is running");

  return (
    <>
      <ListInput students={students} setStudents={setStudents} />
      <ListData students={students} />
    </>
  );
}

export default App;
