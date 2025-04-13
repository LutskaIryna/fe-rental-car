import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { UserStatus } from "@/types/types";
import { UserRole } from "@/types/enums";
import { useGetUserQuery } from "@/store/api/auth.api";

const PrivateRoute = () => {
  const location = useLocation();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const [status, setStatus] = useState<UserStatus>("loading");

  useGetUserQuery(undefined, {
    skip: !!user || !token, // Skip the query if user is already set or token is not available
  });

 useEffect(() => {
    if (user) {
      setStatus(user.role);
    } else if (!token ) {
      setStatus("unauthorized");
    }
  }, [token, user]);

  if (status === "loading") return null; // or <Spinner />

  if (status === "unauthorized") return <Navigate to="/login" replace />;

  if (status === UserRole.USER && location.pathname === "/admin") {
    return <Navigate to="/cars" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
