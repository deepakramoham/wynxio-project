import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// import { ErrorBoundary } from "react-error-boundary";
// import ErrorFallback from "../ReactErrorBoundary/ErrorFallBack";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { Suspense } from "react";
import Loading from "../Loading";

const RequiredAuth = ({ allowedRole }) => {
  const userState = useSelector((state) => state.userState);
  const { user } = userState || {};
  const { accessToken, role } = user || {};

  return accessToken && role && allowedRole === role ? (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  ) : accessToken ? (
    <Navigate to="/unauthorized" replace />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default RequiredAuth;
