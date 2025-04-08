import { Outlet } from "react-router-dom";
import { Sidebar, SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <Sidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
  </SidebarProvider>
  );
}