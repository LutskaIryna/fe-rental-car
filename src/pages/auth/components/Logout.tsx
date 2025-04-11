import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/auth/authAPI";
import { logout } from "@/store/authSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Logout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);  

  const handleLogout = async () => {
    try {
      if (token) {
        await logoutUser(token);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(logout());
      navigate("/login");
    }
  }; 

  return (
    <Button variant="outline" className="mt-auto" onClick={handleLogout}>
          Logout
    </Button>
  );
}