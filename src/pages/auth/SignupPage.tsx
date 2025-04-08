import { useForm } from "react-hook-form";
import { registerUserWithRole } from "@/services/auth/authAPI";
import { AuthForm } from "../../components/forms/AuthForm";
import { useNavigate } from "react-router-dom";

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export function SignupForm({ hasUserAdminRole = false }: { hasUserAdminRole?: boolean }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const navigate = useNavigate();

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
      await registerUserWithRole(data.email, data.password, data.role, token);
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
