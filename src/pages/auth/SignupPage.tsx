import { useForm } from "react-hook-form";
import { AuthForm } from "../../components/forms/AuthForm";
import { useNavigate } from "react-router-dom";
import { useRegisterUserWithRoleMutation } from "@/store/api/auth.api";

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

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please login as admin first.");
      return;
    }

    try {
      await registerUserWithRole({email: data.email, password: data.password, role: data.role, accessToken: token});
      alert("User registered successfully");
      navigate("/login");
    } catch (err: any) {
      alert(err.message);
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
