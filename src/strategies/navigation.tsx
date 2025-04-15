import { Navigate, Outlet } from "react-router-dom";

export const navigationStrategies = {
  loading: () => null, // or <Spinner />
  unauthorized: () => <Navigate to="/login" replace />,
  adminRedirect: () => <Navigate to="/cars" replace />,
  default: () => <Outlet />,
};
