import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "@/services/auth/authAPI";
import { setUser, logout } from "@/store/authSlice";
import { RootState } from "@/store/store";
import { UserStatus } from "@/types/types";
import { UserRole } from "@/types/enums";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const [status, setStatus] = useState<UserStatus >("loading");

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setStatus("unauthorized");
        return;
      }

      if (!user) {
        try {
          const fetchedUser = await getUserInfo(token);
          dispatch(setUser(fetchedUser));
          setStatus(fetchedUser.role);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          dispatch(logout());
          setStatus("unauthorized");
        }
      } else {
        setStatus(user.role);
      }
    };

    checkAuth();
  }, [token, user, dispatch]);

  if (status === "loading") return null; // или <Spinner />

  if (status === "unauthorized") return <Navigate to="/login" replace />;

  if (status === UserRole.USER && location.pathname === "/admin") {
    return <Navigate to="/cars" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
