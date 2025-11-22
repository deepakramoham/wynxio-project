import { useState } from "react";
import ListInput from "./contact_List_components/ListInput";
import ListData from "./contact_List_components/ListData";

function App() {
  const [students, setStudents] = useState([
    { id: "uma", name: "Uma", contact: 98980000 },
    { id: "jnsh", name: "Jinshi", contact: 98890099 },
  ]);

  const handleAddButton = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const handleDeleteButton = (studentId) => {
    console.log(studentId);

    const filteredArray = students?.filter(
      (student) => student?.id !== studentId
    );

    setStudents([...filteredArray]);

    console.log(filteredArray, "filtered array");
  };

  return (
    <>
      <div className="container">
        <div className="outer-container">
          <div className="contact-collector">
            <ListInput students={students}  handleAddButton={handleAddButton} />
          </div>
          <div className="contacts">
            <ListData
              students={students}
              handleDeleteButton={handleDeleteButton}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
