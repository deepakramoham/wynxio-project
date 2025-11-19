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
      <ListInput handleAddButton={handleAddButton} />
      <ListData students={students} />
    </>
  );
}

export default App;
