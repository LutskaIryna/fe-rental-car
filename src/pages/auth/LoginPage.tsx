import { useForm } from "react-hook-form";
import { AuthForm } from "../../components/forms/AuthForm";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "@/store/api/auth.api";
import { toast } from "sonner";

type LoginForm = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const navigate = useNavigate();

   // initialize the hook (without parameters)
    const [loginUser] = useLoginUserMutation();

  const onSubmit = async (data: LoginForm) => {
    try {
       // We pass the email and password when calling the function, not when using the hook
      await loginUser({ email:data.email, password: data.password}).unwrap();
      navigate("/");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <AuthForm<LoginForm>
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
