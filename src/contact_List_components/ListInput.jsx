import { useState, useRef, useContext } from "react";
import Input from "../components/Input";
import { IoAdd } from "react-icons/io5";
import AppContext from "../context/AppContext";

const ListInput = function ListInput() {
  console.log("list input is running");

  const { nameRef, students, setStudents, searchValue, setSearchValue } =
    useContext(AppContext);

  // const appContext = useContext(AppContext);
  // console.log(appContext);
  // const students = appContext.students;
  // const setStudents = appContext.setStudents;

  // const { inputValue, setInputValue } = useContext(AppContext);
  const [inputValue, setInputValue] = useState("");

  
  const [nameError, setNameError] = useState("");
  const [contactError, setContactError] = useState("");
  const contactInputRef = useRef();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = () => {
    const contactNumber = contactInputRef.current.value;

    if (contactNumber === "") {
      setContactError("Contact is required");
    }
    if (inputValue === "") {
      setNameError("Name is required");
    }

    if (contactNumber && inputValue) {
      setStudents(
        [
          ...students,
          {
            id: crypto.randomUUID(),
            name: inputValue,
            contact: contactNumber,
          },
        ]?.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
      );
      setInputValue("");
      contactInputRef.current.value = "";
      setContactError("");
      setNameError("");
    }
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="list-input-section">
      <div className="list-input-container">
        <div className="list-input">
          <Input
            ref={nameRef}
            name={"name"}
            type="text"
            value={inputValue}
            defaultValue="abcde"
            placeholder="Enter name . . ."
            onChange={handleInputChange}
            error={nameError}
            className={"input-box"}
          />
          <Input
            name={"contact"}
            ref={contactInputRef}
            type="tel"
            placeholder="Contact Number . . ."
            error={contactError}
          />
        </div>

        <div className="list-add-button">
          <button className="add-button" type="submit" onClick={handleAddClick}>
            <IoAdd className="add-icon" />
          </button>
        </div>
      </div>

      <div className="list-search">
        <Input
          name={"search"}
          value={searchValue}
          placeholder="Search . . ."
          type="text"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default ListInput;
