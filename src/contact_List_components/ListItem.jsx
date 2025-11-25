import { RiDeleteBin6Line } from "react-icons/ri";

function ListItem({ student, handleDeleteButton }) {
  return (
    <div className="list-item">
      <div>
        <p className="name-para">{student?.name}</p>

        <p className="phone-number">{student?.contact}</p>
      </div>
      <div className="delete-button-div">
        <button
          style={{
            border: "none",
            backgroundColor: "#a00a0af5",
            borderRadius: ".25em",
            padding: ".25em 1.5em  .25em 1.5em",
          }}
          className="delete-button"
          onClick={() => handleDeleteButton(student?.id)}
        >
          <RiDeleteBin6Line
            style={{
              fontSize: "1.85rem",
              color: "aliceblue",
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default ListItem;
