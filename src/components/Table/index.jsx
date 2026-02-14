import { useState, useMemo } from "react";
import Input from "../Input/Input";
import { IoAdd } from "react-icons/io5";
const Table = ({ tableColumns, data, onAddClick }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      tableColumns?.some((col) => {
        const value = row[col.accessor];

        return (
          value && value.toString().toLowerCase().includes(search.toLowerCase())
        );
      }),
    );
  }, [data, search, tableColumns]);

  return (
    <>
      <div className="d-flex gap-5 align-items-start">
        <div style={{ flex: "1" }}>
          <Input
            name={"search"}
            value={search}
            placeholder="Search . . ."
            type="text"
            onChange={handleSearch}
            style={{ maxWidth: "350px" }}
          />
        </div>
        <div>
          <button
            className="btn btn-success px-4"
            type="submit"
            onClick={onAddClick}
          >
            <IoAdd className="add-icon" />
          </button>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="table ">
          <thead>
            <tr>
              {tableColumns?.map((col, index) => (
                <th key={index}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 ? (
              filteredData?.map((student, index) => (
                <tr key={index}>
                  {tableColumns.map((col, index) => (
                    <td key={index}>
                      {col?.render
                        ? col?.render(student)
                        : student[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
