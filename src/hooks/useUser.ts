import { selectUserRole } from "@/store/selectors/authSelectors";
import { UserRole } from "@/types/enums";
import { useSelector } from "react-redux";

export const useCheckRole = (role: UserRole) => {
  const userRole = useSelector(selectUserRole)
  return userRole === role;
};