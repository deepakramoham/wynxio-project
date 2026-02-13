import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequiredAuth = ({ allowedRole }) => {
  const userState = useSelector((state) => state.userState);
  const { user } = userState || {};
  const { accessToken, role } = user || {};

  return accessToken && role && allowedRole === role ? (
    <Outlet />
  ) : accessToken ? (
    <Navigate to="/unauthorized" replace />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default RequiredAuth;
