import { Button } from "@/components/ui/button";
import { useLogoutUserMutation } from "@/store/api/auth.api";
import { selectAuthToken } from "@/store/selectors/authSelectors";
import { logout } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectAuthToken);

  // initialize the hook (without parameters)
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      if (token) {
        await logoutUser(token).unwrap(); // We pass the token when calling the function, not when using the hook
      }
    } catch (error) {
      console.error("Logout failed:", error);
      dispatch(logout());
    } finally {
      navigate("/login");
    }
  };

  return (
    <Button variant="outline" className="mt-auto" onClick={handleLogout} disabled={isLoading}>
      Logout
    </Button>
  );
};
