import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";

type BaseForm = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
};

type Props<T extends BaseForm> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  onSubmit: () => void;
  isSignup?: boolean;
  hasUserAdminRole?: boolean;
};

export function AuthForm<T extends BaseForm>({
  register,
  errors,
  onSubmit,
  isSignup = false,
  hasUserAdminRole = false,
}: Props<T>) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {isSignup && hasUserAdminRole && (
        <>
          <Input placeholder="Role" {...register("role" as Path<T>)} />
          {errors.role && (
            <p className="text-sm text-red-500">{String(errors.role.message)}</p>
          )}
        </>
      )}
      <Input
        placeholder="Email"
        {...register("email" as Path<T>, { required: "Email required" })}
      />
      {errors.email && (
        <p className="text-sm text-red-500">{String(errors.email.message)}</p>
      )}

      <Input
        type="password"
        placeholder="Password"
        {...register("password" as Path<T>, { required: "Password required" })}
      />
      {errors.password && (
        <p className="text-sm text-red-500">{String(errors.password.message)}</p>
      )}

      {isSignup && (
        <>
          <Input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword" as Path<T>, {
              required: "Please confirm password",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {String(errors.confirmPassword.message)}
            </p>
          )}
        </>
      )}

      <Button type="submit" className="w-full bg-blue-600 text-grey-800">
        {isSignup ? "Sign Up" : "Sign In"}
      </Button>
    </form>
  );
}
