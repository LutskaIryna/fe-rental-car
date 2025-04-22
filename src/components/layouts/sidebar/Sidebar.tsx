import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { NavLinks } from "./NavLinks";
import { Logout } from "@/pages/auth/components/Logout";

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup >
            <NavLinks />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Logout />
      </SidebarFooter>
    </Sidebar>    
  )
}
