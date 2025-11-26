import { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import AppContext from "../context/AppContext";

function ListItem({ student }) {
  console.log("list item is running");

  const { students, setStudents } = useContext(AppContext);

  const handleDeleteButton = (studentId) => {
    const filteredArray = students?.filter(
      (student) => student?.id !== studentId
    );

    setStudents([...filteredArray]);
  };

  return (
    <div className="list-item">
      <div>
        <p className="name-para">{student?.name}</p>

        <p className="phone-number">{student?.contact}</p>
      </div>
      <div className="delete-button-div">
        <button
          className="delete-button"
          onClick={() => handleDeleteButton(student?.id)}
        >
          <RiDeleteBin6Line className="delete-icon" />
        </button>
      </div>
    </div>
  );
}

export default ListItem;
