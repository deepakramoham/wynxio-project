function ListItem({ id, name }) {
  return (
    <div className="list-item">
      <div>
        {name} <button>Delete</button>
      </div>
    </div>
  );
}

export default ListItem;
