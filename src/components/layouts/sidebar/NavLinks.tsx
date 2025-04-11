import { UserRole } from "@/types/enums";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Rentals", to: "/rentals" },
  { label: "Cars", to: "/cars" },
  { label: "Admin", to: "/admin", roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
];

export const renderNavLinks = (userRole: UserRole) => {
  return navItems
    .filter(({ roles }) => {
      if (roles) {
        return roles.includes(userRole);
      }
      return true;
    })
    .map(({ label, to }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          `text-base px-2 py-1 rounded ${
            isActive ? "bg-muted font-semibold" : "hover:underline"
          }`
        }
      >
        {label}
      </NavLink>
    ));
};