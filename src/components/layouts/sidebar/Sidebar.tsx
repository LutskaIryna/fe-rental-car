import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { renderNavLinks } from "./NavLinks";
import { Logout } from "@/pages/auth/components/Logout";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { UserRole } from "@/types/enums";

export const AppSidebar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup >
          <nav className="flex flex-col gap-4 p-4">
            {renderNavLinks(user?.role || UserRole.USER)}
          </nav>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Logout />
      </SidebarFooter>
    </Sidebar>
    
  )
}
