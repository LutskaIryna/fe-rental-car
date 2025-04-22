import { navItems } from "@/components/layouts/sidebar/NavLinks";
import { selectUserRole } from "@/store/selectors/authSelectors";
import { UserRole } from "@/types/enums";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useCheckRole = (role: UserRole) => {
  const userRole = useSelector(selectUserRole)
  return userRole === role;
};

export const useIsAdmin = () => { 
  const userRole = useSelector(selectUserRole);
  return userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN;
};

export const useNavLinks = (userRole: UserRole) => {
  return useMemo(
    () => navItems.filter(({ roles }) => roles.includes(userRole)),
    [userRole]
  );
};