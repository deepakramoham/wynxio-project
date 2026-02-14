const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
      className="error"
    >
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button className="btn btn-secondary" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
};
export default ErrorFallback;
