import { useState } from "react";
import ListInput from "./contact_List_components/ListInput";
import ListData from "./contact_List_components/ListData";

function App() {
  const [students, setStudents] = useState([
    { id: "dpk", name: "Deepak" },
    { id: "srl", name: "Siril" },
    { id: "tmn", name: "Tomin" },
    { id: "hdr", name: "Hyder" },
    { id: "ans", name: "Anas" },
  ]);

  const handleAddButton = (newStudent) => {
    setStudents([...students, newStudent]);

  };

  return (
    <>
      <div className="container">
        <div className="outer-container">
          <div className="contact-collector">
            <ListInput handleAddButton={handleAddButton} />
          </div>
          <div className="contacts">
            <ListData students={students} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
