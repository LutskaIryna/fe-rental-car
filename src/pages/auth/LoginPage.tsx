import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { loginUser } from "@/services/auth/authAPI";
import { AuthForm } from "../../components/forms/AuthForm";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

export function LoginForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await loginUser(data.email, data.password);
      console.log(result);
      
      dispatch(login({ user: { email: data.email }, token: result.access_token }));
      localStorage.setItem("access_token", result.access_token);
      navigate("/");
    } catch (err: any) {
      alert(err.message);
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
