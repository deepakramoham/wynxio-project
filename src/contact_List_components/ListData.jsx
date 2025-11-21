import ListItem from "./ListItem";

function ListData({ students, handleDeleteButton }) {
 

  let content = null;

  if (students?.length > 0) {
    content = students;
  } else {
    content = "No Contact Found";
  }

  //We cannot use if else inside jsx. In such circumstances use ternary, default or guard operator.However we can use if else out of jsx

  return Array.isArray(content) ? (
    content?.map((student) => (
      <ListItem
        key={student.id}
        student={student}
        handleDeleteButton={handleDeleteButton}
      />
    ))
  ) : (
    <p>{content}</p>
  );
}

export default ListData;
