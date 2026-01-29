import Layout from "./components/Layout";
import { useSelector } from "react-redux";

function App() {
  const userState = useSelector((state) => state.userState);
  const { user } = userState || null;
  console.log(user);

  return <>{user ? <Layout /> : <p>Please Login to continue</p>}</>;
}

export default App;
