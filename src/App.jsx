import { useState, useRef, useEffect } from "react";
import ListInput from "./contact_List_components/ListInput";
import ListData from "./contact_List_components/ListData";

function App() {
  const [students, setStudents] = useState(
    [
      { id: "uma", name: "Uma", contact: 98980000 },
      { id: "jnsh", name: "Jinshi", contact: 98890099 },
      { id: "arun", name: "Arun", contact: 98765432 },
      { id: "mira", name: "Mira", contact: 99223344 },
      // { id: "kavi", name: "Kavin", contact: 98112233 },
      // { id: "sita", name: "Sita", contact: 98991122 },
      // { id: "ravi", name: "Ravi", contact: 99008877 },
      // { id: "tanv", name: "Tanvi", contact: 99334455 },
      // { id: "veer", name: "Veer", contact: 98445566 },
      // { id: "dani", name: "Daniel", contact: 99778899 },
      // { id: "alx", name: "Alex", contact: 98110022 },
      // { id: "soph", name: "Sophia", contact: 98224466 },
      // { id: "aarv", name: "Aarav", contact: 98123456 },
      // { id: "riya", name: "Riya", contact: 98234567 },
      // { id: "kian", name: "Kian", contact: 98345678 },
      // { id: "zoya", name: "Zoya", contact: 98456789 },
      // { id: "yash", name: "Yash", contact: 98567890 },
      // { id: "tara", name: "Tara", contact: 98678901 },
      // { id: "amir", name: "Amir", contact: 98789012 },
      // { id: "noah", name: "Noah", contact: 98890123 },
      // { id: "lola", name: "Lola", contact: 98901234 },
      // { id: "emma", name: "Emma", contact: 99012345 },
      // { id: "liam", name: "Liam", contact: 99123456 },
      // { id: "maya", name: "Maya", contact: 99234567 },
      // { id: "omar", name: "Omar", contact: 99345678 },
      // { id: "hana", name: "Hana", contact: 99456789 },
      // { id: "ivan", name: "Ivan", contact: 99567890 },
      // { id: "ella", name: "Ella", contact: 99678901 },
      // { id: "amir2", name: "Amit", contact: 99789012 },
      // { id: "sanj", name: "Sanjay", contact: 99890123 },
      // { id: "kate", name: "Kate", contact: 99901234 },
      // { id: "joel", name: "Joel", contact: 98112244 },
    ].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
  );

  //sort function
  //comparator function (a,b)=>a-b  //if a - b is negative a comes before b otherwise b comes before a
  // console.log([5, 2, 3, 1, 2,  8, 9].sort((a, b) => a - b));

  // console.log(
  //   ["Uma", "jinshi", "sita", "arun"].sort((a, b) => a.localeCompare(b))
  // );

  const [searchValue, setSearchValue] = useState("");
  const nameRef = useRef();
  const contactContainer = useRef();

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  //Scrolling to bottom
  
  // useEffect(() => {
  //   if (contactContainer.current) {
  //     console.log(contactContainer.current.scrollTop);
  //     console.log(contactContainer.current.scrollHeight);
  //     contactContainer.current.scrollTop =
  //       contactContainer.current.scrollHeight;
  //   }
  // }, [students]);

  const handleAddButton = (newStudent) => {
    setStudents(
      [...students, newStudent]?.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      )
    );
  };

  const handleDeleteButton = (studentId) => {
    console.log(studentId);

    const filteredArray = students?.filter(
      (student) => student?.id !== studentId
    );

    setStudents([...filteredArray]);
  };

  return (
    <>
      <div className="container">
        <div className="outer-container">
          <div className="contact-collector">
            <ListInput
              ref={nameRef}
              handleAddButton={handleAddButton}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>
          <div className="contacts" ref={contactContainer}>
            <ListData
              students={students?.filter((student) =>
                student.name.toLowerCase().includes(searchValue.toLowerCase())
              )}
              handleDeleteButton={handleDeleteButton}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
