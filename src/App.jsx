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

  return (
    <>
      <ListInput students={students} setStudents={setStudents} />
      <ListData students={students} />
    </>
  );
}

export default App;
