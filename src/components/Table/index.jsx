import Input from "../Input/Input";
import { IoAdd } from "react-icons/io5";
const Table = ({ tableColumns, data, toggleModal }) => {
  return (
    <>
      <div className="d-flex gap-5 align-items-start">
        <div style={{ flex: "1" }}>
          <Input
            name={"search"}
            value={""}
            placeholder="Search . . ."
            type="text"
            onChange={() => {}}
            style={{ maxWidth: "350px" }}
          />
        </div>
        <div>
          <button
            className="btn btn-success px-4"
            type="submit"
            onClick={toggleModal}
          >
            <IoAdd className="add-icon" />
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            {tableColumns?.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((student, index) => (
            <tr key={index}>
              {tableColumns.map((col, index) => (
                <td key={index}>
                  {col?.render ? col?.render(student) : student[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
