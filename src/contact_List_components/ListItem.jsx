import { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import AppContext from "../context/AppContext";

function ListItem({ student }) {
  const { dispatch } = useContext(AppContext);

  const handleDeleteButton = (studentId) => {
    dispatch({ type: "delete", payload: studentId });
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
