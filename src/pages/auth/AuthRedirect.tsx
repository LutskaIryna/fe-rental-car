import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const role = localStorage.getItem("role") || "admin"; // will be get from Api about ME
  return { role };
};

const AuthRedirect = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "admin") {
      navigate("/admin", { replace: true });
    } else if (role === "user") {
      navigate("/rentals", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [role, navigate]);

  return null; // can be spinner or loading component
};

export default AuthRedirect;
