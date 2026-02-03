import { useSelector } from "react-redux";
import Layout from "./Layout";
import { Navigate } from "react-router-dom";
import useTokenExpiration from "./hooks/useTokenExpiration";

function App() {
  const userState = useSelector((state) => state.userState);
  const { user } = userState || null;
  const { accessToken } = user || "";

  useTokenExpiration(accessToken || "");

  return (
    <>{user && accessToken ? <Layout /> : <Navigate to="/session-expired" />}</>
  );
}

export default App;
