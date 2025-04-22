import { useGetUsersQuery } from "@/store/api/auth.api";
import { UserTable } from "./components/UsersTable";
import { AdminCreateModal } from "./components/AdminCreateModal";
import { useCheckRole } from "@/hooks/useUser";
import { UserRole } from "@/types/enums";
import { useSelector } from "react-redux";
import { selectAuthToken } from "@/store/selectors/authSelectors";

export const AdminPage = () => {
  
  const isSuperAdmin = useCheckRole(UserRole.SUPER_ADMIN);
  const token = useSelector(selectAuthToken)
  const { data } = useGetUsersQuery(undefined, {
    skip: !token, // Skip the query if token is not available
  });
  
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">User Management</h3>
        {isSuperAdmin && <AdminCreateModal />}
      </div>
      <UserTable users={data || []} />
    </div>
  );
}