import { useContext } from "react";
import ListItem from "./ListItem";
import AppContext from "../context/AppContext";

function ListData() {
  const { state } = useContext(AppContext);

  return state?.students?.length > 0 ? (
    state?.students
      ?.filter((student) =>
        student.name.toLowerCase().includes(state?.search?.toLowerCase())
      )
      ?.map((student) => <ListItem key={student.id} student={student} />)
  ) : (
    <div className="no-contact-message">
      <p>No Contact Found</p>
    </div>
  );
}

export default ListData;
