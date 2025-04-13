import { useGetUsersQuery } from "@/store/api/auth.api";
import { UserTable } from "./components/UsersTable";
import { AdminCreateModal } from "./components/AdminCreateModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { UserRole } from "@/types/enums";

export const AdminPage = () => {

  const { data } = useGetUsersQuery();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const isSuperAdmin = currentUser?.role === UserRole.SUPER_ADMIN;
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