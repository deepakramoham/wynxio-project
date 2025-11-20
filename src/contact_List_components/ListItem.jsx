function ListItem({ id, name }) {
  return (
    <div className="list-item">
      <div>
        <p className="name-para">{name}</p>

        <p className="phone-number">{9633302969}</p>
      </div>
      <div className="delete-button-div">
        <button className="delete-button">Delete</button>
      </div>
    </div>
  );
}

export default ListItem;
