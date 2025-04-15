import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserStatus } from "@/types/types";
import { UserRole } from "@/types/enums";
import { useGetUserQuery } from "@/store/api/auth.api";
import { navigationStrategies }  from "@/strategies/navigation";
import { selectAuthToken, selectUserRole } from "@/store/selectors/authSelectors";

const PrivateRoute = () => {
  const location = useLocation();
  const token = useSelector(selectAuthToken);
  const role = useSelector(selectUserRole);
  const [status, setStatus] = useState<UserStatus>("loading");

  useGetUserQuery(undefined, {
    skip: !!role || !token, // Skip the query if user is already set or token is not available
  });

 useEffect(() => {
    if (role) {
      setStatus('default');
    } else if (!token ) {
      setStatus("unauthorized");
    }
  }, [token, role]);

  if (role === UserRole.USER && location.pathname === "/admin") {
    return navigationStrategies.adminRedirect();
  }

  return navigationStrategies[status]();
};

export default PrivateRoute;
