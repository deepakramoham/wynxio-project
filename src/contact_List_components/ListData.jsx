import ListItem from "./ListItem";

function ListData({ students }) {
  console.log("list data running");
  return students?.map((student) => (
    <ListItem key={student.id} name={student.name} id={student.id} />
  ));
}

export default ListData;
