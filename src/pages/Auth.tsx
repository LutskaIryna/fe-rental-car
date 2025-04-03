import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { login } from "@/features/auth/authSlice";
import { loginUser, registerUserWithRole } from "@/features/auth/authAPI";


type LoginForm = {
  email: string;
  password: string;
};

type RegisterForm = LoginForm & {
  confirmPassword: string;
  role: string;
};

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const hasUserAdminRole = false;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<LoginForm | RegisterForm>();

 

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    reset();
  };

  const onSubmit = async (data: LoginForm | RegisterForm) => {
    try {
      if (isLogin) {
        const result = await loginUser(data.email, data.password);
  
        dispatch(
          login({
            user: { email: data.email },
            token: result.access_token,
          })
        );
  
        localStorage.setItem("access_token", result.access_token);
      } else {
        if ((data as RegisterForm).password !== (data as RegisterForm).confirmPassword) {
          alert("Passwords do not match");
          return;
        }
  
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          alert("No admin token found. Please login as admin first.");
          return;
        }
  
        await registerUserWithRole(
          (data as RegisterForm).email,
          (data as RegisterForm).password,
          (data as RegisterForm).role,
          accessToken
        );
  
        alert("User registered successfully");
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen from-gray-100 to-gray-200">
      <Card className="w-full max-w-md border rounded-2xl shadow-xl bg-white">
        <CardContent className="p-6 space-y-6">
          <div className="flex justify-between items-center gap-[10px]">
            <h2 className="text-2xl font-semibold">
              {isLogin ? "Sign In" : "Sign Up"}
            </h2>
            <Button
              variant="link"
              className="text-sm text-blue-600"
              onClick={toggleForm}
            >
              {isLogin ? "Need an account?" : "Already have one?"}
            </Button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {!isLogin && hasUserAdminRole &&(
              <Input
                placeholder="Role"
                {...register("role")}
              />
            )}
            {!isLogin && (errors as FieldErrors<RegisterForm>).role && (
              <p className="text-sm text-red-500">
                {(errors as FieldErrors<RegisterForm>).role?.message}
              </p>
            )}
            <Input
              placeholder="Email"
              {...register("email", { required: "Email required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}

            <Input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password required" })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}

            {!isLogin && (
              <>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Please confirm password",
                  })}
                />
                {!isLogin && (errors as FieldErrors<RegisterForm>).confirmPassword && (
                  <p className="text-sm text-red-500">
                    {(errors as FieldErrors<RegisterForm>).confirmPassword?.message}
                  </p>
                )}
              </>
            )}

            <Button type="submit" className="w-full bg-blue-600 text-grey-800">
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
