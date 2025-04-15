import { useForm } from "react-hook-form";
import { AuthForm } from "../../components/forms/AuthForm";
import { useNavigate } from "react-router-dom";
import { useRegisterUserWithRoleMutation } from "@/store/api/auth.api";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { selectAuthToken } from "@/store/selectors/authSelectors";

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export const SignupForm = ({ hasUserAdminRole = false }: { hasUserAdminRole?: boolean }) =>{
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const navigate = useNavigate();
  const [registerUserWithRole] = useRegisterUserWithRoleMutation();
  const token = useSelector(selectAuthToken);

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }
    
    if (!token) {
      toast.error("Please login as admin first.");
      return;
    }

    try {
      await registerUserWithRole({email: data.email, password: data.password, role: data.role});
      toast.success("User registered successfully");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <AuthForm<RegisterForm>
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      isSignup
      hasUserAdminRole={hasUserAdminRole}
    />
  );
}
