const Loading = () => {
  return (
    <div style={{ position: "absolute", top: "40%", left: "50%" }}>
      <div
        className="spinner-border"
        style={{ height: "5rem", width: "5rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export default Loading;
