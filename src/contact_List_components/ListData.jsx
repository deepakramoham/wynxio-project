import { useContext } from "react";
import ListItem from "./ListItem";
import AppContext from "../context/AppContext";

function ListData() {
  console.log("list data is running");

  const { students, searchValue } = useContext(AppContext);
  return students?.length > 0 ? (
    students
      ?.filter((student) =>
        student.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      ?.map((student) => <ListItem key={student.id} student={student} />)
  ) : (
    <div className="no-contact-message">
      <p>No Contact Found</p>
    </div>
  );
}

export default ListData;
