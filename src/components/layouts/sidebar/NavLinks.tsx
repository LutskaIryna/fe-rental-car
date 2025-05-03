import { usePermissions } from "@/hooks/useUser";
import { selectUserRole } from "@/store/selectors/authSelectors";
import { UserRole } from "@/types/enums";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const navItems = [
  { label: "Rentals", to: "/rentals", roles: [UserRole.USER] },
  { label: "Cars", to: "/cars", roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
  { label: "Admin", to: "/admin", roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
];

export const NavLinks = () => {
  const userRole = useSelector(selectUserRole) || UserRole.USER;
  const navLinks = usePermissions(navItems, userRole);

  return (
    <nav className="flex flex-col gap-4 p-4">
      {navLinks.map(({ label, to }) => (
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
      ))}
    </nav>
  );
};