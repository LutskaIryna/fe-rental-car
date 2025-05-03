import { selectUserRole } from "@/store/selectors/authSelectors";
import { UserRole } from "@/types/enums";
import { useMemo } from "react";
import { useSelector } from "react-redux";

type WithRoles = {
  roles: UserRole[];
};

export const useCheckRole = (role: UserRole) => {
  const userRole = useSelector(selectUserRole)
  return userRole === role;
};

export const useIsAdmin = () => { 
  const userRole = useSelector(selectUserRole);
  return userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN;
};

export const useIsUser = () => { 
  const userRole = useSelector(selectUserRole);
  return userRole === UserRole.USER;
};

export const usePermissions = <T extends WithRoles>(list: T[], userRole: UserRole): T[] => {
  return useMemo(
    () => list.filter(({ roles }) => roles.includes(userRole)),
    [list, userRole]
  );
};